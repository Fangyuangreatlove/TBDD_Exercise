// BÀI 26: Dùng async/await với setTimeout mô phỏng chờ 5 giây
export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function bai26(): Promise<void> {
  console.log("Starting 5-second delay...");
  const t0 = Date.now();
  await sleep(5000);
  const elapsed = ((Date.now() - t0) / 1000).toFixed(2);
  console.log(`Finished waiting. Total time elapsed: ${elapsed}s`);
}