import { FC, useEffect, useRef, useState } from "react";
import { Todo } from "../types/todo";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import Actions from "../types/action_types";
import { Draggable } from "react-beautiful-dnd";

interface SingleTodoProps {
  index: number;
  key: number;
  todo: Todo;
  todos: Todo[];
  dispatch: React.Dispatch<Actions>;
  setCompletedTasks?: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: FC<SingleTodoProps> = ({ index, todo, todos, dispatch }) => {
  const [edit, setEdit] = useState<Boolean>(false);
  const [editText, setEditText] = useState<string>(todo.content);

  const handleEdit = (e: React.FormEvent, id: Number) => {
    e.preventDefault();
    dispatch({
      type: "edit",
      payload: {
        id: id,
        editText: editText,
      },
    });
    setEdit(false);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
        {...provided.dragHandleProps}
        ref={provided.innerRef}
          {...provided.draggableProps}
          className={`w-[90%] hover:shadow-2xl hover:scale-105  bg-pink-300  rounded-md p-3 flex items-center px-4 md:px-7 justify-between ${snapshot.isDragging? "shadow-[0_0_20px_rgba(0,0,0)]" : ""}`}
          onSubmit={(e) => handleEdit(e, todo.id)}
        >
          {edit ? (
            <input
              ref={inputRef}
              className="p-1 outline-none text-gray-900 mx-4 rounded-lg px-3"
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
          ) : (
            <span
              className={`text-black font-semibold text-sm md:text-lg font-neucha tracking-wider flex-1 ${
                todo.completed ? "line-through decoration-4" : ""
              }`}
            >
              {todo.content}
            </span>
          )}
          <div className="flex gap-4 md:gap-2 flex-2 ">
            <span
              className="cursor-pointer w-1 h-1 md:w-5 md:h-5"
              onClick={() => {
                !todo.completed && !edit && setEdit(true);
              }}
            >
              <AiFillEdit />
            </span>
            <span
              className="cursor-pointer w-1 h-1 md:w-5 md:h-5"
              onClick={() => dispatch({ type: "remove", payload: todo.id })}
            >
              <AiFillDelete />
            </span>
            <span
              className="cursor-pointer w-1 h-1 md:w-5 md:h-5"
              onClick={() => dispatch({ type: "done", payload: todo.id })}
            >
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
