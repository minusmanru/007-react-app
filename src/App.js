import React, {Component} from 'react';
import Layout from './hoc/Layout/Layout'
import {Route, Switch } from 'react-router-dom' // подключаем маршрутизатор Switch - позволяет загружать только один роут
import Quiz from './conteiners/Quiz/Quiz';

import QuizList from './conteiners/QuizList/QuizList';
import Auth from './conteiners/Auth/Auth';
import QuizCreator from './conteiners/QuizCreator/QuizCreator';

// здесь рендерим нужную страницу

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          
          <Route path="/auth" render={() => <Auth />} />
          <Route path="/quiz-creator" render={() => <QuizCreator />} />
          <Route path="/quiz/:id" render={(props) => <Quiz {...props} />} /> 
          {/* для теста используется динамический :id подгружаемый отдельно. отправляем параметры history length match в <Quiz  пропсами - {...props}  */}
          <Route exact path="/" render={() => <QuizList />} />
          <Route render={() => <h1 style={{color: 'red', fontSize: '29px', textAlign: 'center'}}>404 - This page is not found!</h1>} />
        </Switch>
      </Layout>
    );
  }
}

export default App
