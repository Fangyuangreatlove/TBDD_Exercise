// BÀI 09: Promise đọc mảng sau 1 giây và lọc số chẵn
export function bai09(): Promise<number[]> {
  const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return new Promise<number[]>((resolve) => {
    setTimeout(() => {
      const evens = numbers.filter((num) => num % 2 === 0);
      resolve(evens);
    }, 1000);
  }).then((filtered) => {
    console.log("Filtered even numbers:", filtered);
    return filtered;
  });
}