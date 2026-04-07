import {
    LogIn,
    Search,
    ShoppingCart,
    CreditCard,
    PackageCheck,
} from "lucide-react";

const userFlow = [
    {
        step: 1,
        title: "Authentication",
        description: "User registers or logs in using credentials (JWT-based login).",
        icon: LogIn,
    },
    {
        step: 2,
        title: "Browse Products",
        description:
            "User explores categories, searches products, and applies filters.",
        icon: Search,
    },
    {
        step: 3,
        title: "Product Selection",
        description:
            "User views product details and selects quantity to add to cart.",
        icon: ShoppingCart,
    },
    {
        step: 4,
        title: "Cart & Checkout",
        description:
            "User reviews cart items, updates quantity, enters shipping details, and proceeds to checkout.",
        icon: CreditCard,
    },
    {
        step: 5,
        title: "Payment & Order",
        description:
            "User completes payment (e.g., Razorpay), order is placed, and confirmation + tracking is available.",
        icon: PackageCheck,
    },
];

export default userFlow;