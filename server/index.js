 import express from 'express';
import multer from 'multer';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import fs from 'fs';
import { AIService } from './services/aiService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5001;

// Initialize services
const aiService = new AIService();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../dist')));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

// Import and use chat routes
import chatRoutes from './routes/chatRoutes.js';
app.use('/', chatRoutes);

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message, userId } = req.body;
    const response = await aiService.generateResponse(userId, message);
    res.json({ data: response });
  } catch (error) {
    console.error('Chat Error:', error);
    res.status(500).json({ 
      error: 'Failed to process chat message',
      details: error.message 
    });
  }
});

app.post('/api/analyze-health', async (req, res) => {
  try {
    const { userId, healthData } = req.body;
    const analysis = await aiService.analyzeHealthData(userId, healthData);
    res.json({ data: analysis });
  } catch (error) {
    console.error('Health Analysis Error:', error);
    res.status(500).json({ 
      error: 'Failed to analyze health data',
      details: error.message 
    });
  }
});

app.post('/api/training-plan', async (req, res) => {
  try {
    const { userId, preferences } = req.body;
    const plan = await aiService.generateTrainingPlan(userId, preferences);
    res.json({ data: plan });
  } catch (error) {
    console.error('Training Plan Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate training plan',
      details: error.message 
    });
  }
});

app.post('/api/analyze-document', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No document uploaded' });
    }

    // Run Python script for document analysis
    const pythonProcess = spawn('python', [
      path.join(__dirname, 'services', 'mlService.py'),
      req.file.path
    ]);

    let result = '';
    let error = '';

    pythonProcess.stdout.on('data', (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      error += data.toString();
    });

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        console.error('Python script error:', error);
        return res.status(500).json({
          success: false,
          message: 'Error analyzing document',
          error: error
        });
      }

      try {
        const analysis = JSON.parse(result);
        res.json({
          success: true,
          message: 'File uploaded and analyzed successfully',
          fileName: req.file.originalname,
          filePath: req.file.path,
          analysis: analysis
        });
      } catch (e) {
        console.error('Error parsing analysis result:', e);
        res.status(500).json({
          success: false,
          message: 'Error parsing analysis result',
          error: e.message
        });
      }
    });
  } catch (error) {
    console.error('Document Analysis Error:', error);
    res.status(500).json({ 
      error: 'Failed to analyze document',
      details: error.message 
    });
  }
});

app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    // Process the uploaded file
    const filePath = req.file.path;
    const fileName = req.file.originalname;

    // Run Python script for document analysis
    const pythonProcess = spawn('python', [
      path.join(__dirname, 'services', 'mlService.py'),
      filePath
    ]);

    let result = '';
    let error = '';

    pythonProcess.stdout.on('data', (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      error += data.toString();
    });

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        console.error('Python script error:', error);
        return res.status(500).json({
          success: false,
          message: 'Error analyzing document',
          error: error
        });
      }

      try {
        const analysis = JSON.parse(result);
        res.json({
          success: true,
          message: 'File uploaded and analyzed successfully',
          fileName: fileName,
          filePath: filePath,
          analysis: analysis
        });
      } catch (e) {
        console.error('Error parsing analysis result:', e);
        res.status(500).json({
          success: false,
          message: 'Error parsing analysis result',
          error: e.message
        });
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading file',
      error: error.message
    });
  }
});

// Catch-all route for React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    details: err.message 
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});