
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AttendPage from './page/attend/AttendPage';
import { Menu } from "./components/Menu";
import { signIn, signOut } from "./ramper";


function App() {
  return (
    <BrowserRouter>
      <div>
        <Menu login={signIn} logout={signOut} />
        <Routes>
          <Route path="/attend" element={<AttendPage />} />
          <Route path="/board" />
          <Route path="/mypage" />
          <Route path="/login" />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
