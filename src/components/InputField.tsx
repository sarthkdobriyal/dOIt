import { FC } from "react";
import { Todo } from '../types/todo';

interface InputFieldProps {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  addTodo: (e:React.MouseEvent<HTMLButtonElement> ) => void;
}

const InputField: FC<InputFieldProps> = ({ todo, setTodo, addTodo }) => {
  return (
    <div className="min-w-screen p-3 flex items-center justify-center">
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        className="w-[60%] rounded-lg p-3 outline-none placeholder:text-gray-400 shadow-inner"
        placeholder="Enter a task"
      />
      <button 
         onClick={(e) => addTodo(e)}   
        className="p-3 w-20 md:w-40 ml-2 border border-green-400 rounded-xl font-bold font-xl hover:bg-green-400 hover:text-white active:scale-[0.8] outline-none">
        dOIt
      </button>
    </div>
  );
};

export default InputField;
