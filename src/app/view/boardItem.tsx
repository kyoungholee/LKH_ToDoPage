import { Droppable } from '@hello-pangea/dnd';
import { BoardInfo } from '../typescript/board';
import { useBoardStore } from '../store/useBoardStore';
import Input from '../components/input/input';
import Button from '../components/button/button';
import TodoList from './todoList';
import { Todo } from '../typescript/todo';
import { useState } from 'react';

export default function BoardItem({ board }: { board: BoardInfo }) {
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
    <div className="border rounded-lg p-4 bg-slate-50 shadow-md min-h-80 w-[340px]">
      <div className="flex justify-between items-center gap-2">
        {isEditing ? (
          <Input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="입력해주세요."
          />
        ) : (
          <h2 className="text-lg font-bold cursor-move">{board.title}</h2>
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

      <Droppable droppableId={`board-${board.id}`}>
        {(provided) => (
          <ul
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="mt-2"
          >
            {board.todoList.map((todo, index) => (
              <TodoList
                key={todo.id}
                todo={todo}
                boardId={board.id}
                index={index}
              />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
}
