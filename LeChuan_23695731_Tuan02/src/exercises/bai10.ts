// BÀI 10: Dùng .finally() log "Done" khi Promise hoàn tất
import { simulateTask } from "./bai05";

export function bai10(): Promise<void> {
  return simulateTask(1000)
    .then((msg) => {
      console.log("Task resolved with:", msg);
    })
    .catch((err: Error) => {
      console.log("Task rejected with:", err.message);
    })
    .finally(() => {
      console.log("Done");
    });
}