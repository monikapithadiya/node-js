const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/products');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/products', productRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
