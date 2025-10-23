import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/DashBoard';
import WishPage from '../pages/WishPage';

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/wish/:id" element={<WishPage />} />
    <Route path="*" element={<div className="p-4 text-center">404 Not Found</div>} />
  </Routes>
);

export default AppRouter;