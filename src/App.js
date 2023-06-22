import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Menu } from "./components/Menu";
import { signIn, signOut } from "./ramper";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Menu login={signIn} logout={signOut} />
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
