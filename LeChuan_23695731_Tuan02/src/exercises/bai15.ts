// BÀI 15: Gọi nhiều async function tuần tự bằng await
import { multiplyByThree } from "./bai14";

export async function bai15(): Promise<void> {
  console.log("Starting sequential async calls...");
  const t0 = Date.now();

  const step1 = await multiplyByThree(2); // 2 * 3 = 6 (1s)
  console.log(`Step 1: ${step1} (after ${Date.now() - t0}ms)`);

  const step2 = await multiplyByThree(step1); // 6 * 3 = 18 (1s)
  console.log(`Step 2: ${step2} (after ${Date.now() - t0}ms)`);

  const step3 = await multiplyByThree(step2); // 18 * 3 = 54 (1s)
  console.log(`Step 3: ${step3} (after ${Date.now() - t0}ms)`);
}