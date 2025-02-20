import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useGetRecipeQuery } from './recipesApiSlice'
import  useAuth  from '../../hooks/useAuth'
import useTitle from '../../hooks/useTitle'
import PulseLoader from 'react-spinners/PulseLoader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faUser, faStar, faCalendar } from '@fortawesome/free-regular-svg-icons'
import { faUtensils, faFire } from '@fortawesome/free-solid-svg-icons'
import '../../css/RecipeDetails.css'
import recipe_star_logo from '../../img/recipe_star_logo.png'

const RecipeDetails = () => {
    const { id } = useParams()
    
    const { isManager, isAdmin } = useAuth()

    
    const {
        data: recipe, // Rename to singular
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetRecipeQuery(id)
    const cookingTime = `${recipe?.cookingTime || 'N/A'} mins`;
    const author = recipe?.user?.username || 'Anonymous';

    useTitle(`RecipeStar: ${recipe?.title || 'Recipe Details'}`)

    if (isLoading) return <div className="center-spinner"><PulseLoader color={"#4a5568"} /></div>
    if (isError) return <p className="errmsg">{error?.data?.message || 'Failed to load recipe'}</p>

    return (
        <div className="recipe-details-container">
            <header className="recipe-details-header">
            <Link to="/dash" className="logo-link">
                <img 
                    src={recipe_star_logo}
                    alt="RecipeStar Logo" 
                    className="header-logo"
                />
            </Link>
            <nav className="header-nav">
                <Link to="/dash" className="home-link">
                    ← Back to Home
                </Link>
            </nav>
        </header>
            {isSuccess && recipe && (
                <>
                    <div className="recipe-hero">
                        <img 
                            src={recipe.image || '/default-recipe.jpg'} 
                            alt={recipe.title}
                            className="recipe-hero-image"
                        />
                        <div className="recipe-hero-overlay">
                            <h1 className="recipe-title">{recipe.title}</h1>
                            <div className="recipe-meta">
                                <span className="meta-item">
                                    <FontAwesomeIcon icon={faUser} /> 
                                    {recipe.user?.username || 'Anonymous'}
                                </span>
                                <span className="meta-item">
                                    <FontAwesomeIcon icon={faClock} /> 
                                    {recipe.cookingTime} mins
                                </span>
                                <span className="meta-item">
                                    <FontAwesomeIcon icon={faCalendar} /> 
                                    {new Date(recipe.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="recipe-content">
                        <div className="recipe-info-grid">
                            <div className="ingredients-card">
                                <h2><FontAwesomeIcon icon={faUtensils} /> Ingredients</h2>
                                <ul className="ingredients-list">
                                    {recipe.ingredients?.map((ingredient, index) => (
                                        <li key={index}>{ingredient}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="instructions-card">
                                <h2><FontAwesomeIcon icon={faFire} /> Instructions</h2>
                                <ol className="instructions-list">
                                    {recipe.instructions?.map((step, index) => (
                                        <li key={index}>{step}</li>
                                    ))}
                                </ol>
                            </div>
                        </div>

                        <div className="additional-details">
                            <div className="detail-item">
                                <h3>Category</h3>
                                <p>{recipe.category || 'General'}</p>
                            </div>
                            <div className="detail-item">
                                <h3>Rating</h3>
                                <div className="rating-stars">
                                    {Array(5).fill().map((_, i) => (
                                        <FontAwesomeIcon 
                                            key={i}
                                            icon={faStar} 
                                            className={i < (recipe.rating || 0) ? 'filled' : ''}
                                        />
                                    ))}
                                    <span>({recipe.ratingsCount || 0} reviews)</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </>
            )}
            <footer className="recipe-details-footer">
            <div className="footer-content">
                <p className="copyright">
                    © {new Date().getFullYear()} RecipeStar. All rights reserved.
                </p>
            </div>
        </footer>
        </div>
    )
}

export default RecipeDetails