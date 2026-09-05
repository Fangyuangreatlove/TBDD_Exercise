// BÀI 16: Gọi nhiều async function song song bằng Promise.all()
import { multiplyByThree } from "./bai14";

export async function bai16(): Promise<void> {
  console.log("Starting parallel async calls...");
  const t0 = Date.now();

  const results = await Promise.all([
    multiplyByThree(1),
    multiplyByThree(2),
    multiplyByThree(3)
  ]);

  console.log("Parallel results:", results);
  console.log(`Total execution time: ${Date.now() - t0}ms (~1 second)`);
}