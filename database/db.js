import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "../entities/userEntity.js";
import { Note } from "../entities/noteEntity.js";

// Load environment variables
dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_DATABASE || "notes_db",
    
    synchronize: process.env.NODE_ENV === 'development',
    // logging: process.env.NODE_ENV === 'development',
    entities: [User, Note], // Path to your entity files

});

export const connectDatabase = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};