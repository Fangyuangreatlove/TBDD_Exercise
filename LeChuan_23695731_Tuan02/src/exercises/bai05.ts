// BÀI 05: Hàm simulateTask(time) trả về Promise resolving với "Task done" sau time ms
export function simulateTask(time: number): Promise<string> {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve("Task done");
    }, time);
  });
}

export const bai05 = simulateTask;