"use client"

import React, { useEffect, useState } from 'react';
import { postTodos, getTodos } from './services/TodoService';
import { Todo, initialAutoCompleteTags, loadTags } from '@/app/models/Todo';
import TodoList from '@/app/components/todo/TodoList';
import TodoForm from '@/app/components/todo/TodoForm';
import Loading from '@/app/components/Loading';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [autoCompleteTags, setAutoCompleteTags] = useState<string[]>(initialAutoCompleteTags);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await getTodos();
      if (data) setTodos(data);
      setIsLoading(false);
    })();
  }, [])

  useEffect(() => {
    const tags = loadTags(todos, autoCompleteTags);
    setAutoCompleteTags(tags);
  }, [todos, autoCompleteTags])

  const saveTodo = async (value: string, tags: string[]) => {
    if (value.trim() !== '') {
      setIsLoading(true);
      const data = [{ value, tags }, ...todos];
      await postTodos(data);
      setTodos(data);
      setIsLoading(false);
    }
  };

  const deleteTodo = async (index: number) => {
    setIsLoading(true);
    const data = todos.filter((_, i) => i !== index);
    await postTodos(data);
    setTodos(data);
    setIsLoading(false);
  };

  if (isLoading) return <Loading />

  return (
    <div>
      <TodoForm
        onSaveTodo={saveTodo}
        autoCompleteTags={autoCompleteTags} />
      <TodoList
        todos={todos}
        onDeleteTodo={deleteTodo} />
    </div>
  );
}
