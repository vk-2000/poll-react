import "./App.css";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Home from "./components/Home";
import PollDetail from "./components/PollDetail";
import Vote from "./components/Vote";
import Result from "./components/Result";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path="home" element={<Home />} />
        <Route path="poll_detail/:id" element={<PollDetail result={false} />} />
        <Route path="vote/:id" element={<Vote />} />
        <Route path="result/:id" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}
export const BASE_URL = "http://127.0.0.1:8000/";
export default App;
