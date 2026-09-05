// BÀI 03: Viết hàm rejects một Promise với lỗi "Something went wrong" sau 1 giây
export function bai03(): Promise<never> {
  return new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new Error("Something went wrong"));
    }, 1000);
  });
}