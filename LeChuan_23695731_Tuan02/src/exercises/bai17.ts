// BÀI 17: Sử dụng for await...of để duyệt qua mảng Promises
export async function bai17(): Promise<void> {
  const promises: Promise<string>[] = [
    new Promise((resolve) => setTimeout(() => resolve("Item 1 (400ms)"), 400)),
    new Promise((resolve) => setTimeout(() => resolve("Item 2 (200ms)"), 200)),
    new Promise((resolve) => setTimeout(() => resolve("Item 3 (300ms)"), 300))
  ];

  console.log("Iterating promises using for await...of:");
  for await (const item of promises) {
    console.log("- Received item:", item);
  }
}