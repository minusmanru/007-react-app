// файл отвечает за редюсер который относится к QuizList и к текущему тесту.
import { FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS } from './../actions/actionTypes';
import { FETCH_QUIZES_ERROR, FETCH_QUIZ_SUCCESS , QUIZ_IS_FINISHED, QUIZ_NEXT_QUESTION, QUIZ_SET_STATE, GO_TO_START} from './../actions/actionTypes';

const initialState = { // это стейт для QuizList и Quiz
    quizes: [],
    loading: false,
    error: null,
    firstClick: {},
    results: {}, 
    activeQuestion: 0,
    isFinished: false, 
    answerState: null, 
    quiz: null
    
}

export default function quizReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_QUIZES_START:
            return {
                ...state, loading: true
            }
        case FETCH_QUIZES_SUCCESS:
            return {
                ...state, loading: false, quizes: action.quizes
            }
        case FETCH_QUIZES_ERROR:
            return {
                ...state, loading: false, error: action.error
            }
        case FETCH_QUIZ_SUCCESS:
            return {
                ...state, loading: false, quiz: action.quiz, error: action.error
            }
        case QUIZ_SET_STATE: 
            return {
                ...state, answerState: action.answerState, results: action.results
            }
        case QUIZ_IS_FINISHED: 
            return {
                ...state, isFinished: true
            }
        case QUIZ_NEXT_QUESTION: 
            return {
                ...state, activeQuestion: action.activeQuestion, answerState: null
            }
        case GO_TO_START:
            return {
                ...state, isFinished: false,
                answerState: null,
                activeQuestion: 0,
                results: {}
            }

        default: // дефолтный кейс вернет текущий стейт, если он не менялся. 
            return state
    }
}