import { Routes, Route, Outlet } from "react-router-dom";
import { lazy } from "react";

import PublicLayout from "../Layouts/PublicLayout";

// Public Routes
import Home from "../pages/public/Home";
import Products from "../pages/public/Products";
import ProductDetails from "../pages/public/ProductDetails";
import Terms from "../pages/public/Terms";
import Privacy from "../pages/public/Privacy";

const AboutUs = lazy(() => import("../pages/public/AboutUs"));
const ContactUs = lazy(() => import("../pages/public/ContactUs"));
const PageNotFound = lazy(() => import("../pages/public/PageNotFound"));

// Auth Routes
const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
const VendorLogin = lazy(() => import("../pages/auth/VendorLogin"));
const VendorRegister = lazy(() => import("../pages/auth/VendorRegister"));

// Admin, Vendor, User Routes
const AdminRoute = lazy(() => import("../routes/AdminRoute"));
const VendorRoute = lazy(() => import("../routes/VendorRoute"));
const UserRoute = lazy(() => import("../routes/UserRoute"));

// Layouts
const AdminLayout = lazy(() => import("../Layouts/AdminLayout"));
const VendorLayout = lazy(() => import("../Layouts/VendorLayout"));
const UserLayout = lazy(() => import("../Layouts/Userlayout"));

// User Routes
const UserProfile = lazy(() => import("../pages/user/Profile"));
const UserCart = lazy(() => import("../pages/user/Cart"));
const UserCheckOut = lazy(() => import("../pages/user/CheckOut"));
const UserWishList = lazy(() => import("../pages/user/Wishlist"));
const AllOrders = lazy(() => import("../pages/user/AllOrders"));
const ProcessingOrders = lazy(() => import("../pages/user/ProcessingOrders"));
const CompletedOrders = lazy(() => import("../pages/user/CompletedOrders"));
const CancelledOrder = lazy(() => import("../pages/user/CancelledOrder"));
const OrderLayout = lazy(() => import("../Layouts/OrderLayout"));
const UserUpdatePassword = lazy(() => import("../pages/user/UpdatePassword"));

// Admin Routes
const AdminProfile = lazy(() => import("../pages/admin/Profile"));
const AdminDashboard = lazy(() => import("../pages/admin/Dashboard"));
const AdminVendors = lazy(() => import("../pages/admin/Vendors"));
const AdminUsers = lazy(() => import("../pages/admin/Users"));
const AdminOrders = lazy(() => import("../pages/admin/Orders"));
const AdminShops = lazy(() => import("../pages/admin/Shops"));
const AdminShopDetails = lazy(() => import("../pages/admin/ShopDetails"));
const AdminContacts = lazy(() => import("../pages/admin/Contacts"));
const AdminOrderDetails = lazy(() => import("../pages/admin/OrderDetails"));
const AdminContactDetails = lazy(() => import("../pages/admin/ContactDetails"));

// Vendor Routes
const VendorProfile = lazy(() => import("../pages/vendor/Profile"));
const VendorDashboard = lazy(() => import("../pages/vendor/Dashboard"));
const VendorShop = lazy(() => import("../pages/vendor/Shop"));
const VendorProducts = lazy(() => import("../pages/vendor/Products"));
const VendorProductList = lazy(
  () => import("../components/common/vendor/ProductList"),
);
const VendorProductForm = lazy(
  () => import("../components/common/vendor/ProductForm"),
);
const VendorUpdatePassword = lazy(
  () => import("../pages/vendor/UpdatePassword"),
);

const AppRoute = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/vendor/login" element={<VendorLogin />} />
        <Route path="/vendor/register" element={<VendorRegister />} />
        <Route
          element={
            <UserRoute>
              <Outlet />
            </UserRoute>
          }
        >
          <Route path="/users" element={<UserLayout />}>
            <Route index element={<UserProfile />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="wishlist" element={<UserWishList />} />
            <Route path="update-password" element={<UserUpdatePassword />} />
            <Route path="orders" element={<OrderLayout />}>
              <Route index element={<AllOrders />} />
              <Route path="processing" element={<ProcessingOrders />} />
              <Route path="completed" element={<CompletedOrders />} />
              <Route path="cancelled" element={<CancelledOrder />} />
            </Route>
          </Route>
          <Route path="/users/cart" element={<UserCart />} />
          <Route path="/users/checkout" element={<UserCheckOut />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
      </Route>

      <Route
        path="/vendors"
        element={
          <VendorRoute>
            <VendorLayout />
          </VendorRoute>
        }
      >
        <Route path=":id/profile" element={<VendorProfile />} />
        <Route path=":id/dashboard" element={<VendorDashboard />} />
        <Route path=":id/shop" element={<VendorShop />} />
        <Route path=":id/update-password" element={<VendorUpdatePassword />} />
        <Route path=":id/products" element={<VendorProducts />}>
          <Route index element={<VendorProductList />} />
          <Route path="add" element={<VendorProductForm />} />
          <Route path=":productId" element={<VendorProductForm />} />
        </Route>
      </Route>

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<AdminProfile />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="vendors" element={<AdminVendors />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="orders/:id" element={<AdminOrderDetails />} />
        <Route path="shops" element={<AdminShops />} />
        <Route path="shops/:id" element={<AdminShopDetails />} />
        <Route path="contacts" element={<AdminContacts />} />
        <Route path="contacts/:id" element={<AdminContactDetails />} />
      </Route>
    </Routes>
  );
};

export default AppRoute;
