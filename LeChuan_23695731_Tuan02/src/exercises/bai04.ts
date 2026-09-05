// BÀI 04: Dùng .then() và .catch() xử lý Promise trả về số ngẫu nhiên
export function getRandomNumber(): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    const num = Math.random();
    if (num >= 0.3) {
      resolve(num);
    } else {
      reject(new Error(`Number too small: ${num.toFixed(4)} (< 0.3)`));
    }
  });
}

export function bai04(): Promise<void> {
  return getRandomNumber()
    .then((result) => {
      console.log("[Success] Random number:", result.toFixed(4));
    })
    .catch((error: Error) => {
      console.log("[Handled Error]:", error.message);
    });
}