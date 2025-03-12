import { useUser } from "@/store/useUser";

// src/pages/index.tsx
export default function Home() {
  const { user } = useUser();
  console.log("🚀 ~ Home ~ user:", user);
  return (
    <div>
      <h1>Welcome to the Homepage</h1>
      <p>This is the root page of the app.</p>
    </div>
  );
}
