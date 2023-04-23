import React, { useReducer, useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import Navbar from "./components/Navbar";
import Tasks from "./components/Tasks";

import TodoReducer from "./reducers/TodoReducer";
import { Todo } from "./types/todo";

import {DragDropContext, DropResult} from 'react-beautiful-dnd'

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, dispatch] = useReducer(TodoReducer, []);
  const [completedTasks, setCompletedTasks] = useState<Todo[]>([])


  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;


    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = todos;
    let complete = completedTasks;

    // Source Logic
    if (source.droppableId === "tasklist") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "tasklist") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTasks(complete);
    dispatch({
      type:"set",
      payload:active
    })


  }


  return (
    <DragDropContext onDragEnd={onDragEnd}>

    <div className="min-h-screen bg-gray-200">
      <Navbar />
      <InputField
        todo={todo}
        setTodo={setTodo}
        addTodo={() => {
          dispatch({ type: "add", payload: todo });
          setTodo("")
        }}
        />
      <Tasks todo={todo} dispatch={dispatch} todos={todos} completedTasks={completedTasks} setCompletedTasks={setCompletedTasks}/>
    </div>
      </DragDropContext>
  );
};

export default App;
