import React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
  Link,
} from '@react-email/components';

interface FormToEmailProps {
  name: string;
  email: string;
  company?: string;
  message?: string;
  selectedServices: Array<{ id: number; title: string }>;
  files?: Array<{ name: string }>;
}

export const FormToEmail: React.FC<FormToEmailProps> = ({
  name,
  email,
  company,
  message,
  selectedServices,
  files,
}) => {
  const previewText = `New inquiry from ${name} (${email})`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>New Inquiry from Magpollo Website</Heading>
          
          <Section style={section}>
            <Heading as="h2" style={subheading}>Contact Information</Heading>
            <Text style={text}>
              <strong>Name:</strong> {name}
            </Text>
            <Text style={text}>
              <strong>Email:</strong>{' '}
              <Link href={`mailto:${email}`} style={link}>
                {email}
              </Link>
            </Text>
            {company && (
              <Text style={text}>
                <strong>Company:</strong> {company}
              </Text>
            )}
          </Section>
          
          <Hr style={hr} />
          
          <Section style={section}>
            <Heading as="h2" style={subheading}>Services Requested</Heading>
            {selectedServices.length > 0 ? (
              <ul style={list}>
                {selectedServices.map((service) => (
                  <li key={service.id} style={listItem}>
                    {service.title}
                  </li>
                ))}
              </ul>
            ) : (
              <Text style={text}>No specific services selected.</Text>
            )}
          </Section>
          
          {message && (
            <>
              <Hr style={hr} />
              <Section style={section}>
                <Heading as="h2" style={subheading}>Message</Heading>
                <Text style={text}>{message}</Text>
              </Section>
            </>
          )}
          
          {files && files.length > 0 && (
            <>
              <Hr style={hr} />
              <Section style={section}>
                <Heading as="h2" style={subheading}>Attachments</Heading>
                <ul style={list}>
                  {files.map((file, index) => (
                    <li key={index} style={listItem}>
                      {file.name}
                    </li>
                  ))}
                </ul>
              </Section>
            </>
          )}
          
          <Hr style={hr} />
          
          <Section style={footer}>
            <Text style={footerText}>
              &copy; {new Date().getFullYear()} Magpollo. All rights reserved.
            </Text>
            <Text style={footerText}>
              This is an automated message from the Magpollo website contact form.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: '#f5f5f5',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px',
  backgroundColor: '#ffffff',
  borderRadius: '5px',
  maxWidth: '600px',
};

const heading = {
  color: '#ef4444',
  fontSize: '24px',
  lineHeight: '1.3',
  fontWeight: '700',
  textAlign: 'center' as const,
  margin: '30px 0',
};

const subheading = {
  color: '#333',
  fontSize: '20px',
  lineHeight: '1.3',
  fontWeight: '600',
  margin: '20px 0 10px',
};

const section = {
  padding: '0 15px',
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '1.5',
  margin: '10px 0',
};

const list = {
  margin: '10px 0',
  paddingLeft: '20px',
};

const listItem = {
  margin: '5px 0',
  color: '#333',
  fontSize: '16px',
  lineHeight: '1.5',
};

const link = {
  color: '#ef4444',
  textDecoration: 'underline',
};

const hr = {
  borderColor: '#ddd',
  margin: '20px 0',
};

const footer = {
  textAlign: 'center' as const,
  padding: '0 15px',
  marginTop: '20px',
};

const footerText = {
  color: '#777',
  fontSize: '14px',
  lineHeight: '1.5',
  margin: '5px 0',
};

export default FormToEmail; 