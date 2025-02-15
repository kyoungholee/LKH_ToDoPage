'use client';

import { useState, useEffect } from 'react';

import { BoardInfo } from '../typescript/board';

import Button from '../components/button/button';
import BoardItem from './boardItem';

export default function TodoList() {
  const [boardList, setBoardList] = useState<BoardInfo[]>([]);
  const [boardTitle, setBoardTitle] = useState('');

  // 로컬스토리지에서 보드 불러오기
  useEffect(() => {
    const storedBoards = localStorage.getItem('boards');
    if (storedBoards) {
      setBoardList(JSON.parse(storedBoards));
    }
  }, []);

  // 로컬스토리지에 보드 저장하기
  const saveToLocalStorage = (boards: BoardInfo[]) => {
    localStorage.setItem('boards', JSON.stringify(boards));
  };

  // 보드 추가
  const addBoard = () => {
    if (!boardTitle.trim()) {
      alert('보드 제목을 입력해주세요!');
      return;
    }

    const newBoard: BoardInfo = {
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

  //보드 타이틀 업데이트
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

      <div className="flex gap-4 justify-center my-5">
        {boardList.map((board) => (
          <BoardItem
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
