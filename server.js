const app = require('./src/app');
const PORT = process.env.PORT || 3000;
const cors = require('cors');


const corsOptions = {
  origin: 'http://localhost:5173',
};
// Enable CORS middleware
app.use(cors());
// app.use(express.json());


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
