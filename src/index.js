import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom' // подключаем маршрутизатор
import * as serviceWorker from './serviceWorker';
import {createStore, compose, applyMiddleware } from 'redux' // импортируем стор из редукс, 
// createStore - создает стор
import {Provider} from 'react-redux' // импортируем Provider, что бы редукс поддерживался во всём приложении
import rootReducer from './store/reducers/rootReducer' // Корневой редюсер. Редюсеры обычные функции меняющие стейт
import thunk from 'redux-thunk' // thunk - надстройка (middleware) над redux, позволяет создавать асинхронные экшены.



const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;


const store = createStore( // в createStore() передаём Корневой редьюсер rootReducer, в котором все редьюсеры
    rootReducer, 
    composeEnhancers( // compose - позволяет вам писать глубоко вложенные функции преобразований без дрейфа вправо
        applyMiddleware(thunk) 
    )
    )
const app =  ( // оборачиваем всё приложение в <Provider>, что бы redux поддерживался во всём приложении, и параметром передаём в него store
    <Provider store={store}>        
        <BrowserRouter> <App /> </BrowserRouter> 
        {/* оборачиваем <App /> в </BrowserRouter>   */}
    </Provider>           
)
  
ReactDOM.render(app, document.getElementById('root'));

// в папке conteiners - корневые компоненты со своим state
// в папке components - функциональные компоненты. 

serviceWorker.unregister();
//serviceWorker.register();











// import {BrowserRouter} from 'react-router-dom'
// import registerServiceWorker from './registerServiceWorker';

// // application оборачивает <App /> в <BrowserRouter> и добавляет функционал из 'react-router-dom'
// const application = (
//   <BrowserRouter> 
//     <App />
//   </BrowserRouter>
// )

// ReactDOM.render(application, document.getElementById('root'));
// registerServiceWorker();

