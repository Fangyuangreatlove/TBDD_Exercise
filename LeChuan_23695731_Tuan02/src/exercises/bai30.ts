// BÀI 30: Dùng async/await + Promise.allSettled() xử lý nhiều API call
export async function bai30(): Promise<void> {
  const urls = [
    "https://jsonplaceholder.typicode.com/todos/1",
    "https://jsonplaceholder.typicode.com/non-existing-404-endpoint",
    "https://jsonplaceholder.typicode.com/todos/2"
  ];

  console.log("Checking API endpoints with Promise.allSettled()...");
  const promises = urls.map(async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} (${res.statusText})`);
    return res.json();
  });

  const results = await Promise.allSettled(promises);
  results.forEach((result, idx) => {
    if (result.status === "fulfilled") {
      console.log(`Endpoint #${idx + 1} [${urls[idx]}]: SUCCESS ->`, result.value);
    } else {
      console.log(`Endpoint #${idx + 1} [${urls[idx]}]: FAILED -> ${result.reason.message}`);
    }
  });
}