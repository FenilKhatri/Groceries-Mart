// roles
export const ROLES = {
    ADMIN: "admin",
    USER: "user",
    VENDOR: "vendor",
};

// routes
export const ROUTES = {
    HOME: "/",
    ABOUT: "/about",
    CONTACT: "/contact",
    PRODUCTS: "/products",
    LOGIN: "/login",
    REGISTER: "/register",
    VENDOR_LOGIN: "/vendor/login",
    VENDOR_REGISTER: "/vendor/register",
};

// api endpoints    
export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: "/users/login",
        REGISTER: "/users/register",
        VENDOR_LOGIN: "/vendors/login",
        VENDOR_REGISTER: "/vendors/register",
        ME: "/auth/me",
        LOGOUT: "/logout",
    },

    PRODUCTS: {
        GET_ALL: "/products",
        GET_ONE: (id) => `/products/${id}`,
    },

    USERS: {
        PROFILE: "/users/profile",
        UPDATE_PROFILE: "/users/update-profile",
        DELETE_PROFILE: "/users/delete-profile",
        UPDATE_PASSWORD: "/users/update-password",
        CART: {
            GET: "/users/cart",
            ADD: "/users/cart/add",
            UPDATE_QUANTITY: "/users/cart/update-quantity",
            REMOVE_ITEM: "/users/cart/remove-item",
            DELETE_CART: "/users/cart/delete-cart",
        },
        ORDERS: "/users/orders",
        INVOICE: (id) => `/users/orders/invoice/${id}`,
        SUBSCRIBE: "/users/subscribe",
        CONTACT: "/users/contact",
    },

    VENDORS: {
        PROFILE: (id) => `/vendors/${id}/profile`,
        UPDATE_PROFILE: (id) => `/vendors/${id}/update-profile`,
        DELETE_PROFILE: (id) => `/vendors/${id}/delete-profile`,
        UPDATE_PASSWORD: (id) => `/vendors/${id}/update-password`,
        UPLOAD_SHOP: (id) => `/vendors/${id}/upload/vendorShop`,
        GET_MY_SHOP: (id) => `/vendors/${id}/my-shop`,
        GET_SHOP_CATEGORIES: (vendorId) => `/vendors/${vendorId}/shop/categories`,
        ADD_PRODUCT: (id) => `/vendors/${id}/add-products`,        
        PRODUCTS: (vendorId) => `/vendors/${vendorId}/products`,
        GET_PRODUCTDETAILS: (vendorId, id) => `/vendors/${vendorId}/product/${id}`,
        UPDATE_PRODUCT: (vendorId, id) => `/vendors/${vendorId}/product/${id}`,
    },

    ADMIN: {
        VENDORS: "/admin/vendors",
        GET_PROFILE: "/admin/profile",
        APPROVE_VENDOR_REQUEST: (id) => `/admin/vendors/${id}/approve`,
        REJECT_VENDOR_REQUEST: (id) => `/admin/vendors/${id}/reject`,
        DELETE_VENDOR_REQUEST: (id) => `/admin/vendors/${id}/delete`,
        GET_SHOPS: "/admin/shops",
        GET_SHOP: (id) => `/admin/shops/${id}`,
        APPROVE_SHOP: (id) => `/admin/shops/${id}/approve`,
        REJECT_SHOP: (id) => `/admin/shops/${id}/reject`,
        DELETE_SHOP: (id) => `/admin/shops/${id}/delete`,
        CANCEL_SHOP: (id) => `/admin/shops/${id}/cancel`,
        GET_SHOP_PRODUCTS: (id) => `/admin/shops/${id}/products`,
        USERS: "/admin/users",
        ORDERS: "/admin/orders",
        GET_ORDER: (id) => `/admin/orders/${id}`,
        UPDATE_STATUS: (id) => `/admin/orders/${id}/update-status`,
        GET_PROFILE: "/admin/profile",
        UPDATE_PROFILE: "/admin/update-profile",
        DELETE_VENDOR: (id) => `/admin/vendors/${id}/delete`,
        DELETE_USER: (id) => `/admin/users/${id}/delete`,
        CONTACTS: "/admin/contacts",
        GET_CONTACT_DETAILS: (id) => `/admin/contact/${id}`,
        DASHBOARD: "/admin/dashboard",
    },

    PAYMENT: {
        CREATE_ORDER: "/users/payments/create-order",
        VERIFY: "/users/payments/verify-order",
    },
};

// admin actions
export const actions = [
    {
        key: "approve",
        label: "Approve",
        loadingLabel: "Approving...",
        bg: "bg-emerald-100",
        hover: "hover:bg-emerald-200",
        disabledCheck: (status) => status === "approved",
    },
    {
        key: "reject",
        label: "Reject",
        loadingLabel: "Rejecting...",
        bg: "bg-orange-100",
        hover: "hover:bg-orange-200",
        disabledCheck: (status) => status === "rejected",
    },
    {
        key: "delete",
        label: "Delete",
        loadingLabel: "Deleting...",
        bg: "bg-red-100",
        hover: "hover:bg-red-200",
        disabledCheck: (status) => status === "deleted",
    },
];

// shop status
export const SHOP_STATUS = {
    PENDING: "pending",
    APPROVED: "approved",
    REJECTED: "rejected",
    CANCELLED: "cancelled",
};

// order status
export const ORDER_STATUS = {
    PENDING: "Pending",
    PROCESSING: "Processing",
    OUT_FOR_DELIVERY: "Out of Delivery",
    DELIVERED: "Delivered",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
};

// ui constants
export const TOAST_CONFIG = {
    position: "top-right",
    autoClose: 3000,
    newestOnTop: true,
    closeOnClick: true,
    pauseOnHover: true,
    theme: "colored",
};

// toasts
export const MESSAGES = {
    SUCCESS: {
        LOGIN: "Login successful",
        REGISTER: "Registration successful",
        LOGOUT: "Logged out successfully",
        ORDER_PLACED: "Order placed successfully",
    },

    ERROR: {
        GENERIC: "Something went wrong. Please try again.",
        UNAUTHORIZED: "You are not authorized",
        LOGIN: "Login failed!",
        REGISTER: "Registration failed!",
    },
};