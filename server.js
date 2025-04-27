require('dotenv').config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' :
        process.env.NODE_ENV === 'staging' ? '.env.staging' : '.env'
});

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: function(origin, callback) {
    const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['*'];
    
    if (!origin) {
      return callback(null, true);
    }
    
    if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS policy'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
};

app.use(cors(corsOptions));

if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
  app.use(compression());
}

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.use(express.json());

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('API server for querying Ethereum smart contracts');
});

app.use((err, req, res, next) => {
  if (err.message === 'Blocked by CORS policy') {
    return res.status(403).json({
      error: 'CORS not allowed for this origin'
    });
  }
  next(err);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📈 Test endpoint available at http://localhost:${PORT}/api/AsielApiTest`);
  console.log(`🔒 CORS configured with: ${process.env.ALLOWED_ORIGINS || '*'}`);
});