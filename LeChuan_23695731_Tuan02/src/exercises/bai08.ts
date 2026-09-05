// BÀI 08: Tạo chuỗi Promise: bình phương số 2, nhân đôi, cộng 5
export function bai08(): Promise<void> {
  return Promise.resolve(2)
    .then((n) => {
      const square = n * n; // 2 * 2 = 4
      console.log(`Step 1 - Square of ${n}: ${square}`);
      return square;
    })
    .then((n) => {
      const doubled = n * 2; // 4 * 2 = 8
      console.log(`Step 2 - Double: ${doubled}`);
      return doubled;
    })
    .then((n) => {
      const finalResult = n + 5; // 8 + 5 = 13
      console.log(`Step 3 - Add 5: ${finalResult}`);
      return finalResult;
    })
    .then((result) => {
      console.log(`Final Chain Result: ${result}`);
    });
}