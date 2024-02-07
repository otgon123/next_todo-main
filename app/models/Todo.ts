export interface Todo {
    value: string;
    tags: string[]
}

const arrayValues = process.env.NEXT_PUBLIC_AUTO_TAGS;
export const initialAutoCompleteTags = arrayValues?.split(';') || [];

export const loadTags = (todos: Todo[], currentTags: string[]) => {
    if (!todos) return currentTags;
    var tags = currentTags;
    todos?.forEach((todo) => {
        if (todo.tags) {
            tags = [...tags, ...todo.tags];
            tags = tags.filter((value, index, self) => {
                return self.indexOf(value) === index;
            });
        }
    });
    tags.sort();
    return tags;
}