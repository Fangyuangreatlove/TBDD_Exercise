// BÀI 14: Async function nhận số, đợi 1 giây, trả về số x 3
export async function multiplyByThree(num: number): Promise<number> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return num * 3;
}

export async function bai14(): Promise<void> {
  const input = 5;
  const output = await multiplyByThree(input);
  console.log(`Input: ${input} -> After 1s (x3): ${output}`);
}