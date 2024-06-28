import AppLayout from "./layout/AppLayout";
import Candidates from "./pages/candidates/Candidates";
import "./App.css";

function App() {
  return <AppLayout children={<Candidates />} />;
}

export default App;
