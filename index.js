import express from 'express';
import cookieparser from 'cookie-parser';
import bodyparser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import { connectDatabase } from './database/db.js';
import configurePassport from './config/passport.js';
import passport from 'passport';
import authRoutes from './routes/authRoutes.js';
import notesRoutes from './routes/notesRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Correctly invoke middleware functions
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true, // Allow cookies to be sent
}));
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

app.get("/", (req, res) => {
    res.json({
        message: "Server is running",
    });
});

// Initialize database connection and start server
const startServer = async () => {
    try {
        await connectDatabase();
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();