'use client';

import { useState, useEffect } from 'react';
import Button from '../components/button/button';

interface Todo {
  id: number;
  title: string;
  des: string;
  date: string;
}

interface Board {
  id: number;
  title: string;
  todoList: Todo[];
}

// 개별 보드 컴포넌트
const Board = ({
  board,
  onDelete,
  onUpdate,
}: {
  board: Board;
  onDelete: (id: number) => void;
  onUpdate: (id: number, newTitle: string) => void;
}) => {
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
          <li key={todo.id} className="p-2 border-b">
            <p className="font-semibold">{todo.title}</p>
            <p className="text-sm text-gray-600">{todo.des}</p>
            <p className="text-xs text-gray-500">{todo.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function TodoList() {
  const [boardList, setBoardList] = useState<Board[]>([]);
  const [boardTitle, setBoardTitle] = useState('');

  // 로컬스토리지에서 보드 불러오기
  useEffect(() => {
    const storedBoards = localStorage.getItem('boards');
    if (storedBoards) {
      setBoardList(JSON.parse(storedBoards));
    }
  }, []);

  // 로컬스토리지에 보드 저장하기
  const saveToLocalStorage = (boards: Board[]) => {
    localStorage.setItem('boards', JSON.stringify(boards));
  };

  // 보드 추가
  const addBoard = () => {
    if (!boardTitle.trim()) {
      alert('보드 제목을 입력해주세요!');
      return;
    }

    const newBoard: Board = {
      id: Date.now(),
      title: boardTitle,
      todoList: [],
    };

    const updatedBoards = [...boardList, newBoard];
    setBoardList(updatedBoards);
    saveToLocalStorage(updatedBoards);
    setBoardTitle(''); // 입력창 초기화
  };

  // 보드 삭제
  const removeBoard = (id: number) => {
    const updatedBoards = boardList.filter((board) => board.id !== id);
    setBoardList(updatedBoards);
    saveToLocalStorage(updatedBoards);
  };

  const updateBoardTitle = (id: number, newTitle: string) => {
    const updatedBoards = boardList.map((board) =>
      board.id === id ? { ...board, title: newTitle } : board
    );
    setBoardList(updatedBoards);
    saveToLocalStorage(updatedBoards);
  };

  return (
    <div className="p-5">
      <h1 className="text-center text-2xl font-bold">📝 할 일 보드</h1>

      {/* 보드 추가 폼 */}
      <div className="flex gap-2 my-4 justify-center">
        <input
          type="text"
          value={boardTitle}
          onChange={(e) => setBoardTitle(e.target.value)}
          placeholder="보드 제목 입력..."
          className="border p-2 rounded-md"
        />
        <Button name="보드 추가" onClick={addBoard} />
      </div>

      {/* 보드 리스트 */}
      <div className="flex gap-4 justify-center my-5">
        {boardList.map((board) => (
          <Board
            key={board.id}
            board={board}
            onDelete={removeBoard}
            onUpdate={updateBoardTitle}
          />
        ))}
      </div>
    </div>
  );
}
