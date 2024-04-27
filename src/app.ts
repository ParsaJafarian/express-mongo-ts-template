import express from "express";
import logger from "morgan";
import * as path from "path";
import session from 'express-session';
import mongoSanitizer from 'express-mongo-sanitize';
import { errorHandler, errorNotFoundHandler } from "./middlewares/errorHandler";
import { index } from "./routes/index";
import { connectDB } from "./utils/db";
import dotenv from 'dotenv';
dotenv.config();

import userRouter from './routes/users';

export const app = express();

connectDB();

app.use(express.json());
app.use(mongoSanitizer());
app.use(express.static('../client/build'));

app.use(session({
    secret: 'abcdefghijklmnopqrstuvwxyz',
    name: 'id',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1200000,
        secure: app.get('env') === 'production',
        httpOnly: true,
        sameSite: 'strict',
    },
}));

// Express configuration
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");

app.use(logger("dev"));

app.use(express.static(path.join(__dirname, "../public")));

app.use("/", index);
app.use('/users', userRouter);

app.use(errorNotFoundHandler);
app.use(errorHandler);
