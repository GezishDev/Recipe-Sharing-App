import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllRecipes } from "../services/recipeService";
import RecipeCard from "../components/RecipeCard";
import { useAuth } from "../hooks/useAuth";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Home = () => {
  const { currentUser } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getAllRecipes();
        setRecipes(data);
        setFilteredRecipes(data);
      } catch (err) {
        setError("Failed to load recipes");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredRecipes(recipes);
    } else {
      const lower = searchTerm.toLowerCase();
      const filtered = recipes.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(lower) ||
          recipe.description.toLowerCase().includes(lower) ||
          recipe.ingredients.some((ing) => ing.toLowerCase().includes(lower)),
      );
      setFilteredRecipes(filtered);
    }
  }, [searchTerm, recipes]);

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <div className="h-64 mb-8 bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg" />
        <Skeleton height={40} width={300} className="mb-8" />
        <Skeleton height={50} className="mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md p-4">
              <Skeleton height={200} />
              <Skeleton count={3} className="mt-2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8 text-center">
        <p className="text-red-600 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-700 text-white rounded-2xl shadow-xl p-12 mb-12 text-center">
        <h1 className="text-5xl font-extrabold mb-4">
          Discover & Share Amazing Recipes
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join our community of food lovers and share your culinary creations.
        </p>
        {!currentUser && (
          <Link
            to="/register"
            className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition inline-block"
          >
            Get Started
          </Link>
        )}
      </div>

      <h2 className="text-3xl font-bold mb-6">All Recipes</h2>
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search recipes by title, description, or ingredient..."
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredRecipes.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-12">
          No recipes match your search. Try a different keyword!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
