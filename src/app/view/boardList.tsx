'use client';

import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import BoardItem from './boardItem';
import Button from '../components/button/button';
import { BoardInfo } from '../typescript/board';
import Input from '../components/input/input';
import { Todo } from '../typescript/todo';

export default function TodoList() {
  const [boardList, setBoardList] = useState<BoardInfo[]>([]);
  const [boardTitle, setBoardTitle] = useState('');

  useEffect(() => {
    const storedBoards = localStorage.getItem('boards');
    if (storedBoards) {
      setBoardList(JSON.parse(storedBoards));
    }
  }, []);

  const saveToLocalStorage = (boards: BoardInfo[]) => {
    localStorage.setItem('boards', JSON.stringify(boards));
  };

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
    setBoardTitle('');
  };

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

  // 할 일 추가 함수

  const addTodoToBoard = (boardId: number, newTodo: Todo) => {
    const updatedBoards = boardList.map((board) =>
      board.id === boardId
        ? { ...board, todoList: [...board.todoList, newTodo] }
        : board
    );
    setBoardList(updatedBoards);
    saveToLocalStorage(updatedBoards);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedBoards = [...boardList];
    const [movedBoard] = reorderedBoards.splice(result.source.index, 1);
    reorderedBoards.splice(result.destination.index, 0, movedBoard);

    setBoardList(reorderedBoards);
    saveToLocalStorage(reorderedBoards);
  };

  return (
    <div className="p-5">
      <h1 className="text-center text-2xl font-bold">📝 할 일 칸반보드</h1>

      <div className="flex gap-2 my-4 justify-center">
        <Input
          value={boardTitle}
          onChange={(e) => setBoardTitle(e.target.value)}
          placeholder={'보드의 제목을 입력해주세요.'}
        />
        <Button name="보드 추가" onClick={addBoard} />
      </div>

      {/* DragDropContext 사용 */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="boards" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex gap-4 justify-center my-5 flex-wrap"
            >
              {boardList.map((board, index) => (
                <Draggable
                  key={board.id.toString()}
                  draggableId={board.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps}>
                      <BoardItem
                        board={board}
                        onDelete={removeBoard}
                        onUpdate={updateBoardTitle}
                        onAddTodo={addTodoToBoard}
                        dragHandleProps={provided.dragHandleProps}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
