// BÀI 20: Thêm cơ chế timeout: quăng lỗi nếu API chạy quá 2 giây
export async function withTimeout<T>(promise: Promise<T>, timeoutMs: number = 2000): Promise<T> {
  let timer: NodeJS.Timeout;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      reject(new Error(`Operation timed out after ${timeoutMs}ms`));
    }, timeoutMs);
  });

  return Promise.race([
    promise.then((val) => {
      clearTimeout(timer);
      return val;
    }),
    timeoutPromise
  ]);
}

export async function bai20(): Promise<void> {
  const slowApiCall = (): Promise<string> =>
    new Promise((resolve) => setTimeout(() => resolve("Slow data"), 3000));

  try {
    console.log("Executing slow API call with 2000ms timeout threshold...");
    await withTimeout(slowApiCall(), 2000);
  } catch (error: any) {
    console.log("[Timeout Handled]:", error.message);
  }
}