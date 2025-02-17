'use client';

import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import Button from '../components/button/button';
import Input from '../components/input/input';
import { useBoardStore } from '../store/useBoardStore';
import BoardItem from './boardItem';
import { useState } from 'react';

export default function BoardList() {
  const { boardList, updateTodoOrder, moveTodo, addBoard, reorderBoards } =
    useBoardStore();

  const [boardTitle, setBoardTitle] = useState('');

  const handleAddBoard = () => {
    if (!boardTitle.trim()) {
      alert('보드를 입력해주세요.');
      return;
    }
    addBoard(boardTitle);
    setBoardTitle('');
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination, type } = result;

    if (type === 'board') {
      reorderBoards(source.index, destination.index);
    } else {
      const sourceBoardId = parseInt(source.droppableId.replace('board-', ''));
      const destinationBoardId = parseInt(
        destination.droppableId.replace('board-', '')
      );

      if (sourceBoardId === destinationBoardId) {
        updateTodoOrder(sourceBoardId, source.index, destination.index);
      } else {
        moveTodo(
          sourceBoardId,
          destinationBoardId,
          source.index,
          destination.index
        );
      }
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-center text-2xl font-bold">📝 할 일 칸반보드</h1>

      <div className="flex gap-2 my-4 justify-center">
        <Input
          value={boardTitle}
          onChange={(e) => setBoardTitle(e.target.value)}
          placeholder={'보드를 적어주세요.'}
        />
        <Button name="보드 추가" onClick={handleAddBoard} />
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-boards" type="board" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex gap-4 flex-wrap overflow-hidden"
            >
              {boardList.map((board, index) => (
                <Draggable
                  key={board.id}
                  draggableId={`board-${board.id}`}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <BoardItem board={board} />
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
