import React, {Component} from 'react'
import classes from './Quiz.css'
import ActiveQuiz from './../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from './../../components/FinishedQuiz/FinishedQuiz';

// Quiz - страница с тестом
class Quiz extends Component {
    // в массиве quiz: - параметры относящиеся к голосованию, вопросы и правильные ответы
    state = {
        firstClick: {},
        results: {}, // { [id]: 'success' 'error' }
        activeQuestion: 0,
        isFinished: false, 
        answerState: null, // { [id]: 'success' 'error' }
        quiz: [ 
            {
               question: 'Какого цвета небо?',
               rightAnswerId: 3, 
               id: 1,
               answers: [
                {text: 'Черный', id: 1},
                {text: 'Зелёный', id: 2},
                {text: 'Синий', id: 3},
                {text: 'Жёлтый', id: 4}
               ] 
            },
            {
                question: 'Дата основания Санкт-Петербурга?',
                rightAnswerId: 4, 
                id: 2,
                answers: [
                 {text: '2005', id: 1},
                 {text: '1390', id: 2},
                 {text: '1587', id: 3},
                 {text: '1703', id: 4}
                ] 
            },
            {
                question: 'Дата основания Октябрьской революции?',
                rightAnswerId: 2, 
                id: 3,
                answers: [
                 {text: '1305', id: 1},
                 {text: '1918', id: 2},
                 {text: '2007', id: 3},
                 {text: '1703', id: 4}
                ] 
            },
        ]
    }

     
    onAnswerClickHandler = (answerId) => {
        //console.log(this.state.answerState);
        
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] !== 'success') {
               
                
               return  console.log(this.state.answerState[key]);
            } else {
                return
            }
        }
        
        const results = this.state.results
        
        const question = this.state.quiz[this.state.activeQuestion]
        if (answerId === question.rightAnswerId) {
            results[this.state.activeQuestion] = 'success'
            this.setState({
                answerState: { [answerId]: 'success'},
                results
            })

            const timeout = window.setTimeout(() => {

                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                    
                }  else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }  

               window.clearTimeout(timeout)     
            }, 1000)

        }   else if (answerId !== question.rightAnswerId) {

            results[this.state.activeQuestion] = 'error' 
            this.setState({
                answerState: { [answerId]: 'error'},
                results
            })

            const timeout1 = window.setTimeout(() => {
                
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                    
                }  else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }  

               window.clearTimeout(timeout1)     
            }, 1000)

        }
        //console.log(results);
        
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length 
    }
    
    toStart = () => {
        this.setState({ 
            isFinished: false,
            answerState: null,
            activeQuestion: 0,
            results: {}
        })
    }
    
    render() {
        
        return (
           
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    { this.state.isFinished ? <h1>Вы ответили на все вопросы!</h1> : <h1>Ответьте на все вопросы!</h1>}
                    
                    {
                        this.state.isFinished 
                        ? <FinishedQuiz toStart={this.toStart} 
                        results={this.state.results}
                        quiz={this.state.quiz}
                        /> 
                        :  <ActiveQuiz 
                        
                        answers={this.state.quiz[this.state.activeQuestion].answers}
                        question={this.state.quiz[this.state.activeQuestion].question}
                        // функцию onAnswerClickHandler передаём параметром - onAnswerClick={this.onAnswerClickHandler()}  в <ActiveQuiz />
                        onAnswerClick={this.onAnswerClickHandler}
                        quizlength={this.state.quiz.length}
                        answerNumber={this.state.activeQuestion + 1}
                        state={this.state.answerState}
                        />
                    
                    }
                </div>
            </div>
        )
    }
}

export default Quiz