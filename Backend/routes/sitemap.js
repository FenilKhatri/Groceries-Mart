import express from "express";
import Product from "../models/productModel";

const sitemapRouter = express.Router();

sitemapRouter.get("/sitemap.xml", async (req, res) => {
    try {
        const baseUrl = "https://groceries-mart.vercel.app";

        const products = await Product.find({}, "slug updatedAt");

        let xml = `<?xml version="1.0" encoding="UTF-8"?>`;
        xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

        // Static pages
        const staticPages = ["", "/products", "/about", "/contact"];

        staticPages.forEach((page) => {
            xml += `
        <url>
          <loc>${baseUrl}${page}</loc>
          <changefreq>daily</changefreq>
          <priority>${page === "" ? "1.0" : "0.8"}</priority>
        </url>`;
        });

        // Product pages
        products.forEach((product) => {
            xml += `
        <url>
          <loc>${baseUrl}/product/${product._id}</loc>
          <lastmod>${product.updatedAt.toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.9</priority>
        </url>`;
        });

        xml += `</urlset>`;

        res.header("Content-Type", "application/xml");
        res.send(xml);
    } catch (error) {
        console.error(error);
        res.status(500).end();
    }
});

export default sitemapRouter;