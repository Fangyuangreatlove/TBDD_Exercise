// BÀI 12: Async function gọi simulateTask(2000) và log kết quả
import { simulateTask } from "./bai05";

export async function bai12(): Promise<void> {
  console.log("Calling simulateTask(2000)...");
  const result = await simulateTask(2000);
  console.log("Received result:", result);
}