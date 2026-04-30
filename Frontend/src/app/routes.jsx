import { Routes, Route, Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";

import Loader from "../shared/components/ui/Loader";
import PublicLayout from "../layouts/PublicLayout";

import RoleRoute from "../routes/guards/RoleRoute";
import { ROLES, ROUTES } from "../utils/constants";

//  PUBLIC
const Home = lazy(() => import("../pages/public/Home"));
const Products = lazy(() => import("../pages/public/Products"));
const ProductDetails = lazy(() => import("../pages/public/ProductDetails"));
const Terms = lazy(() => import("../pages/public/Terms"));
const Privacy = lazy(() => import("../pages/public/Privacy"));
const AboutUs = lazy(() => import("../pages/public/AboutUs"));
const ContactUs = lazy(() => import("../pages/public/ContactUs"));
const PageNotFound = lazy(() => import("../pages/public/PageNotFound"));

//  AUTH
const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
const VendorLogin = lazy(() => import("../pages/auth/VendorLogin"));
const VendorRegister = lazy(() => import("../pages/auth/VendorRegister"));

//  LAYOUTS
const AdminLayout = lazy(() => import("../layouts/AdminLayout"));
const VendorLayout = lazy(() => import("../layouts/VendorLayout"));
const UserLayout = lazy(() => import("../layouts/UserLayout"));
const OrderLayout = lazy(() => import("../layouts/OrderLayout"));

//  USER
const UserProfile = lazy(() => import("../pages/user/Profile"));
const UserCart = lazy(() => import("../pages/user/Cart"));
const UserCheckOut = lazy(() => import("../pages/user/CheckOut"));
const UserWishList = lazy(() => import("../pages/user/Wishlist"));
const AllOrders = lazy(() => import("../pages/user/AllOrders"));
const ProcessingOrders = lazy(() => import("../pages/user/ProcessingOrders"));
const CompletedOrders = lazy(() => import("../pages/user/CompletedOrders"));
const CancelledOrder = lazy(() => import("../pages/user/CancelledOrder"));
const UserUpdatePassword = lazy(() => import("../pages/user/UpdatePassword"));
const DeletedAccount = lazy(() => import("../pages/user/DeletedAccount"));

//  ADMIN
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

//  VENDOR
const VendorProfile = lazy(() => import("../pages/vendor/Profile"));
const VendorDashboard = lazy(() => import("../pages/vendor/Dashboard"));
const VendorShop = lazy(() => import("../pages/vendor/Shop"));
const VendorProducts = lazy(() => import("../pages/vendor/Products"));
const VendorProductList = lazy(
  () => import("../features/vendor/components/ProductList"),
);
const VendorProductForm = lazy(
  () => import("../features/vendor/components/ProductForm"),
);
const VendorUpdatePassword = lazy(
  () => import("../pages/vendor/UpdatePassword"),
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/*  PUBLIC  */}
        <Route element={<PublicLayout />}>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.ABOUT} element={<AboutUs />} />
          <Route path={ROUTES.CONTACT} element={<ContactUs />} />
          <Route path={ROUTES.PRODUCTS} element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />

          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />

          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />
          <Route path="/vendor/login" element={<VendorLogin />} />
          <Route path="/vendor/register" element={<VendorRegister />} />

          {/*  USER  */}
          <Route
            element={
              <RoleRoute allowedRoles={[ROLES.USER]}>
                <Outlet />
              </RoleRoute>
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
        </Route>

        {/* Account deletion Page */}
        <Route path="/account-deleted" element={<DeletedAccount />} />

        {/*  VENDOR  */}
        <Route
          path="/vendors"
          element={
            <RoleRoute allowedRoles={[ROLES.VENDOR]} redirectTo="/vendor/login">
              <VendorLayout />
            </RoleRoute>
          }
        >
          <Route path=":id/profile" element={<VendorProfile />} />
          <Route path=":id/dashboard" element={<VendorDashboard />} />
          <Route path=":id/shop" element={<VendorShop />} />
          <Route
            path=":id/update-password"
            element={<VendorUpdatePassword />}
          />

          <Route path=":id/products" element={<VendorProducts />}>
            <Route index element={<VendorProductList />} />
            <Route path="add" element={<VendorProductForm />} />
            <Route path=":productId" element={<VendorProductForm />} />
          </Route>
        </Route>

        {/*  ADMIN  */}
        <Route
          path="/admin"
          element={
            <RoleRoute allowedRoles={[ROLES.ADMIN]}>
              <AdminLayout />
            </RoleRoute>
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
    </Suspense>
  );
};

export default AppRoutes;
