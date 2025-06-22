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

app.use(session ({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    }
}))

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get("/", (req, res) => {
    res.json({
        message: "Notes Backend Server is running",
        authenticated: req.isAuthenticated(),
        user: req.isAuthenticated() ? req.user.name : null
    });
});

app.use('/auth', authRoutes);
app.use('/api/notes', notesRoutes);

// Initialize database connection and start server
const startServer = async () => {
    try {
        await connectDatabase();
        configurePassport();
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();