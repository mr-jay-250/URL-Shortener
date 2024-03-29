import express from 'express';
import path from 'path';
import router from './routes/url.js';
import staticRouter from './routes/staticRouter.js';
import { mongoDbConnect } from './connection.js';
import URL from './models/url.js';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 5000;

mongoDbConnect(process.env.MONGO_URI).then(() => {
  console.log('DB Connected');
})

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use('/url', router)
// SSR
app.use('/', staticRouter)

app.listen(PORT, () => console.log(`Server is started on ${PORT}`))