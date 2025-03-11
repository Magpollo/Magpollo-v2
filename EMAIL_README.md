# Magpollo Form Submission Implementation

This README documents the form submission functionality implementation for the Magpollo website.

## Overview

The form submission system allows users to:
- Submit contact information
- Select services they're interested in
- Attach files
- Receive confirmation feedback

Submissions are sent via email to the Magpollo sales team.

## Implementation Components

### 1. Form Template Component (`/src/emails/FormToEmail.tsx`)

- React-Email component that renders HTML emails
- Displays user information in a structured format
- Shows selected services and attachments
- Includes Magpollo branding

### 2. Email Sending Utility (`/src/utils/sendMail.ts`)

- Takes form data and prepares it for submission
- Renders the React-Email template
- Creates FormData with attachments
- Submits to the API endpoint
- Returns success/failure result

### 3. Server API Endpoint (`/src/server/api/send_mail.ts`)

- Express route handler for processing submissions
- Validates incoming data
- Configures Nodemailer with SendInBlue/Brevo
- Handles file attachments
- Sends the email to salesteam@magpollo.com

### 4. File Upload Middleware (`/src/server/middlewares/upload.ts`)

- Handles multipart form data
- Securely stores uploaded files temporarily
- Applies file size limits (10MB max)
- Restricts to 5 files maximum

### 5. Server Configuration (`/src/server/index.ts`)

- Sets up Express server
- Configures body parsers
- Registers the API endpoint
- Serves static files in production

## Environment Variables

Create a `.env` file with the following variables:

```
# Email configuration
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=your-smtp-user
SMTP_PASSWORD=your-smtp-password

# Email addresses
EMAIL_FROM=noreply@magpollo.com
EMAIL_TO=salesteam@magpollo.com
EMAIL_CC=team1@magpollo.com,team2@magpollo.com
```

## Integration with Form Component

The `LetsBuild.tsx` form component uses the `sendMail` utility function to submit form data when the user clicks submit.

## Setup Instructions

1. Install dependencies:
   ```
   npm install @react-email/components nodemailer express multer body-parser
   npm install --save-dev @types/nodemailer @types/express @types/multer
   ```

2. Create the `.env` file (see above)

3. Set up the server to run alongside your frontend
   - For development, you can use a proxy in your frontend config
   - For production, the server will serve static files and handle API requests

## Security Considerations

- File uploads are limited to 10MB and 5 files max
- Temporary files are cleaned up after processing
- SMTP credentials are stored in environment variables
- Validation is performed on required fields 