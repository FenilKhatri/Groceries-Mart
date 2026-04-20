import {
    FaTruck,
    FaLeaf,
    FaShieldAlt,
    FaUser,
    FaCog,
    FaCheckCircle,
    FaLock,
    FaStar,
    FaBoxOpen,
    FaCreditCard,
    FaShoppingCart,
    FaSearch,
    FaSignInAlt,
    FaStore,
    FaAppleAlt,
} from "react-icons/fa";

export const features = [
    {
        title: "Fast Delivery",
        desc: "Get your groceries delivered quickly at your doorstep",
        icon: FaTruck,
    },
    {
        title: "Fresh & Organic",
        desc: "Directly sourced from farms to ensure freshness",
        icon: FaLeaf,
    },
    {
        title: "Secure Payments",
        desc: "Safe transactions with trusted payment gateways",
        icon: FaShieldAlt,
    },
];

export const steps = [
    {
        title: "Register",
        desc: "Create your account in just a few simple steps",
        icon: FaUser,
    },
    {
        title: "Browse & Order",
        desc: "Explore products and add items to your cart easily",
        icon: FaCog,
    },
    {
        title: "Fast Delivery",
        desc: "Get your groceries delivered quickly at your doorstep",
        icon: FaTruck,
    },
];

export const vendors = [
    {
        name: "Green Farm",
        desc: "Organic vegetables directly from farms",
        icon: FaLeaf,
        position: "top-0 left-1/2 -translate-x-1/2",
    },
    {
        name: "Fresh Dairy",
        desc: "Pure milk and dairy products",
        icon: FaStore,
        position: "bottom-0 left-10",
    },
    {
        name: "Fruit Hub",
        desc: "Fresh seasonal fruits delivered daily",
        icon: FaAppleAlt,
        position: "bottom-0 right-10",
    },
];

export const reviews = [
    {
        name: "Rahul Sharma",
        role: "Customer",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        review:
            "FreshMart delivers amazing quality groceries. The delivery is always on time!",
    },
    {
        name: "Priya Patel",
        role: "Customer",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        review:
            "Super easy to use and great prices. I love ordering from here every week.",
    },
    {
        name: "Amit Verma",
        role: "Customer",
        image: "https://randomuser.me/api/portraits/men/45.jpg",
        review:
            "Best grocery platform I’ve used. Clean UI and smooth experience.",
    },
    {
        name: "Sneha Joshi",
        role: "Customer",
        image: "https://randomuser.me/api/portraits/women/68.jpg",
        review:
            "Very fast delivery and fresh products. Highly recommended!",
    },
    {
        name: "Karan Mehta",
        role: "Customer",
        image: "https://randomuser.me/api/portraits/men/75.jpg",
        review:
            "Secure payment and great support. Never had any issues.",
    },
];

export const badges = [
    { icon: FaShieldAlt, text: "Secure Payments" },
    { icon: FaTruck, text: "Fast Delivery" },
    { icon: FaCheckCircle, text: "Fresh Guarantee" },
    { icon: FaLock, text: "Data Protection" },
    { icon: FaStar, text: "Top Rated Service" },
];

export const userFlow = [
    {
        step: 1,
        title: "Authentication",
        description:
            "User registers or logs in using credentials (JWT-based login).",
        icon: FaSignInAlt,
    },
    {
        step: 2,
        title: "Browse Products",
        description:
            "User explores categories, searches products, and applies filters.",
        icon: FaSearch,
    },
    {
        step: 3,
        title: "Product Selection",
        description:
            "User views product details and selects quantity to add to cart.",
        icon: FaShoppingCart,
    },
    {
        step: 4,
        title: "Cart & Checkout",
        description:
            "User reviews cart items, updates quantity, enters shipping details, and proceeds to checkout.",
        icon: FaCreditCard,
    },
    {
        step: 5,
        title: "Payment & Order",
        description:
            "User completes payment (e.g., Razorpay), order is placed, and confirmation + tracking is available.",
        icon: FaBoxOpen,
    },
];