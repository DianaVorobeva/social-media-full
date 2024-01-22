import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import AuthRoute from './Routes/AuthRoute.js';
import UserRoute from './Routes/UserRoute.js';
import PostRoute from './Routes/PostRoute.js';
import UploadRoute from './Routes/UploadRoute.js';
import ChatRoute from './Routes/ChatRoute.js';
import MessageRoute from './Routes/MessageRoute.js';
import SearchRoute from './Routes/SearchRoute.js';
import SupportRoute from './Routes/SupportRoute.js';
import NotificationsRoute from './Routes/NotificationsRoute.js';



const app = express();

// middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// to serve images inside public folder
app.use(express.static('public')); 
app.use('/images', express.static('images'));

dotenv.config();


mongoose
.connect(process.env.MONGO_LINK, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then (() => app.listen(process.env.PORT, () => console.log(`App is running at PORT ${process.env.PORT}`)))
.catch((error) => console.log(error))

app.use('/auth', AuthRoute);
app.use('/user', UserRoute);
app.use('/post', PostRoute);
app.use('/upload', UploadRoute);
app.use('/chat', ChatRoute);
app.use('/message', MessageRoute);
app.use('/search', SearchRoute);
app.use('/support', SupportRoute);
app.use('/notifications', NotificationsRoute);