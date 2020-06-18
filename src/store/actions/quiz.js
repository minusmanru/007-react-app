// здесь все экшн криайторы необходимые для тестов
import axios from '../../axios/axios-quiz' // библиотека импортится не из 'axios', а из файлика axios-quiz
// import fetchQuizes from './quiz';

import { FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZ_SUCCESS, FETCH_QUIZES_ERROR, QUIZ_SET_STATE, QUIZ_IS_FINISHED, QUIZ_NEXT_QUESTION, GO_TO_START} from './actionTypes';

//import quiz from '../reducers/quiz';

export function fetchQuizes() { // метод fetchQuizes() - асинхронное событие, возвращает новую функцию принимающую параметр dispatch
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get('/quizes.json') // урл https://react-app-e12a9.firebaseio.com - импортируется  

            const quizes = []
            
            Object.keys(response.data).forEach((key, index) => { // на каждой итерации кладем в const quizes объект
                quizes.push({
                    id: key,
                    name: `Тест №${index + 1}`

                })
            })

            // this.setState({
            //     quizes, loading: false
            // })
            dispatch(fetchQuizesSuccess(quizes))
            console.log(response.data);
            
        } catch (e) {
            dispatch(fetchQuizesError(e))
        }
    } 
}

export function fetchQuizById(quizId) { 
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get(`/quizes/${quizId}.json`)
            const quiz = response.data
            
            dispatch(fetchQuizSuccess(quiz))
        } catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}



export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}

export function fetchQuizesStart() { 
    return {
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes
    }
}

export function fetchQuizesError(e) {
    return {
        type: FETCH_QUIZES_ERROR,
        error: e
    }
}

export function quizNextActivQuestion(activeQuestion) {
    return {
        type: QUIZ_NEXT_QUESTION,
        activeQuestion
    }
}



export function quizSetState(answerState, results) {
    return {
        type: QUIZ_SET_STATE,
        answerState, results
    }
}

export function quizIsFinished() {
    return {
        type: QUIZ_IS_FINISHED
    }
}

export function goToStart() {
    return {
        type: GO_TO_START

    }
}




export function quizAnswerClick(answerId) {
    return (dispatch, getState) => {
        const state = getState().quiz
        if (state.answerState) {
            const key = Object.keys(state.answerState)[0]
            if (state.answerState[key] !== 'success') {
               
                
               return  console.log(state.answerState[key]);
            } else {
                return
            }
        }
        
        const results = state.results
        const question = state.quiz[state.activeQuestion]

        if (answerId === question.rightAnswerId) {
            results[state.activeQuestion] = 'success'

            dispatch(quizSetState({ [answerId]: 'success'}, results))
            

            const timeout = window.setTimeout(() => {

                if (isQuizFinished(state)) {
                    dispatch(quizIsFinished())
                    
                }  else {
                    // this.setState({
                    //     activeQuestion: this.props.activeQuestion + 1,
                    //     answerState: null
                    // })

                    dispatch(quizNextActivQuestion(state.activeQuestion + 1))
                }  

               window.clearTimeout(timeout)     
            }, 1000)

        }   else if (answerId !== question.rightAnswerId) {

            results[state.activeQuestion] = 'error' 

            dispatch(quizSetState({ [answerId]: 'error'}, results))
            

            const timeout1 = window.setTimeout(() => {
                
                if (isQuizFinished(state)) {
                    dispatch(quizIsFinished())

                    // this.setState({
                    //     isFinished: true
                    // })
                    
                }  else {
                    dispatch(quizNextActivQuestion(state.activeQuestion + 1))
                    // this.setState({
                    //     activeQuestion: this.props.activeQuestion + 1,
                    //     answerState: null
                    // })
                }  

               window.clearTimeout(timeout1)     
            }, 1000)

        }
    }
}

function isQuizFinished(state) {
    console.log('state ', state);
    
    return state.activeQuestion + 1 === state.quiz.length 
}