export const getOrderStats = (orders = []) => {
    const pendingOrders = orders.filter(
        (order) => order?.orderStatus === "placed"
    ).length;

    const outForDeliveryOrders = orders.filter(
        (order) => order?.orderStatus === "out_for_delivery"
    ).length;

    const deliveredOrders = orders.filter(
        (order) => order?.orderStatus === "delivered"
    ).length;

    const cancelledOrders = orders.filter(
        (order) => order?.orderStatus === "cancelled"
    ).length;

    const totalRevenue = orders.reduce(
        (sum, order) => sum + (order?.totalAmount || 0),
        0
    );

    return {
        pendingOrders,
        outForDeliveryOrders,
        deliveredOrders,
        cancelledOrders,
        totalRevenue,
    };
};

export const getLatestOrders = (orders = []) => {
    return [...orders]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
};

export const getMonthlyData = (orders = []) => {
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const data = months.map((month) => ({
        name: month,
        orders: 0,
        revenue: 0,
    }));

    orders.forEach((order) => {
        if (!order?.createdAt) return;

        const date = new Date(order.createdAt);
        const monthIndex = date.getMonth();

        data[monthIndex].orders += 1;
        data[monthIndex].revenue += order?.totalAmount || 0;
    });

    return data;
};

export const getCategoryData = (products = []) => {
    const map = {};

    products.forEach((product) => {
        const category = product?.category || "Other";
        map[category] = (map[category] || 0) + 1;
    });

    return Object.keys(map).map((key) => ({
        name: key,
        value: map[key],
    }));
};