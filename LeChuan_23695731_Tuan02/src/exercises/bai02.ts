// BÀI 02: Viết hàm trả về Promise resolving với số 10 sau 1 giây
export function bai02(): Promise<number> {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(10);
    }, 1000);
  });
}