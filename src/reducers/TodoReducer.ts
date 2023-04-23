import Actions from '../types/action_types'
import {Todo} from '../types/todo'

const TodoReducer = (state: Todo[], action: Actions) => {
    switch (action.type) {
      case "add":
        return [
          ...state,
          {
            id: Date.now(),
            content: action.payload,
            completed: false,
          }
        ]
      case "remove":
        return state.filter((todo) => todo.id !== action.payload)
      case "edit":
        return state.map((todo) => todo.id === action.payload.id ? {...todo, content: action.payload.editText} : todo )
      case "done":
        return state.map((todo) => todo.id === action.payload ? {...todo, completed: !todo.completed}: todo)
      case "set":
        return action.payload
      default:
        return state;
    }
}

export default TodoReducer