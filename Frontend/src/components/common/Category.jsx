import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import categories from "../../data/categories";
import CategorySkeleton from "../reusable-component/CategorySkeleton";

const Category = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleCategories = () => {
    try {
      setLoading(true);
      setCategory(categories);
    } catch (error) {
      toast.error(error?.message || "Failed to load categories!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleCategories();
  }, []);

  return (
    <div className="my-10 bg-gray-100">
      <div className="mx-auto max-w-screen-2xl space-y-5 px-5 py-10">
        <p className="text-center text-xl font-bold">Shop by Category</p>
        <p className="text-center font-semibold text-gray-600">
          Browse through our wide variety of fresh and organic products
        </p>

        {loading ? (
          <CategorySkeleton
            count={category.length || categories.length || 10}
          />
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {category?.map((item) => (
              <div
                key={item.value}
                className="flex flex-col items-center justify-center gap-3 transition-all hover:scale-105 cursor-pointer "
              >
                <img
                  src={item.image}
                  alt={item.value}
                  className="h-20 w-20 rounded-full object-cover"
                />
                <p className="text-center font-bold">{item.value}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
