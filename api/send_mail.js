// Vercel API endpoint for handling form submissions
import multer from 'multer';
import nodemailer from 'nodemailer';

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

// Function to generate email HTML
function generateEmailHtml(data) {
  const { name, email, company, message, selectedServices = [], files = [] } = data;
  
  // Create list of services
  const servicesList = selectedServices.length > 0 
    ? selectedServices.map(s => `<li>${typeof s === 'string' ? s : (s.title || 'Service')}</li>`).join('') 
    : '<p>No specific services selected.</p>';
  
  // Create list of files
  const filesList = files.length > 0
    ? files.map(f => `<li>${f.name || f.originalname || 'File'}</li>`).join('')
    : '';
  
  // Build HTML - modified for better deliverability
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Inquiry from Magpollo Website</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: collapse;">
          <tr>
            <td align="center">
              <h1 style="color: #ef4444; margin-bottom: 20px;">New Inquiry from Magpollo Website</h1>
            </td>
          </tr>
        </table>
        
        <table width="100%" cellpadding="10" cellspacing="0" style="margin-bottom: 20px; border-collapse: collapse;">
          <tr>
            <td style="background-color: #f9f9f9; border-radius: 5px;">
              <h2 style="margin-top: 0;">Contact Information</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #ef4444;">${email}</a></p>
              ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
            </td>
          </tr>
        </table>
        
        <table width="100%" cellpadding="10" cellspacing="0" style="margin-bottom: 20px; border-collapse: collapse;">
          <tr>
            <td style="background-color: #f9f9f9; border-radius: 5px;">
              <h2 style="margin-top: 0;">Services Requested</h2>
              ${servicesList ? `<ul>${servicesList}</ul>` : '<p>No specific services selected.</p>'}
            </td>
          </tr>
        </table>
        
        ${message ? `
        <table width="100%" cellpadding="10" cellspacing="0" style="margin-bottom: 20px; border-collapse: collapse;">
          <tr>
            <td style="background-color: #f9f9f9; border-radius: 5px;">
              <h2 style="margin-top: 0;">Message</h2>
              <p>${message.replace(/\n/g, '<br>')}</p>
            </td>
          </tr>
        </table>
        ` : ''}
        
        ${filesList ? `
        <table width="100%" cellpadding="10" cellspacing="0" style="margin-bottom: 20px; border-collapse: collapse;">
          <tr>
            <td style="background-color: #f9f9f9; border-radius: 5px;">
              <h2 style="margin-top: 0;">Attachments</h2>
              <ul>${filesList}</ul>
            </td>
          </tr>
        </table>
        ` : ''}
        
        <table width="100%" cellpadding="10" cellspacing="0" style="border-top: 1px solid #ddd; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding-top: 20px;">
              <p style="color: #777; font-size: 14px; margin: 5px 0;">&copy; ${new Date().getFullYear()} Magpollo. All rights reserved.</p>
              <p style="color: #777; font-size: 14px; margin: 5px 0;">This is an automated message from the Magpollo website contact form.</p>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

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

    // Generate or use provided HTML email
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
        
        // Generate email HTML directly - no imports
        finalHtml = generateEmailHtml({
          name,
          email,
          company, 
          message,
          selectedServices: servicesArray,
          files: req.files || []
        });
        
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

    // Setup email transporter using SendInBlue/Brevo
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SENDINBLUE_USER || process.env.SMTP_USER,
        pass: process.env.SENDINBLUE_PASS || process.env.SMTP_PASSWORD,
      },
      // Add additional options to improve deliverability
      tls: {
        rejectUnauthorized: true
      },
      pool: true, // Use connection pool for better performance
      maxConnections: 5,
      rateDelta: 1000, // 1 second
      rateLimit: 5, // 5 messages per second
      debug: process.env.NODE_ENV !== 'production'
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
      replyTo: email,
      subject: `New Inquiry from ${name} - Magpollo Website`,
      html: finalHtml,
      attachments,
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'High',
        'X-Mailer': 'Magpollo Website Contact Form',
        'List-Unsubscribe': `<mailto:${process.env.EMAIL_FROM || 'noreply@magpollo.com'}?subject=unsubscribe>`
      }
    };

    // Add CC recipients if configured
    if (process.env.EMAIL_CC) {
      // Handle both comma-separated string and single email address
      mailOptions.cc = process.env.EMAIL_CC;
      console.log('Added CC recipients:', process.env.EMAIL_CC);
    }

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    console.log('Email accepted by:', info.accepted);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));

    return res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Error sending email', error: error.message });
  }
} 