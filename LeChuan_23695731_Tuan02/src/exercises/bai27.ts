// BÀI 27: Viết hàm fetchWithRetry(url, retries) tự động thử lại nếu lỗi
export async function fetchWithRetry<T>(url: string, retries: number): Promise<T> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`Attempt ${attempt}/${retries}: Fetching ${url}...`);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return (await response.json()) as T;
    } catch (error: any) {
      console.log(`  -> Attempt ${attempt} failed: ${error.message}`);
      if (attempt === retries) {
        throw new Error(`Failed to fetch after ${retries} attempts: ${error.message}`);
      }
      await new Promise((r) => setTimeout(r, 800)); // Chờ 800ms trước khi thử lại
    }
  }
  throw new Error("Unable to connect.");
}

export async function bai27(): Promise<void> {
  const invalidUrl = "https://jsonplaceholder.typicode.com/invalid-endpoint-test-404";
  try {
    await fetchWithRetry(invalidUrl, 3);
  } catch (err: any) {
    console.log("[Final Catch]:", err.message);
  }
}