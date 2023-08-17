var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import data from '../data/quiz.json' assert { type: "json" };
// для большово проекта можно создать множество валидаторов входящих данных
// также можно использовать библиотеку вроде zod или express-validator для валидации с тайпскриптом
// и даже next чтобы иметь типизацию от конца до конца
export const getQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // отправляем вопросы из json на клиент
        const quizData = data;
        res.status(200).json(quizData);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Request failed (caught in controller).',
        });
    }
});
export const postResults = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // берем ответы пользователя и правильные ответы из json
        const userResults = req.body;
        const trueResults = data.questions.map((item) => item.correctAnswer);
        // сравниваем ответы
        const results = trueResults.map((item, index) => {
            if (item === userResults[index]) {
                return true;
            }
            else {
                return false;
            }
        });
        // считаем количество правильных ответов
        const count = results.filter(Boolean).length;
        // считаем процент правильных ответов
        const percentage = Math.round((count / results.length) * 100);
        // собираем все в один объект
        const checkedResults = {
            results,
            count,
            percentage,
            trueResults,
            testLength: results.length
        };
        res.status(200).json(checkedResults);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Request failed (caught in controller).',
        });
    }
});
