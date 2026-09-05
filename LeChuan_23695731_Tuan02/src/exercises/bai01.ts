// BÀI 01: Tạo Promise trả về chuỗi "Hello Async" sau 2 giây
export function bai01(): Promise<string> {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve("Hello Async");
    }, 2000);
  });
}