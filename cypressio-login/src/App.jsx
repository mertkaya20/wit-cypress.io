import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Success from "./components/Success";
import Error from "./components/Error";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Success />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
