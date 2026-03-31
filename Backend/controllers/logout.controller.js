export const logout = async (req, res) => {
    const isProd = process.env.NODE_ENV === "production";

    res.clearCookie("token", {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
        path: "/",
    });

    return res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
};