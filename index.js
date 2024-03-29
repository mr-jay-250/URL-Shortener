import express from 'express';
import router from './routes/url.js';
import { mongoDbConnect } from './connection.js';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 5000;

mongoDbConnect(process.env.MONGO_URI).then(() => {
  console.log('DB Connected');
})


app.use(express.json())

app.use('/url', router)

app.listen(PORT, () => console.log(`Server is started on ${PORT}`))