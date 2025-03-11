// Vercel API endpoint for handling form submissions
import multer from 'multer';
import nodemailer from 'nodemailer';
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import FormToEmail from './FormToEmail';

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
    files: 5
  }
});

// Multer middleware handler for Vercel
const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

export default async function handler(req, res) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Process file uploads first
    try {
      await runMiddleware(req, res, upload.array('file'));
      console.log('Files processed successfully:', req.files?.length || 0, 'files uploaded');
    } catch (uploadError) {
      console.error('Error processing file uploads:', uploadError);
      return res.status(400).json({ 
        message: 'Error processing file uploads',
        error: uploadError.message
      });
    }

    const {
      name,
      email,
      company,
      message,
      selectedServices,
      emailHtml
    } = req.body;

    // Basic validation
    if (!name || !email) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Generate HTML email if not provided
    let finalHtml = emailHtml;
    
    if (!finalHtml) {
      let servicesArray = [];
      try {
        // Parse selected services
        if (selectedServices) {
          const parsedServices = JSON.parse(selectedServices);
          // Handle both formats - array of strings or array of objects
          servicesArray = Array.isArray(parsedServices) 
            ? parsedServices.map((item, index) => {
                // If item is already an object with id and title, use it
                if (typeof item === 'object' && item.title) {
                  return item;
                }
                // If item is a string, create an object
                return { id: index + 1, title: item };
              })
            : [];
        }
        
        try {
          // Try to use the imported template
          finalHtml = renderToStaticMarkup(
            React.createElement(FormToEmail, {
              name,
              email,
              company,
              message,
              selectedServices: servicesArray,
              files: req.files?.map(file => ({ name: file.originalname }))
            })
          );
        } catch (templateError) {
          console.error('Error rendering email template, using fallback:', templateError);
          
          // Fallback to simple HTML if template fails
          const servicesList = servicesArray.map(s => `<li>${s.title || s}</li>`).join('');
          const filesList = req.files ? req.files.map(f => `<li>${f.originalname}</li>`).join('') : '';
          
          finalHtml = `
            <html>
              <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h1 style="color: #ef4444; text-align: center;">New Inquiry from Magpollo Website</h1>
                
                <div style="margin-bottom: 20px;">
                  <h2>Contact Information</h2>
                  <p><strong>Name:</strong> ${name}</p>
                  <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #ef4444;">${email}</a></p>
                  ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
                </div>
                
                <hr style="border-color: #ddd; margin: 20px 0;" />
                
                <div style="margin-bottom: 20px;">
                  <h2>Services Requested</h2>
                  ${servicesList ? `<ul>${servicesList}</ul>` : '<p>No specific services selected.</p>'}
                </div>
                
                ${message ? `
                <hr style="border-color: #ddd; margin: 20px 0;" />
                <div style="margin-bottom: 20px;">
                  <h2>Message</h2>
                  <p>${message}</p>
                </div>
                ` : ''}
                
                ${filesList ? `
                <hr style="border-color: #ddd; margin: 20px 0;" />
                <div style="margin-bottom: 20px;">
                  <h2>Attachments</h2>
                  <ul>${filesList}</ul>
                </div>
                ` : ''}
                
                <hr style="border-color: #ddd; margin: 20px 0;" />
                
                <div style="text-align: center; color: #777; font-size: 14px;">
                  <p>&copy; ${new Date().getFullYear()} Magpollo. All rights reserved.</p>
                  <p>This is an automated message from the Magpollo website contact form.</p>
                </div>
              </body>
            </html>
          `;
        }
      } catch (e) {
        console.error('Error generating email HTML:', e);
        
        // Ultimate fallback - super simple email
        finalHtml = `
          <h1>New Form Submission</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
          ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
          <p><strong>Files Attached:</strong> ${req.files?.length || 0}</p>
        `;
      }
    }

    // Setup email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SENDINBLUE_USER || process.env.SMTP_USER,
        pass: process.env.SENDINBLUE_PASS || process.env.SMTP_PASSWORD,
      },
    });

    // Prepare attachments if any
    const attachments = req.files ? req.files.map(file => ({
      filename: file.originalname,
      content: file.buffer
    })) : [];

    // Email options
    const mailOptions = {
      from: `"Magpollo Website" <${process.env.EMAIL_FROM || 'noreply@magpollo.com'}>`,
      to: process.env.EMAIL_TO || 'salesteam@magpollo.com',
      cc: process.env.EMAIL_CC,
      replyTo: email,
      subject: `New Inquiry from ${name} - Magpollo Website`,
      html: finalHtml,
      attachments,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    
    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      message: 'Failed to send email',
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
} 