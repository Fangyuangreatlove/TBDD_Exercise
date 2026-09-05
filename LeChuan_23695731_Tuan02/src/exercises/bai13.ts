// BÀI 13: Xử lý lỗi bằng khối try/catch kết hợp async/await
import { bai03 } from "./bai03";

export async function bai13(): Promise<void> {
  try {
    console.log("Attempting risky async operation...");
    await bai03();
  } catch (error: any) {
    console.log("Successfully handled error in catch block:", error.message);
  }
}