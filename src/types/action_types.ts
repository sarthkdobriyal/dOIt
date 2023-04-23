import { Todo } from "./todo"

 type Actions = 
| {
    type: "add",
    payload: string,
} | {
    type: "remove",
    payload: Number
} | {
    type: "done",
    payload: Number
} | {
    type: "edit",
    payload: {
        id: Number,
        editText: string
    }
} | {
    type: "set",
    payload: Todo[]
}

export default Actions