import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Menu } from "./components/Menu";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Menu />
        <Routes>
          <Route path="/attend" />
          <Route path="/board" />
          <Route path="/mypage" />
          <Route path="/login" />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
