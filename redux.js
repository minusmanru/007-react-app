const redux = require('redux')


const initialState = { // это объект описывающий всё приложение
    counter: 0
}

// Reducer - обэчная js функция делающая преобразования.

const reducer = (state = initialState, action) => { // объект state равняется начальному состоянию стейта - initialState 
    // всегда нужно возвращать новый стейт из этой функции

    if (action.type === 'ADD') {
        return { // возвращаем новый объект
            counter: state.counter + 1
        }
    }

    if (action.type === 'SUB') {
        return { // возвращаем новый объект
            counter: state.counter - 1
        }
    }

    if (action.type === 'ADD_NUMBER') {
        return { // возвращаем новый объект
            counter: state.counter + action.value
        }
    }

    'ADD_NUMBER'
    return state

}

// Store - стейт всего приложения. 

const store = redux.createStore(reducer)

store.subscribe(() => {  // при любом изменении store, вызовется .subscribe() и выдаст актуальный state
    console.log('Subscribe ', store.getState() );
    
})
//console.log('first state - ', store.getState()); // .getState() - текущее состояние стейта



// Actions.   action - имеет одно обязательное поле - type

const addCounter = { // действиек определяется полем - type
    type: 'ADD'
}

store.dispatch(addCounter)
store.dispatch({type: 'SUB'})
store.dispatch({type: 'ADD_NUMBER', value: 10})






