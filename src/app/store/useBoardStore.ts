import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BoardInfo } from '../typescript/board';
import { Todo } from '../typescript/todo';

interface BoardState {
  boardList: BoardInfo[];

  moveTodo: (
    sourceBoardId: number,
    destinationBoardId: number,
    sourceIndex: number,
    destinationIndex: number
  ) => void;
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

      moveTodo: (
        sourceBoardId,
        destinationBoardId,
        sourceIndex,
        destinationIndex
      ) => {
        set((state) => {
          const sourceBoard = state.boardList.find(
            (board) => board.id === sourceBoardId
          );
          const destinationBoard = state.boardList.find(
            (board) => board.id === destinationBoardId
          );

          // 보드가 모두 존재하는지 확인
          if (!sourceBoard || !destinationBoard) {
            return state; // 하나라도 없으면 기존 상태 반환
          }

          const [movedTodo] = sourceBoard.todoList.splice(sourceIndex, 1);

          destinationBoard.todoList.splice(destinationIndex, 0, movedTodo);

          return {
            ...state,
            boards: [...state.boardList], // 새로운 boards 배열을 반환
          };
        });
      },

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
        const removeConfirm = window.confirm('보드를 지우시겠습니까?');

        if (removeConfirm) {
          set((state) => ({
            boardList: state.boardList.filter((board) => board.id !== id),
          }));
        }
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
        const isItemRemove = window.confirm('할 일 데이터를 지우시겠습니까?');

        if (isItemRemove) {
          set((state) => ({
            boardList: state.boardList.map((board) =>
              board.id === boardId
                ? {
                    ...board,
                    todoList: board.todoList.filter(
                      (todo) => todo.id !== todoId
                    ),
                  }
                : board
            ),
          }));
        }
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
