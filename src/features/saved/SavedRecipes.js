// features/saved/SavedRecipes.js
import { useGetSavedRecipesQuery } from './savedApiSlice';
import { PulseLoader } from 'react-spinners';
import useTitle from '../../hooks/useTitle';
import  RecipeCard from '../../components/RecipeCard';

const SavedRecipes = () => {
    useTitle('RecipeStar: Saved Recipes');
    const {
        data: recipes,
        isLoading,
        isError,
        error
    } = useGetSavedRecipesQuery();

    if (isLoading) return <PulseLoader color="#FFF" />;
    if (isError) return <div className="error">{error?.data?.message}</div>;

    return (
        <div className="welcome-container">
            <h1 className="welcome-title">
                Your Saved Recipes
                <span className="subtitle">{recipes?.length} saved recipes</span>
            </h1>
            
            <div className="recipe-grid">
                {recipes?.map(recipe => (
                    <RecipeCard key={recipe._id} recipe={recipe} />
                ))}
            </div>
        </div>
    );
};

export default SavedRecipes;