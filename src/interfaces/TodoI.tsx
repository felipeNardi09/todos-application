export interface CreatedAtI {
  seconds: number;
  nanoseconds: number;
}

export interface NewTodoI {
  list: string;
  displayTasks: Array<string>;
  createdAt: CreatedAtI;
  uid?: string;
}
export default interface TodoI extends NewTodoI {
  id: string;
}
