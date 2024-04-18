// import HomePages from 'Pages';
import Layout from 'components/layout/Layout';
import UserPage from 'pages/UserPage';
import CityPage from 'pages/CityPage';
import HomePages from 'pages/HomePages';
import { Routes, Route } from 'react-router-dom';
import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';
import BlogPage from 'pages/BlogPage';
import TodoPage from 'pages/TodoPage';

export type RoutesProps = {
  children?: React.ReactNode;
  location?: Partial<Location> | string;
  path?: string;
  element?: React.ReactNode | null;
};

const Rout: React.FC<RoutesProps> = (props: RoutesProps): React.ReactElement | null => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePages />} />
        <Route path="CityPage" element={<CityPage />}>
          <Route path=":id" element={<CityPage />} />
        </Route>
        <Route path="BlogPage" element={<BlogPage />} />
        <Route path="UserPage" element={<UserPage />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Route>
      <Route path="/todo" element={<TodoPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};

export default Rout;
