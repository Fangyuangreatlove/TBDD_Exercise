// BÀI 07: Dùng Promise.race() trả về Promise nào resolve trước
export function bai07(): Promise<void> {
  const p1 = new Promise<string>((resolve) =>
    setTimeout(() => resolve("Task 1 completed (1500ms)"), 1500)
  );
  const p2 = new Promise<string>((resolve) =>
    setTimeout(() => resolve("Task 2 completed (500ms - WINNER)"), 500)
  );
  const p3 = new Promise<string>((resolve) =>
    setTimeout(() => resolve("Task 3 completed (2000ms)"), 2000)
  );

  return Promise.race([p1, p2, p3]).then((winner) => {
    console.log("Fastest result (Promise.race):", winner);
  });
}