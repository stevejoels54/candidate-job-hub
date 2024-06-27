import AppLayout from "./layout/AppLayout";
import Candidates from "./pages/candidates/Candidates";

function App() {
  return <AppLayout children={<Candidates />} />;
}

export default App;
