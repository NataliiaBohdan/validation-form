import { Route, Routes } from "react-router-dom";
import ValidationForm from "./components/ValidationForm";
import ValidationCodePage from "./components/ValidationCodePage";
import SuccessPage from "./components/SuccessPage";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Routes>
        <Route path="/" element={<ValidationForm />} />
        <Route path="/validate" element={<ValidationCodePage />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </div>
  );
}

export default App;
