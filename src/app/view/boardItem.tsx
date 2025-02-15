'use client';

import { BoardInfo } from '../typescript/board';
import { useState } from 'react';
import TodoList from './todoList';

export default function BoardList({
  board,
  onDelete,
  onUpdate,
}: {
  board: BoardInfo;
  onDelete: (id: number) => void;
  onUpdate: (id: number, newTitle: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(board.title);

  const handleSave = () => {
    onUpdate(board.id, newTitle);
    setIsEditing(false);
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow-md w-1/3">
      <div className="flex justify-between items-center">
        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="text-lg font-bold p-2 border rounded-md"
          />
        ) : (
          <h2 className="text-lg font-bold">{board.title}</h2>
        )}

        <div className="flex gap-2">
          <button
            onClick={() => {
              if (isEditing) {
                handleSave();
              } else {
                setIsEditing(true);
              }
            }}
            className="text-base bg-blue-400 text-white px-2 py-1 rounded-md"
          >
            {isEditing ? '완료' : '수정'}
          </button>
          <button
            onClick={() => onDelete(board.id)}
            className="text-base bg-red-500 text-white px-2 py-1 rounded-md"
          >
            삭제
          </button>
        </div>
      </div>
      <ul className="mt-2">
        {board.todoList.map((todo) => (
          <TodoList key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}
