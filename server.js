import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import AuthMiddleware from './middlewares/auth.js';
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(AuthMiddleware);

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 4000;
connectDB().then(()=>{
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
).catch((err) => console.error('Error connecting to MongoDB:', err));
