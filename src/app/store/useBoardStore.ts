import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BoardInfo } from '../typescript/board';
import { Todo } from '../typescript/todo';

interface BoardState {
  boardList: BoardInfo[];
  addBoard: (title: string) => void;
  removeBoard: (id: number) => void;
  updateBoardTitle: (id: number, newTitle: string) => void;
  addTodoToBoard: (boardId: number, newTodo: Todo) => void;
  removeTodoList: (boardId: number, todoId: number) => void;
  modifyTodoList: (boardId: number, todoId: number, newTitle: string) => void;
  reorderBoards: (sourceIndex: number, destinationIndex: number) => void;
  updateTodoOrder: (
    boardId: number,
    startIndex: number,
    endIndex: number
  ) => void;
}

export const useBoardStore = create<BoardState>()(
  persist(
    (set) => ({
      boardList: [],

      updateTodoOrder: (boardId, startIndex, endIndex) => {
        set((state) => {
          const board = state.boardList.find(
            (boardItem) => boardItem.id === boardId
          );
          if (!board) return state;

          const newTodoList = [...board.todoList];
          const [movedItem] = newTodoList.splice(startIndex, 1);
          newTodoList.splice(endIndex, 0, movedItem);

          return {
            boardList: state.boardList.map((boardItem) =>
              boardItem.id === boardId
                ? { ...boardItem, todoList: newTodoList }
                : boardItem
            ),
          };
        });
      },

      addBoard: (title) => {
        const newBoard: BoardInfo = {
          id: Date.now(),
          title,
          todoList: [],
        };
        set((state) => ({
          boardList: [...state.boardList, newBoard],
        }));
      },

      removeBoard: (id) => {
        set((state) => ({
          boardList: state.boardList.filter((board) => board.id !== id),
        }));
      },

      updateBoardTitle: (id, newTitle) => {
        set((state) => ({
          boardList: state.boardList.map((board) =>
            board.id === id ? { ...board, title: newTitle } : board
          ),
        }));
      },

      addTodoToBoard: (boardId, newTodo) => {
        set((state) => ({
          boardList: state.boardList.map((board) =>
            board.id === boardId
              ? { ...board, todoList: [...board.todoList, newTodo] }
              : board
          ),
        }));
      },

      removeTodoList: (boardId, todoId) => {
        set((state) => ({
          boardList: state.boardList.map((board) =>
            board.id === boardId
              ? {
                  ...board,
                  todoList: board.todoList.filter((todo) => todo.id !== todoId),
                }
              : board
          ),
        }));
      },

      modifyTodoList: (boardId, todoId, newTitle) => {
        set((state) => ({
          boardList: state.boardList.map((board) =>
            board.id === boardId
              ? {
                  ...board,
                  todoList: board.todoList.map((item) =>
                    item.id === todoId ? { ...item, title: newTitle } : item
                  ),
                }
              : board
          ),
        }));
      },

      reorderBoards: (sourceIndex, destinationIndex) => {
        set((state) => {
          const reorderedBoards = [...state.boardList];
          const [movedBoard] = reorderedBoards.splice(sourceIndex, 1);
          reorderedBoards.splice(destinationIndex, 0, movedBoard);
          return { boardList: reorderedBoards };
        });
      },
    }),
    {
      name: 'board-storage',
    }
  )
);
