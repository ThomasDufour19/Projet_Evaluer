import { FormEvent, useState } from "react";
import "./App.css";

type Todo = {
    id: string;
    name: string;
};

function App() {
    const [todoList, setTodoList] = useState<Todo[]>([]);
    const [todoValue, setTodoValue] = useState<string | undefined>(undefined);
    const [selectedTodo, setSelectedTodo] = useState<string | undefined>(
        undefined
    );
    const [editedTodo, setEditedTodo] = useState<string | undefined>(undefined);

    const generateShortUniqueKey = () => {
        const array = new Uint8Array(4);
        crypto.getRandomValues(array);
        return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
            ""
        );
    };

    const handleSubmitTodo = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (todoValue) {
            setTodoList([
                ...todoList,
                { id: generateShortUniqueKey(), name: todoValue },
            ]);
            return setTodoValue(undefined);
        }
    };

    const handleValidateTodo = (todo: Todo) => {
        setTodoList(todoList.filter((savedTodo) => savedTodo.id !== todo.id));
    };

    const handleEditTodo = (id: string) => {
        if (editedTodo)
            setTodoList(
                todoList.map((todo) =>
                    todo.id === id ? { ...todo, name: editedTodo } : todo
                )
            );
        setSelectedTodo(undefined);
        setEditedTodo(undefined);
    };

    return (
        <>
            <div className="mainContainer">
                <div className="leftContainer">
                    <span>please enter your next Task to do:</span>
                    <form onSubmit={(e) => handleSubmitTodo(e)}>
                        <input
                            type="text"
                            value={todoValue || ""}
                            onChange={(e) => setTodoValue(e.target.value)}
                        />
                        <button type="submit">Add</button>
                    </form>
                </div>
                <div className="rightContainer">
                    <span>My tasks to do!</span>
                    {!todoList.length ? (
                        <span>Nothing to do! 🎉</span>
                    ) : (
                        todoList.map((todo) => (
                            <div key={todo.id}>
                                {selectedTodo === todo.id ? (
                                    <>
                                        <form onSubmit={() => handleEditTodo(todo.id)}>
                                            <input
                                                type="text"
                                                onChange={(e) => setEditedTodo(e.target.value)}
                                            />
                                            <button type="submit">Edit</button>
                                        </form>
                                    </>
                                ) : (
                                    <>
                                        <span>{todo.name}</span>
                                        <button onClick={() => handleValidateTodo(todo)}>V</button>
                                        <button onClick={() => setSelectedTodo(todo.id)}>
                                            Edit
                                        </button>
                                    </>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}

export default App;
