import express from 'express';
import morgan from 'morgan';
import router from './routes/index.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { connectDB } from '../config/db.js';

const app = express();
const port = 3000;

await connectDB();

app.use(cookieParser());
app.use(morgan('combined'));
app.use(express.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
}));

router(app);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});