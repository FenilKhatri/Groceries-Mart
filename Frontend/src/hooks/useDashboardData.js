import { useEffect, useState } from "react";
import {
    getOrders,
    getShops,
    getUsers,
    getVendors,
    getProducts,
} from "../api/adminApi";
import { toast } from "react-toastify";

const useDashboardData = () => {
    const [vendors, setVendors] = useState([]);
    const [users, setUsers] = useState([]);
    const [shops, setShops] = useState([]);
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);

            const [userData, vendorData, shopData, orderData, productData] =
                await Promise.all([
                    getUsers(),
                    getVendors(),
                    getShops(),
                    getOrders(),
                    getProducts(),
                ]);

            setUsers(userData?.users || []);
            setVendors(vendorData?.vendors || []);
            setShops(shopData?.shops || []);
            setOrders(orderData?.orders || []);
            setProducts(productData?.data || []);
        } catch (error) {
            toast.error(error?.message || "Failed to fetch!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    return {
        vendors,
        users,
        shops,
        orders,
        products,
        loading,
        refreshing,
        setRefreshing,
        fetchDashboardData,
    };
};

export default useDashboardData;