

const initialState = {
    quiz: []
}

export default function createQuizReducer(state = initialState, action) {
    switch(action.type) {
        case QUIZ: 
            return {
                quiz: action.quiz 
            }
    }
}