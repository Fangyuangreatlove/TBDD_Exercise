// BÀI 21: Dùng fetch lấy dữ liệu từ public API
export interface TodoItem {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export async function bai21(): Promise<TodoItem> {
  const url = "https://jsonplaceholder.typicode.com/todos/1";
  console.log("Fetching GET:", url);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data: TodoItem = await response.json();
  console.log("Fetched Todo Item:", data);
  return data;
}