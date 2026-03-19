const express = require('express');
const connectdb = require('./Config/db'); 
;
const userRoutes = require('./Routes/studentRoutes'); 
const app = express();
const PORT = 3000;

app.use(express.json()); 
const cors = require('cors');
app.use(cors());

connectdb();


app.use('/students', userRoutes);  

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
