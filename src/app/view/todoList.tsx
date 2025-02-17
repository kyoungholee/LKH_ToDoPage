import { Draggable } from '@hello-pangea/dnd';
import { Todo } from '../typescript/todo';
import Input from '../components/input/input';
import { useBoardStore } from '../store/useBoardStore';
import { useState } from 'react';
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
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="p-2 border-b flex justify-between"
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
          <div className="flex gap-4 items-start">
            <div className="text-base px-2 py-1 rounded-md">
              {isModify ? (
                <button
                  onClick={() => handleSave()}
                  className="text-base bg-blue-600 text-white px-2 py-1 rounded-md"
                >
                  완료
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <Image
                    src="/modify.png"
                    alt="수정 아이콘"
                    width={22}
                    height={22}
                    onClick={() => setIsModify(true)}
                  />
                  <button
                    onClick={() => removeTodoList(boardId, todo.id)}
                    className="text-base bg-red-400 text-white px-2 py-1 rounded-md"
                  >
                    삭제
                  </button>
                </div>
              )}
            </div>
          </div>
        </li>
      )}
    </Draggable>
  );
}
