import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/auth/Login";
import AdminRoutes from "./components/Routes/AdminRoutes";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import LaptopOfers from "./pages/LaptopOfers";
import SearchOutput from "./pages/SearchOutput";
import ProductDetails from "./pages/ProductDetails";
import CategoryProduct from "./pages/CategoryProduct";
import ScrollToTop from "./hooks/scrollToTop";
import PrivacyPolicy from "./pages/policy/PrivacyPolicy";
import TermsAndConditions from "./pages/policy/TermsAndConditions";
// import { useAuth } from "./store/auth";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/category/:Cslug/:slug" element={<ProductDetails />} />
        <Route path="/search/:keyword" element={<SearchOutput />} />
        <Route path="/laptops" element={<LaptopOfers />} />
        <Route path="/dashboard" element={<AdminRoutes />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/products/all-products" element={<Products />} />
          <Route path="admin/products/:slug" element={<Products />} />
          <Route
            path="admin/product-update/:Cslug/:slug"
            element={<UpdateProduct />}
          />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="term-and-cindition" element={<TermsAndConditions />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
