// BÀI 19: Async function fetchUsers(ids) gọi fetchUser cho mỗi ID
import { fetchUser, User } from "./bai18";

export async function fetchUsers(ids: number[]): Promise<User[]> {
  const promises = ids.map((id) => fetchUser(id));
  return await Promise.all(promises);
}

export async function bai19(): Promise<void> {
  const ids = [1, 2, 3];
  console.log(`Fetching multiple users for IDs: [${ids.join(", ")}]...`);
  const users = await fetchUsers(ids);
  console.log("Fetched all users successfully:");
  users.forEach((u) => console.log(` - [${u.id}] ${u.name} (${u.email})`));
}