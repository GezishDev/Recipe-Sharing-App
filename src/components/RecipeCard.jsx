import { Link } from "react-router-dom";
import { useState } from "react";

const RecipeCard = ({ recipe }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <div className="relative h-48 bg-gray-200">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            Loading...
          </div>
        )}
        <img
          src={
            recipe.imageUrl ||
            "https://via.placeholder.com/400x300?text=No+Image"
          }
          alt={recipe.title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{recipe.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{recipe.category}</span>
          <Link
            to={`/recipe/${recipe.id}`}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
          >
            View Recipe
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
