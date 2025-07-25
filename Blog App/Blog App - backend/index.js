const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const cors = require('cors');

dotenv.config();
connectDB();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin:[
        'http://localhost:5173',
    ],
    method: ['GET', 'POST', 'DELETE'],
}))

app.use('/api/users', require('./src/Routes/userRoutes'));
app.use('/api/blogs', require('./src/Routes/blogRoute'));
app.use('/api/comments', require('./src/Routes/commentRoute'));

// Optional: Only include when commentRoutes.js exists
// app.use('/api/comments', require('./src/Routes/commentRoutes'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
     