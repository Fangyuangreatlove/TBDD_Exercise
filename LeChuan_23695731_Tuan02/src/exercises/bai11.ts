// BÀI 11: Chuyển đổi Bài 1 sang cú pháp async/await
import { bai01 } from "./bai01";

export async function bai11(): Promise<string> {
  const result = await bai01();
  console.log("Result using async/await:", result);
  return result;
}