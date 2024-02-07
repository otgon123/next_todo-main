import { Todo } from "@/app/models/Todo";
import { Badge } from "@/app/components/tag/Badge";

export interface TodoDetailProps {
    index: number;
    todo: Todo;
    onDeleteTodo?: any;
}

const TodoDetail = ({ index, todo, onDeleteTodo }: TodoDetailProps) => {
    const deleteClass = "text-white text-xs px-3 py-1 mb-2 rounded bg-red-500 hover:bg-red-700";
    return (
        <div key={index} className="flex items-center border-b border-gray-200">
            <div className="w-[80%] p-2">
                <div className="mb-2">{todo.value}</div>
                <div>
                    {
                        todo?.tags && todo?.tags.map((tag, tagIndex) => (
                            <Badge label={tag} key={tagIndex} />
                        ))
                    }
                </div>
            </div>

            <div className="w-[20%]">
                <button
                    onClick={() => onDeleteTodo(index)}
                    className={deleteClass}
                >Delete
                </button>
            </div>
        </div>
    );
}

export default TodoDetail;