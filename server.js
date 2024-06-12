const app = require('./src/app');
const cors = require('cors');

const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: 'http://localhost:5173',
};

// Enable CORS middleware with options
app.use(cors(corsOptions));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
