import { FC, useState } from 'react'
import { Todo } from '../types/todo'
import SingleTodo from './SingleTodo'
import Actions from '../types/action_types'
import {Droppable} from 'react-beautiful-dnd'

interface TasksProps {
    todo: string,
    todos: Todo[],
    dispatch: React.Dispatch<Actions>,
    setCompletedTasks:React.Dispatch<React.SetStateAction<Todo[]>>,
    completedTasks: Todo[]
}

const Tasks: FC<TasksProps> = ({todo, todos, dispatch, completedTasks, setCompletedTasks}) => {


  



  return <div className='min-w-screen min-h-screen  flex p-2 gap-4 pt-7 '>
    {/* //pending Tasks */}

    <Droppable droppableId='tasklist'>
            {
                (provided, snapshot) => (
                    <div className={`${snapshot.isDraggingOver ? "bg-gray-400" : ""} h-fit w-full flex flex-col items-center gap-4 py-3 bg-gray-300 rounded-lg `} ref={provided.innerRef} {...provided.droppableProps}>
            <span className="font-neucha text-base md:text-3xl text-pink-400 tracking-widest font-bold"> ACTIVE Tasks </span>

            {
                todos.map((todo , index) => (
                    <SingleTodo 
                    index={index}
                    key={todo.id}    
                    todo={todo}
                        todos={todos}
                        dispatch={dispatch}
                        setCompletedTasks={setCompletedTasks}
                    />
                ))
            }
            {provided.placeholder}
        </div>
                )
            }
            
    </Droppable>
        
    {/* //Tasks done */}

        <Droppable droppableId='completedTasks'>
            {
                (provided, snapshot) => (
                    <div className= {`${snapshot.isDraggingOver ? "bg-red-300" : ""} h-fit w-full flex flex-col items-center gap-4 py-3 bg-red-200 rounded-lg`} ref={provided.innerRef} {...provided.droppableProps}>
        <span className="font-neucha ext-base md:text-3xl text-gray-600 tracking-widest font-bold"> COMPLETED Tasks </span>
        {
                completedTasks.map((todo , index) => (
                    <SingleTodo 
                    index={index}
                    key={todo.id}    
                    todo={todo}
                        todos={completedTasks}
                        dispatch={dispatch}
                    />
                ))
            }
            {provided.placeholder}
        </div>
                )
            }


        </Droppable>
        

  </div>
}

export default Tasks