import {combineReducers} from 'redux'
import quizReducer from './quiz';

// rootReducer - функция объединяет все редьюсеры
export default combineReducers({ // в combineReducers, передам объект конфигурации, с описанием всех редьюсеров
    quiz: quizReducer,
    createQuiz: createQuizReducer 
}) 