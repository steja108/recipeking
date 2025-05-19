import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useGetRecipeQuery } from './recipesApiSlice'
import useAuth from '../../hooks/useAuth'
import useTitle from '../../hooks/useTitle'
import PulseLoader from 'react-spinners/PulseLoader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faUser, faStar, faCalendar, faPrint, faShare } from '@fortawesome/free-solid-svg-icons'
import { faUtensils, faFire } from '@fortawesome/free-solid-svg-icons'
import '../../css/RecipeDetails.css'
import recipe_star_logo from '../../img/recipe_star_logo.png'
import ReviewsList from '../reviews/ReviewsList'
import AddReviewForm from '../reviews/AddReviewForm'
import { useRef } from 'react'

const RecipeDetails = () => {
    const { id } = useParams()
    const { username } = useAuth()
    const printRef = useRef(null)
    
    const {
        data: recipe,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetRecipeQuery(id)
    
    useTitle(`RecipeStar: ${recipe?.title || 'Recipe Details'}`)

    const handlePrint = () => {
        const printContents = printRef.current.innerHTML;
        const originalContents = document.body.innerHTML;
        
        // Create a new window with simplified print-friendly content
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>${recipe?.title || 'Recipe'} | RecipeStar</title>
                    <style>
                        body {
                            font-family: 'Nunito', Arial, sans-serif;
                            line-height: 1.6;
                            color: #333;
                            max-width: 800px;
                            margin: 0 auto;
                            padding: 20px;
                        }
                        h1 {
                            color: #e76f51;
                            text-align: center;
                            margin-bottom: 30px;
                        }
                        .recipe-meta {
                            display: flex;
                            justify-content: space-around;
                            margin-bottom: 20px;
                            border-bottom: 1px solid #eee;
                            padding-bottom: 10px;
                        }
                        .recipe-section {
                            margin-bottom: 30px;
                        }
                        h2 {
                            color: #2a9d8f;
                            border-bottom: 2px solid #2a9d8f;
                            padding-bottom: 5px;
                            margin-bottom: 15px;
                        }
                        .ingredients-list {
                            list-style-type: square;
                            padding-left: 20px;
                        }
                        .instructions-list {
                            padding-left: 20px;
                        }
                        .instructions-list li {
                            margin-bottom: 10px;
                        }
                        .footer {
                            margin-top: 30px;
                            text-align: center;
                            font-size: 0.9rem;
                            color: #777;
                            border-top: 1px solid #eee;
                            padding-top: 10px;
                        }
                    </style>
                </head>
                <body>
                    <div class="recipe-printable">
                        <h1>${recipe?.title || 'Recipe'}</h1>
                        
                        <div class="recipe-meta">
                            <div><strong>Author:</strong> ${recipe?.user?.username || 'Anonymous'}</div>
                            <div><strong>Cooking Time:</strong> ${recipe?.cookingTime || 'N/A'} mins</div>
                            <div><strong>Category:</strong> ${recipe?.category || 'General'}</div>
                        </div>
                        
                        <div class="recipe-section">
                            <h2>Ingredients</h2>
                            <ul class="ingredients-list">
                                ${recipe?.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('') || ''}
                            </ul>
                        </div>
                        
                        <div class="recipe-section">
                            <h2>Instructions</h2>
                            <ol class="instructions-list">
                                ${recipe?.instructions.map(step => `<li>${step}</li>`).join('') || ''}
                            </ol>
                        </div>
                        
                        <div class="footer">
                            <p>Printed from RecipeStar.com</p>
                            <p>Date: ${new Date().toLocaleDateString()}</p>
                        </div>
                    </div>
                </body>
            </html>
        `);
        
        printWindow.document.close();
        printWindow.focus();
        
        // Add small delay to ensure content is loaded
        setTimeout(() => {
            printWindow.print();
            // printWindow.close();
        }, 250);
    };

    const handleShare = async () => {
        const recipeUrl = window.location.href;
        
        // Use Web Share API if available
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${recipe?.title} | RecipeStar`,
                    text: `Check out this delicious ${recipe?.title} recipe on RecipeStar!`,
                    url: recipeUrl,
                });
            } catch (err) {
                console.error('Error sharing:', err);
                // Fallback to clipboard copy
                copyToClipboard(recipeUrl);
            }
        } else {
            // Fallback to clipboard copy
            copyToClipboard(recipeUrl);
        }
    };
    
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                alert('Recipe link copied to clipboard!');
            })
            .catch(err => {
                console.error('Could not copy text: ', err);
            });
    };

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
                    <div className="recipe-actions">
                        <button 
                            onClick={handlePrint}
                            className="action-button print-button"
                            title="Print this recipe"
                        >
                            <FontAwesomeIcon icon={faPrint} /> Print
                        </button>
                        <button 
                            onClick={handleShare}
                            className="action-button share-button"
                            title="Share this recipe"
                        >
                            <FontAwesomeIcon icon={faShare} /> Share
                        </button>
                    </div>
                    
                    <div ref={printRef}>
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
                    </div>
                    
                    {/* Reviews Section */}
                    <div className="reviews-section">
                        <ReviewsList recipeId={id} />
                        
                        {username ? (
                            <AddReviewForm recipeId={id} />
                        ) : (
                            <div className="login-to-review">
                                <p>Please <Link to="/login">log in</Link> to leave a review.</p>
                            </div>
                        )}
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
    );
};

export default RecipeDetails;