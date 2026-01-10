import express from 'express';
import cors from 'cors';
import coursesRouter from './routes/courses';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.use('/api/courses', coursesRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
