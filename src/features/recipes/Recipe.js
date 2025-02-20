import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useGetRecipesQuery } from './recipesApiSlice'
import { memo } from 'react'

const Recipe = ({ recipeId }) => {
    const { recipe } = useGetRecipesQuery("recipesList", {
        selectFromResult: ({ data }) => ({
            recipe: data?.entities[recipeId]
        }),
    })

    const navigate = useNavigate()

    if (recipe) {
        const created = new Date(recipe.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        
        // Add fallbacks for missing data
        const cookingTime = `${recipe.cookingTime || 'N/A'} mins`
        const author = recipe.user?.username || 'Unknown'

        const handleEdit = () => navigate(`/dash/recipes/${recipeId}`)

        return (
            <tr className="table__row">
                <td className="table__cell recipe__title">{recipe.title}</td>
                <td className="table__cell recipe__author">{author}</td>
                <td className="table__cell recipe__cookingTime">{cookingTime}</td>
                <td className="table__cell recipe__created">{created}</td>
                <td className="table__cell">
                    <button 
                        className="icon-button table__button" 
                        onClick={handleEdit}
                        title="Edit Recipe"
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )
    } else return null
}

export default memo(Recipe)