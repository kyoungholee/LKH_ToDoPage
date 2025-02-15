import { Todo } from './todo';

export interface BoardInfo {
  id: number;
  title: string;
  todoList: Todo[];
}
