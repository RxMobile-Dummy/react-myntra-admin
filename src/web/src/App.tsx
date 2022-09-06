import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import ScrollToTop from "./components/ScrollToTop";
import AdminHomePage from "./pages/HomePage";
import AdminLoginPage from "./pages/LoginPage";
import AddProductPage from './pages/AddProductPage';
import MainCategoriesPage from './pages/MainCategoriesPage';
import CategoryPage from './pages/CategoryPage';
import BrandsPage from './pages/BrandsPage';
import UsersPage from './pages/UsersPage';
import UserOrdersPage from './pages/UserOrdersPage';
import OffersPage from './pages/OffersPage';
import ErrorPage from "./pages/ErrorPage";
import { Provider } from 'react-redux';

function App() {
  return (
    //  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminHomePage />} />
        <Route path="/dashboard/add-product" element={<AddProductPage />} />
        <Route path="/dashboard/main-categories" element={<MainCategoriesPage />} />
        <Route path="/dashboard/categories" element={<CategoryPage />} />
        <Route path="/dashboard/brands" element={<BrandsPage />} />
        <Route path="/dashboard/users" element={<UsersPage />} />
        <Route path="/dashboard/orders/" element={<UserOrdersPage />} />
        <Route path="/dashboard/offers" element={<OffersPage />} />
        <Route path="/" element={<AdminLoginPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
    //  </Provider>
  );
}

export default App;
