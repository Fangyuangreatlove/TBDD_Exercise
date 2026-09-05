// BÀI 24: Async function postData() gửi POST request đến test API
export interface PostData {
  id?: number;
  title: string;
  body: string;
  userId: number;
}

export async function postData(): Promise<PostData> {
  const payload: PostData = {
    title: "Bai tap Thuc hanh TBDD - IUH",
    body: "Thuc hanh gui du lieu POST len REST API voi TypeScript",
    userId: 23695731
  };

  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(payload)
  });

  const createdPost: PostData = await response.json();
  return createdPost;
}

export async function bai24(): Promise<void> {
  console.log("Sending POST request to create new post...");
  const result = await postData();
  console.log("Server response after creation:", result);
}