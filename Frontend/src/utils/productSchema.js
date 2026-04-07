export const ProductSchema = ({ product }) => {
    if (!product) return null;

    const schema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "@id": window.location.href,

        name: product.name,

        image:
            product.images?.map((img) => img.url || img.filename) || [],

        description:
            product.description ||
            product.shortDescription ||
            "Fresh grocery product available online",

        sku: product._id,

        brand: {
            "@type": "Brand",
            name: "Green Leaf Grocers",
        },

        category: Array.isArray(product.category)
            ? product.category.join(", ")
            : product.category,

        offers: {
            "@type": "Offer",
            url: `${window.location.origin}/products/${product._id}`,
            priceCurrency: "INR",
            price: product.price,
            priceValidUntil: "2026-12-31",
            availability:
                product.stock > 0
                    ? "https://schema.org/InStock"
                    : "https://schema.org/OutOfStock",
            seller: {
                "@type": "Organization",
                name: "Green Leaf Grocers",
            },
        },

        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating || 4.5,
            reviewCount: product.numReviews || 10,
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};