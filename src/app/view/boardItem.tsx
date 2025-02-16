'use client';

import { useState } from 'react';
import { BoardInfo } from '../typescript/board';
import { useBoardStore } from '../store/useBoardStore';
import Input from '../components/input/input';
import Button from '../components/button/button';
import TodoList from './todoList';
import { Todo } from '../typescript/todo';

export default function BoardItem({
  board,
  dragHandleProps,
}: {
  board: BoardInfo;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dragHandleProps?: any;
}) {
  const { removeBoard, updateBoardTitle, addTodoToBoard } = useBoardStore();

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(board.title);
  const [boardItemTitle, setBoardItemTitle] = useState('');

  const handleSave = () => {
    updateBoardTitle(board.id, newTitle);
    setIsEditing(false);
  };

  const addTodo = () => {
    if (!boardItemTitle.trim()) {
      alert('할 일을 입력해주세요.');
      return;
    }
    const newTodo: Todo = {
      id: Date.now(),
      title: boardItemTitle,
      date: new Date().toLocaleDateString(),
    };

    addTodoToBoard(board.id, newTodo);
    setBoardItemTitle('');
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow-md">
      <div className="flex justify-between items-center gap-2">
        {isEditing ? (
          <Input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="입력해주세요."
          />
        ) : (
          <h2 {...dragHandleProps} className="text-lg font-bold cursor-move">
            {board.title}
          </h2>
        )}

        <div className="flex gap-2">
          <button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className="text-base bg-blue-400 text-white px-2 py-1 rounded-md"
          >
            {isEditing ? '완료' : '수정'}
          </button>
          <button
            onClick={() => removeBoard(board.id)}
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
          <TodoList key={todo.id} todo={todo} boardId={board.id} />
        ))}
      </ul>
    </div>
  );
}
