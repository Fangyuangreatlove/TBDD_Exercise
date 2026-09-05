// BÀI 22: Gọi API nhiều lần và in kết quả
import { TodoItem } from "./bai21";

export async function bai22(): Promise<void> {
  const ids = [1, 2, 3];
  console.log("Calling API for multiple todos...");
  const promises = ids.map(async (id) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
    return res.json() as Promise<TodoItem>;
  });
  const results = await Promise.all(promises);
  results.forEach((todo) => {
    console.log(`- Todo #${todo.id}: "${todo.title}" | Completed: ${todo.completed}`);
  });
}