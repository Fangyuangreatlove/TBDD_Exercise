// BÀI 25: Hàm downloadFile mô phỏng tải file trong 3 giây
export async function downloadFile(filename: string): Promise<string> {
  console.log(`[Start] Downloading file: "${filename}"...`);
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const doneMsg = `[Done] Successfully downloaded "${filename}" (3 seconds).`;
  console.log(doneMsg);
  return doneMsg;
}

export async function bai25(): Promise<void> {
  await downloadFile("Android_ReactNative_Guide.pdf");
}