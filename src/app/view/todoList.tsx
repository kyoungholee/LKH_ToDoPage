'use client';

import { Todo } from '@/app/typescript/todo';

export default function TodoList({ todo }: { todo: Todo }) {
  return (
    <li key={todo.id} className="p-2 border-b">
      <p className="font-semibold">{todo.title}</p>
      <p className="text-xs text-gray-500">{todo.date}</p>
    </li>
  );
}
