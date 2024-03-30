import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import { mongoDbConnect } from './connection.js';
import { restrictToLoggedInUser, checkAuth } from './middlewares/auth.js';
import urlRoute from './routes/url.js';
import staticRoute from './routes/staticRouter.js';
import userRoute from './routes/user.js';

const app = express();
const PORT = process.env.PORT || 5000;

mongoDbConnect(process.env.MONGO_URI).then(() => {
  console.log('DB Connected');
})

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());

app.use('/url', restrictToLoggedInUser, urlRoute);
app.use('/user', userRoute);
// SSR
app.use('/', checkAuth, staticRoute);

app.listen(PORT, () => console.log(`Server is started on ${PORT}`))