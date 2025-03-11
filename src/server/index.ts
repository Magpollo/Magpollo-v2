import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import upload from './middlewares/upload';
import sendMailHandler from './api/send_mail';

// Create Express server
const app = express();
const port = process.env.PORT || 3001;

// Parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure API endpoints
app.post('/api/send_mail', upload.array('file', 5), (req, res) => {
  sendMailHandler(req, res).catch(err => {
    console.error('Unhandled error in send_mail handler:', err);
    if (!res.headersSent) {
      res.status(500).json({ message: 'Internal server error', error: err.message });
    }
  });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../dist')));
  
  // Serve index.html for all routes (for client-side routing)
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
  });
}

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app; 