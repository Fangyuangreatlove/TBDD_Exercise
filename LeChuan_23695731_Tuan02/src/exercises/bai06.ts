// BÀI 06: Dùng Promise.all() chạy 3 Promise song song
import { simulateTask } from "./bai05";

export function bai06(): Promise<void> {
  const p1 = simulateTask(1000).then((res) => `Task 1 (1000ms): ${res}`);
  const p2 = simulateTask(1500).then((res) => `Task 2 (1500ms): ${res}`);
  const p3 = simulateTask(500).then((res) => `Task 3 (500ms): ${res}`);

  return Promise.all([p1, p2, p3]).then((results) => {
    console.log("Promise.all results:", results);
  });
}