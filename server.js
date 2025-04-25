const express = require('express');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('API server for querying Ethereum smart contracts');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📈 Test endpoint available at http://localhost:${PORT}/api/AsielApiTest`);
});