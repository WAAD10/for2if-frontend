import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Menu } from './components/Menu';
import AttendPage from './page/attend/AttendPage';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Menu />
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
