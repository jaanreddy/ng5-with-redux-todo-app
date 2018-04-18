import { ITodo } from './todo';
import { ADD_TODO, REMOVE_TODO, REMOVE_ALL_TODOS, TOGGLE_TODO } from './actions'
 
export interface IAppState{
    todos: ITodo[];
    lastUpdatedOn:Date;
}

export const INITIAL_STATE:IAppState = {
    todos: [],
    lastUpdatedOn: null
}

export function rootReducer(state, action){
    console.log(state)
    switch( action.type ){
        case ADD_TODO:
            action.todo.id = state.todos.length+1;
            return Object.assign({}, state, {
                todos: state.todos.concat(Object.assign({},action.todo)),
                lastUpdate: new Date()
            })

        case REMOVE_TODO:
            return Object.assign({}, state, {
                todos: state.todos.filter(t=> t.id != action.id),
                lastUpdatedOn: new Date()
            })

        case REMOVE_ALL_TODOS:
            return Object.assign({}, state,{
                todos:[],
                lastUpdatedOn: new Date()
            })

        case TOGGLE_TODO:
            var todo = state.todos.find(t=> t.id === action.id);
            var index = state.todos.indexOf(todo);
            return Object.assign({}, state,{
                    todos: [
                        ...state.todos.slice(0,index),
                        Object.assign({}, todo, {isCompleted: !todo.isCompleted}),
                        ...state.todos.slice(index+1),
                    ],
                    lastUpdatedOn: new Date()
                })
    }
    return state;
}
