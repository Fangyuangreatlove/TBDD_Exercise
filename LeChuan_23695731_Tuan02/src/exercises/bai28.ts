// BÀI 28: Async function batchProcess() xử lý 5 tác vụ đồng thời
import { simulateTask } from "./bai05";

export async function batchProcess(): Promise<string[]> {
  const taskIds = [1, 2, 3, 4, 5];
  const tasks = taskIds.map((id) =>
    simulateTask(400 + id * 100).then(() => `Batch task #${id} done`)
  );
  return await Promise.all(tasks);
}

export async function bai28(): Promise<void> {
  console.log("Processing batch of 5 asynchronous tasks...");
  const results = await batchProcess();
  console.log("Batch completed successfully:", results);
}