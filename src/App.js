import { DatePicker } from 'antd';

// react-router-dom
import { Routes, Route } from 'react-router-dom';
import UserTemplate from './templates/UserTemplate/UserTemplate';
import HomePage from './pages/HomePage/HomePage';
import Login from './pages/Login/Login';
import AdminTemplate from './templates/AdminTemplate/AdminTemplate';
import MovieManager from './pages/MovieManeger/MovieManager';
import UserManager from './pages/UserManager/UserManager';
import AddMovie from './pages/AddMovie/AddMovie';

function App() {
  return (
    <>
      <Routes>
        <Route element={<UserTemplate />} path="/">
          <Route element={<HomePage />} index></Route>
        </Route>
        <Route element={<AdminTemplate />} path="/admin">
          <Route index element={<MovieManager />} />
          <Route element={<UserManager />} path="manager-user" />
          <Route element={<AddMovie></AddMovie>} path="add-movie" />
        </Route>
        <Route element={<Login />} path="/login"></Route>
        {/* page 404  */}
      </Routes>
    </>
  );
}
  
export default App;
