// BÀI 23: Lấy danh sách todos và lọc ra các việc chưa hoàn thành
import { TodoItem } from "./bai21";

export async function bai23(): Promise<TodoItem[]> {
  const url = "https://jsonplaceholder.typicode.com/todos?_limit=8";
  console.log("Fetching todos from:", url);
  const response = await fetch(url);
  const todos: TodoItem[] = await response.json();

  const uncompleted = todos.filter((todo) => !todo.completed);
  console.log(`Found ${uncompleted.length} incompleted todos out of ${todos.length}:`);
  uncompleted.forEach((t) => console.log(`  * [#${t.id}] ${t.title}`));
  return uncompleted;
}