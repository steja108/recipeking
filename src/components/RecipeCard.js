import { Link } from 'react-router-dom';
import { useToggleSavedRecipeMutation } from '../features/saved/savedApiSlice';

const RecipeCard = ({ recipe }) => {
    const [toggleSaved] = useToggleSavedRecipeMutation();
    
    const handleFavorite = (e) => {
        e.preventDefault();
        toggleSaved(recipe._id);
    };

    return (
        <Link to={`/recipes/${recipe._id}`} className="recipe-card-link" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="recipe-card">
                <div className="card-image-container">
                    <img
                        src={recipe.image || '/default-recipe.jpg'}
                        alt={recipe.title}
                        className="recipe-image"
                    />
                    <button className="favorite-button" onClick={handleFavorite}>
                        ♥
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
    );
};

export default RecipeCard;