import React, {Component} from 'react'
import classes from './Quiz.css'
import ActiveQuiz from './../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from './../../components/FinishedQuiz/FinishedQuiz';
import axios from '../../axios/axios-quiz'
import Loader from './../../components/UI/Loader/Loader';
import { connect } from 'react-redux';
import {fetchQuizById, quizAnswerClick, goToStart} from '../../store/actions/quiz' 

// Quiz - страница с тестом
class Quiz extends Component {

    

    componentDidMount() {
        //console.log('Q id  - ', this.props.match.params.id);
       this.props.fetchQuizById(this.props.match.params.id) 
        
    }

    componentWillMount() {
        this.props.goToStart()
    }

    
    render() {
        console.log('this.props activeQuestion ', this.props.activeQuestion)
        //console.log('activeQuestion * ', this.props.quiz)
        
        return (
           
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    { this.props.isFinished ? <h1>Вы ответили на все вопросы!</h1> : <h1>Ответьте на все вопросы!</h1>}
                    
                    { 
                        this.props.loading || !this.props.quiz // если идет загрузка и нет элемента quiz - показываем лоадер
                        ? <Loader />
                        :  this.props.isFinished 
                            ? <FinishedQuiz toStart={this.props.goToStart} 
                            results={this.props.results}
                            quiz={this.props.quiz}
                            /> 
                            :  <ActiveQuiz 
                            
                            answers={this.props.quiz[this.props.activeQuestion].answers}
                            question={this.props.quiz[this.props.activeQuestion].question}
                            // функцию onAnswerClickHandler передаём параметром - onAnswerClick={this.onAnswerClickHandler()}  в <ActiveQuiz />
                            onAnswerClick={this.props.quizAnswerClick}
                            quizlength={this.props.quiz.length}
                            answerNumber={this.props.activeQuestion + 1}
                            state={this.props.answerState}
                        />
                        
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        loading: state.quiz.loading,
        results: state.quiz.results, 
        activeQuestion: state.quiz.activeQuestion,
        isFinished: state.quiz.isFinished, 
        answerState: state.quiz.answerState, 
        quiz: state.quiz.quiz
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
        goToStart: () => dispatch(goToStart())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)