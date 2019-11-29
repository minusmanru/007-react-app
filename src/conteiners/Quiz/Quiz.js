import React, {Component} from 'react'
import classes from './Quiz.css'
import ActiveQuiz from './../../components/ActiveQuiz/ActiveQuiz';
// Quiz - страница с тестом
class Quiz extends Component {
    // в массиве quiz: - параметры относящиеся к голосованию, вопросы и правильные ответы
    state = {
        activeQuestion: 0,
        isFinished: false,
        answerState: null,
        quiz: [ 
            {
               question: 'Какого цвета небо?',
               rightAnswerId: 3, 
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
        console.log(this.state.answerState);
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            //console.log(key);
            if (this.state.answerState[key] === 'success') {
               return 
            }
        }
        
        if (answerId === this.state.quiz[this.state.activeQuestion].rightAnswerId) {
            this.setState({
                answerState: { [answerId]: 'success'}
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

        }   else {

            this.setState({
                answerState: { [answerId]: 'error'}
            })

        }

    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length 
    }
    
    

    render() {
        console.log('actQ ', (this.state.activeQuestion + 1) , ' quiz.length ', this.state.quiz.length);

        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы!</h1>
                    {
                        this.state.isFinished 
                        ? <h1>Поздравляем, вы ответили на все вопросы!</h1> 
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