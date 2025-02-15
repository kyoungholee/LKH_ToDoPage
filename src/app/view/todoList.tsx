'use client';

import { useState } from 'react';
import { Todo } from '../typescript/todo';
import Input from '../components/input/input';
import { useBoardStore } from '../store/useBoardStore';
import { Draggable } from '@hello-pangea/dnd';
import Image from 'next/image';

export default function TodoList({
  todo,
  boardId,
  index,
}: {
  todo: Todo;
  boardId: number;
  index: number;
}) {
  const [isModify, setIsModify] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const { removeTodoList, modifyTodoList } = useBoardStore();

  const handleSave = () => {
    modifyTodoList(boardId, todo.id, newTitle);
    setIsModify(false);
  };

  return (
    <Draggable draggableId={`todo-${todo.id}`} index={index}>
      {/* Draggable 추가 */}
      {(provided) => (
        <li
          className="p-2 border-b flex justify-between"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div>
            {isModify ? (
              <Input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="입력해주세요."
              />
            ) : (
              <h2>{todo.title}</h2>
            )}
            <p className="text-xs text-gray-500">{todo.date}</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => {
                if (isModify) {
                  handleSave();
                } else {
                  setIsModify(true);
                }
              }}
              className="text-base px-2 py-1 rounded-md"
            >
              {isModify ? (
                <Image
                  src="/complete.png"
                  alt="완료 아이콘"
                  width={20}
                  height={20}
                />
              ) : (
                <Image
                  src="/modify.png"
                  alt="수정 아이콘"
                  width={20}
                  height={20}
                />
              )}
            </button>
            <button
              onClick={() => removeTodoList(boardId, todo.id)}
              className="text-base text-white px-2 py-1 rounded-md"
            >
              <Image
                src="/trash.png"
                alt="삭제 아이콘"
                width={20}
                height={20}
              />
            </button>
          </div>
        </li>
      )}
    </Draggable>
  );
}
