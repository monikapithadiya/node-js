const express = require('express');
const connectDB = require('./db');
const bookRoutes = require('./routes/bookRoutes');
const app = express();

connectDB();
app.use(express.json());

app.use('/api/books', bookRoutes);

app.get('/', (req, res) => {
  res.send('Bookstore API is running');
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
