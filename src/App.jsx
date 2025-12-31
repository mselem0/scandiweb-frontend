import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import MainContent from "./components/MainContent";
import Header from "./components/Header";
import CartOverlay from "./components/CartOverlay";
import Categories from "./components/Categories";
import Cart from "./components/Cart";
import Logo from "./components/Logo";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import NotFoundPage from "./pages/NotFoundPage";
import { CategoriesProvider } from "./context/CategoriesContext";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <BrowserRouter>
      <CategoriesProvider>
        <CartProvider>
          <Layout>
            <Header>
              <Categories />
              <Logo />
              <Cart />
            </Header>
            <MainContent>
              <CartOverlay />
              <Routes>
                <Route
                  path="/"
                  element={<Navigate to="/all" replace />}
                />
                <Route path="/product/:productId" element={<ProductPage />} />
                <Route
                  path="/:categorySlug"
                  element={<CategoryPage />}
                />
                <Route path="*" element={<NotFoundPage />}></Route>
              </Routes>
            </MainContent>
          </Layout>
        </CartProvider>
      </CategoriesProvider>
    </BrowserRouter>
  );
}

export default App;
