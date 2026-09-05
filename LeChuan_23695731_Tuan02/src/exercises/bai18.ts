// BÀI 18: Async function fetchUser(id) giả lập API (resolve user sau 1s)
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export async function fetchUser(id: number): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    id,
    name: `Student_${id}`,
    email: `student${id}@iuh.edu.vn`,
    role: "Undergraduate"
  };
}

export async function bai18(): Promise<void> {
  console.log("Fetching user 101...");
  const user = await fetchUser(101);
  console.log("Fetched User details:", user);
}