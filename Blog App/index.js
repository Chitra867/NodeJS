const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');


dotenv.config();
connectDB();


const PORT = process.env.PORT

const app = express();
app.use(express.json())

app.use('/api/users',require('./src/Routes/userRoutes'))
app.use('/api/blogs',require('./src/Routes/blogRoute'))

app.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}...`);
});