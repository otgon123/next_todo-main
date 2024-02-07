"use client"

import { Todo } from "@/app/models/Todo";
import TodoDetail from "@/app/components/todo/TodoDetail";

interface TodoListProps {
    todos: Todo[];
    onDeleteTodo: (index: number) => void;
}

const TodoList = ({ todos, onDeleteTodo }: TodoListProps) => {

    return (
        <div>
            {todos.map((todo, index) => (
                <TodoDetail key={index} todo={todo} index={index} onDeleteTodo={onDeleteTodo} />
            ))}
        </div>
    );
}

export default TodoList;