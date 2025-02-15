'use client';

import { BoardInfo } from '../typescript/board';
import { Todo } from '../typescript/todo';
import { useState } from 'react';
import TodoList from './todoList';
import Input from '../components/input/input';
import Button from '../components/button/button';

export default function BoardItem({
  board,
  onDelete,
  onUpdate,
  dragHandleProps,
  onAddTodo,
}: {
  board: BoardInfo;
  onDelete: (id: number) => void;
  onUpdate: (id: number, newTitle: string) => void;
  onAddTodo: (boardId: number, todo: Todo) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dragHandleProps?: any;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(board.title);

  const [boardItemTitle, setBoardItemTitle] = useState('');

  const handleSave = () => {
    onUpdate(board.id, newTitle);
    setIsEditing(false);
  };

  const addTodo = () => {
    if (!boardItemTitle.trim()) {
      alert('할 일을 입력해주세요.');
      return;
    }
    const newTodo = {
      id: Date.now(),
      title: boardItemTitle,
      date: new Date().toLocaleDateString(),
    };

    onAddTodo(board.id, newTodo);
    setBoardItemTitle('');
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow-md">
      <div className="flex justify-between items-center gap-2">
        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="text-lg font-bold p-2 border rounded-md"
          />
        ) : (
          <h2 {...dragHandleProps} className="text-lg font-bold cursor-move">
            {board.title}
          </h2>
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
      <hr className="border-t border-gray-300 my-5" />
      <div className="flex gap-2">
        <Input
          value={boardItemTitle}
          onChange={(e) => setBoardItemTitle(e.target.value)}
          placeholder="할 일을 입력해주세요."
        />
        <Button name="할 일 추가" onClick={addTodo} />
      </div>
      <ul className="mt-2">
        {board.todoList.map((todo) => (
          <TodoList key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}
