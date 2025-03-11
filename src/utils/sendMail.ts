import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import FormToEmail from '../emails/FormToEmail';

interface SendMailProps {
  name: string;
  email: string;
  company?: string;
  message?: string;
  selectedServices: Array<{ id: number; title: string }>;
  files?: File[];
}

/**
 * Utility function to send form data as an email
 * @param formData Form data to be sent
 * @returns Promise that resolves to success/error status
 */
export const sendMail = async (formData: SendMailProps): Promise<{ success: boolean; message?: string }> => {
  try {
    // Create message data
    const emailHtml = renderToStaticMarkup(
      React.createElement(FormToEmail, {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        message: formData.message,
        selectedServices: formData.selectedServices,
        files: formData.files?.map(file => ({ name: file.name }))
      })
    );

    // Create form data for sending files
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    if (formData.company) data.append('company', formData.company);
    if (formData.message) data.append('message', formData.message);
    data.append('selectedServices', JSON.stringify(formData.selectedServices.map(s => s.title)));
    data.append('emailHtml', emailHtml);

    // Append files if any
    if (formData.files && formData.files.length > 0) {
      formData.files.forEach((file) => {
        data.append('file', file); // Use consistent field name 'file' for all attachments
      });
    }

    // Send the data to the API endpoint (using relative path for Vercel)
    const response = await fetch('/api/send_mail', {
      method: 'POST',
      body: data,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: `Server error: ${response.status}` }));
      throw new Error(errorData.message || `Failed to send email: ${response.status}`);
    }

    const result = await response.json().catch(() => ({ message: "Success but couldn't parse response" }));
    return { success: true, message: result.message || 'Email sent successfully' };
  } catch (error) {
    console.error('Email sending error:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

export default sendMail; 