// BÀI 29: Async function queueProcess() xử lý tác vụ tuần tự theo hàng đợi
export type TaskGenerator<T> = () => Promise<T>;

export async function queueProcess<T>(tasks: TaskGenerator<T>[]): Promise<T[]> {
  const results: T[] = [];
  for (let i = 0; i < tasks.length; i++) {
    console.log(`[Queue] Processing job ${i + 1}/${tasks.length}...`);
    const res = await tasks[i]();
    results.push(res);
    console.log(`[Queue] Job ${i + 1} completed: ${res}`);
  }
  return results;
}

export async function bai29(): Promise<void> {
  const tasks: TaskGenerator<string>[] = [
    () => new Promise((resolve) => setTimeout(() => resolve("Task Alpha initialized"), 300)),
    () => new Promise((resolve) => setTimeout(() => resolve("Task Beta synced"), 200)),
    () => new Promise((resolve) => setTimeout(() => resolve("Task Gamma finalized"), 250))
  ];

  console.log("Starting queue execution...");
  const results = await queueProcess(tasks);
  console.log("Queue execution finished with results:", results);
}