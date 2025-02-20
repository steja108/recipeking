import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useTitle from '../../hooks/useTitle';
import '../../css/Welcome.css';
import { useGetRecipesQuery } from '../recipes/recipesApiSlice';
import { useToggleSavedRecipeMutation } from '../saved/savedApiSlice';

const Welcome = () => {

    const { username, isManager, isAdmin } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    
    const {
        data: recipesData,
        isLoading,
        isError,
        error
    } = useGetRecipesQuery();
    useTitle(`RecipeStar: ${username}`);

    const recipes = recipesData?.ids.map(id => recipesData.entities[id]) || []
    const filteredRecipes = recipesData?.ids
        .map(id => recipesData.entities[id])
        .filter(recipe => {
            const searchText = searchTerm.toLowerCase();
            return (
                recipe.title.toLowerCase().includes(searchText) ||
                (recipe.ingredients?.join(' ').toLowerCase().includes(searchText))
            );
        }) || [];
        

    const RecipeCard = ({ recipe }) => {
        const [toggleSaved] = useToggleSavedRecipeMutation();
        const [isSaved, setIsSaved] = useState(false);
        const [isAnimating, setIsAnimating] = useState(false);

        const handleFavorite = async (e) => {
            e.preventDefault();
            try {
                await toggleSaved(recipe._id).unwrap();
                setIsAnimating(true);
                setIsSaved(!isSaved);
            } catch (err) {
                console.error('Failed to toggle save:', err);
            }
    };
        return (
            <Link to={`/recipes/${recipe._id}`} className="recipe-card-link">
                <div className="recipe-card">
                    <div className="card-image-container">
                        <img
                            src={recipe.image || '/default-recipe.jpg'}
                            alt={recipe.title}
                            className="recipe-image"
                        />
                        <button 
                            className="favorite-button"
                            onClick={handleFavorite}
                        >
                            <div 
                                className={`heart ${isAnimating ? 'is_animating' : ''} ${isSaved ? 'is-saved' : ''}`}
                                onAnimationEnd={() => setIsAnimating(false)}
                            ></div>
                        </button>
                        <span className="recipe-category">{recipe.category || 'General'}</span>
                    </div>
                    <div className="card-content">
                        <h3 className="recipe-title">{recipe.title}</h3>
                        <div className="recipe-meta">
                            <span>⏲️ {recipe.cookingTime} mins</span>
                            <span>👤 {recipe.user?.username || 'Anonymous'}</span>
                        </div>
                        <div className="recipe-rating">
                            {Array(5).fill().map((_, i) => (
                                <span key={i} className={`star ${i < (recipe.rating || 0) ? 'filled' : ''}`}>
                                    ★
                                </span>
                            ))}
                            <span className="rating-count">({recipe.ratingsCount || 0})</span>
                        </div>
                    </div>
                </div>
            </Link>
        )
    };
       
        

    if (isLoading) return <div className="loading-spinner"></div>;
    if (error) return <div className="error-message">⚠️ {error}</div>;

    return (
        <div className="welcome-container">
            <h1 className="welcome-title">
                Welcome back, {username}! 🙍‍♂️🍳
                <span className="subtitle">{filteredRecipes.length} delicious recipes found</span>
            </h1>
            <div className="search-container">
                <input 
                    type="text"
                    placeholder="Search recipes by title or ingredients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>
            
            <div className="recipe-grid">
                {filteredRecipes.map(recipe => (
                    <RecipeCard key={recipe._id} recipe={recipe} />
                ))}
            </div>

            {(isManager || isAdmin) && (
                <Link to="/dash/recipes/new" className="add-recipe-button">
                    + Add New Recipe
                </Link>
            )}
        </div>
    );
};

export default Welcome;