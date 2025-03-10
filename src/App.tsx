import "./App.css";
import Routes from "./Routes";

function App() {
  const pages = import.meta.glob("./pages/**/!(*.test.[jt]sx)*.([jt]sx)", {
    eager: true,
  });
  return (
    <>
      <Routes pages={pages} />
    </>
  );
}

export default App;
