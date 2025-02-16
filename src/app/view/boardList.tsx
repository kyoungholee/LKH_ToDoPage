'use client';

import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import BoardItem from './boardItem';
import Button from '../components/button/button';
import Input from '../components/input/input';
import { useBoardStore } from '../store/useBoardStore';

export default function BoardList() {
  const { boardList, addBoard, reorderBoards } = useBoardStore();

  const [boardTitle, setBoardTitle] = useState('');

  const handleAddBoard = () => {
    addBoard(boardTitle);
    setBoardTitle('');
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    reorderBoards(result.source.index, result.destination.index);
  };

  return (
    <div className="p-5 bg-gray-300">
      <h1 className="text-center text-2xl font-bold">📝 할 일 칸반보드</h1>

      <div className="flex gap-2 my-4 justify-center">
        <Input
          value={boardTitle}
          onChange={(e) => setBoardTitle(e.target.value)}
          placeholder={'보드의 제목을 입력해주세요.'}
        />
        <Button name="보드 추가" onClick={handleAddBoard} />
      </div>

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
