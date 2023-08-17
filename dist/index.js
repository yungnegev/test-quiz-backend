import express from 'express';
import cors from 'cors';
import { getQuestions, postResults } from './controllers/quiz.js';
// разработка: npm run dev
// запуск: npm run build && npm run start
// express app
const app = express();
const PORT = 3000; // можно было через .env
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => {
    res.send('Тест API');
});
// routes
app.get('/questions', getQuestions);
app.post('/results', postResults);
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
