import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Routes from "./Routes";
import { UserProvider } from "./store/useUser";

function App() {
  const pages = import.meta.glob("./pages/**/!(*.test.[jt]sx)*.([jt]sx)", {
    eager: true,
  });
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <Routes pages={pages} />
        </UserProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
