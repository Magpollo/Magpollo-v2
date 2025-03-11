import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import os from 'os';

// Define the interface for file attachments
interface AttachmentLike {
  filename: string;
  content: Buffer | string;
}

export default async function handler(req: Request, res: Response) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const {
      name,
      email,
      company,
      message,
      selectedServices,
      emailHtml,
    } = req.body;

    // Basic validation
    if (!name || !email || !emailHtml) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Parse selected services
    let services: string[] = [];
    try {
      services = JSON.parse(selectedServices);
    } catch (e) {
      console.error('Error parsing services:', e);
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
    });

    // Get file attachments if any
    const attachments: AttachmentLike[] = [];
    if (req.files && Array.isArray(req.files)) {
      req.files.forEach((file: any) => {
        attachments.push({
          filename: file.originalname,
          content: file.buffer,
        });
      });
    } else if (req.files && typeof req.files === 'object') {
      // Handle multipart form data files
      Object.values(req.files).forEach((fileOrFiles: any) => {
        const files = Array.isArray(fileOrFiles) ? fileOrFiles : [fileOrFiles];
        files.forEach((file: any) => {
          // For temporary files
          if (file.path) {
            attachments.push({
              filename: file.originalname || file.name,
              content: fs.readFileSync(file.path),
            });
          } 
          // For in-memory files
          else if (file.buffer) {
            attachments.push({
              filename: file.originalname || file.name,
              content: file.buffer,
            });
          }
        });
      });
    }

    // Email options
    const mailOptions = {
      from: `"Magpollo Website" <${process.env.EMAIL_FROM || 'noreply@magpollo.com'}>`,
      to: process.env.EMAIL_TO || 'salesteam@magpollo.com',
      cc: process.env.EMAIL_CC,
      replyTo: email,
      subject: `New Inquiry from ${name} - Magpollo Website`,
      html: emailHtml,
      attachments,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    // Clean up temporary files if any
    if (req.files && typeof req.files === 'object') {
      Object.values(req.files).forEach((fileOrFiles: any) => {
        const files = Array.isArray(fileOrFiles) ? fileOrFiles : [fileOrFiles];
        files.forEach((file: any) => {
          if (file.path) {
            fs.unlinkSync(file.path);
          }
        });
      });
    }

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