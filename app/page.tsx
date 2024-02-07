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
    const savedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
    setTodos(savedTodos);
    (async () => {
      setIsLoading(true);
      const data = await getTodos();
      if (data) setTodos(data);
      setIsLoading(false);
    })();
  }, [])

  useEffect(() => {
    const tags = loadTags(todos, autoCompleteTags);
    localStorage.setItem('todos', JSON.stringify(todos));
    setAutoCompleteTags(tags);
  }, [todos, autoCompleteTags])

  const saveTodo = async (value: string, tags: string[]) => {
    if (value.trim() !== '') {
      setIsLoading(true); // ローディングを開始
  
      try {
        // 新しい todo をサーバーに保存
        const newTodo = { value, tags };
        await postTodos([...todos, newTodo]); // 古い todo に新しい todo を追加して保存
  
        // ローカルの todos ステートを更新
        setTodos(prevTodos => [...prevTodos, newTodo]);
      } catch (error) {
        console.error('Failed to save todo:', error);
      }
  
      setIsLoading(false); // ローディングを終了
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
