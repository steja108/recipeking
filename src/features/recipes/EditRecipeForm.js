import { useState, useEffect } from "react"
import { useUpdateRecipeMutation, useDeleteRecipeMutation } from "./recipesApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import useAuth from "../../hooks/useAuth"

const EditRecipeForm = ({ recipe, users }) => {
    const { isManager, isAdmin } = useAuth()
    const [updateRecipe, { isLoading, isSuccess, isError, error }] = useUpdateRecipeMutation()
    const [deleteRecipe, { isSuccess: isDelSuccess }] = useDeleteRecipeMutation()
    const navigate = useNavigate()

    const [title, setTitle] = useState(recipe.title)
    const [ingredients, setIngredients] = useState(recipe.ingredients)
    const [instructions, setInstructions] = useState(recipe.instructions)
    const [cookingTime, setCookingTime] = useState(recipe.cookingTime)
    const [userId, setUserId] = useState(recipe.user._id)
    const [image, setImage] = useState(recipe.image || '')

    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            navigate('/dash/recipes')
        }
    }, [isSuccess, isDelSuccess, navigate])

    const isChanged = title !== recipe.title || 
        ingredients !== recipe.ingredients || 
        instructions !== recipe.instructions || 
        cookingTime !== recipe.cookingTime || 
        userId !== recipe.user._id ||
        image !== recipe.image 

    const canSave = isChanged && 
        [title, ingredients, instructions, cookingTime, userId].every(Boolean) && 
        !isLoading

    const onSaveRecipeClicked = async () => {
        if (canSave) {
            await updateRecipe({
                id: recipe._id,
                title,
                image: image || '/default-recipe.jpg',
                ingredients,
                instructions,
                cookingTime,
                user: userId
            })
        }
    }

    const onDeleteRecipeClicked = async () => {
        await deleteRecipe({ id: recipe._id })
    }

    const options = users.map(user => (
        <option key={user.id} value={user.id}>{user.username}</option>
    ))

    return (
        <form className="form" onSubmit={e => e.preventDefault()}>
            <div className="form__title-row">
                <h2>Edit Recipe: {recipe.title}</h2>
                <div className="form__action-buttons">
                    <button 
                      className="icon-button" 
                      onClick={onSaveRecipeClicked} 
                      disabled={!canSave}
                      title="Save Recipe"
                    >
                      <FontAwesomeIcon icon={faSave} size="lg" />
                    </button>
                    {(isManager || isAdmin) && (
                      <button 
                        className="icon-button" 
                        onClick={onDeleteRecipeClicked}
                        title="Delete Recipe"
                        style={{ background: '#ef4444' }}
                      >
                        <FontAwesomeIcon icon={faTrashCan} size="lg" />
                      </button>
                    )}
                </div>
            </div>
            <label className="form__label" htmlFor="title">Title:</label>
            <input
                className="form__input"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <label className="form__label" htmlFor="image">
                Image URL:
            </label>
            <input
                className="form__input"
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://example.com/recipe-image.jpg"
            />
            <div className="image-preview">
                {image && (
                    <img 
                        src={image} 
                        alt="Preview" 
                        className="preview-image"
                        onError={(e) => {
                            e.target.src = '/default-recipe.jpg'
                        }}
                    />
                )}
            </div>

            <label className="form__label" htmlFor="ingredients">Ingredients:</label>
            <textarea
                className="form__input form__input--text"
                id="ingredients"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                rows="4"
            />

            <label className="form__label" htmlFor="instructions">Instructions:</label>
            <textarea
                className="form__input form__input--text"
                id="instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                rows="6"
            />

            <div className="form__row">
                <div className="form__group">
                    <label className="form__label" htmlFor="cookingTime">
                        Cooking Time (mins):
                    </label>
                    <input
                        className="form__input form__input--small"
                        type="number"
                        id="cookingTime"
                        value={cookingTime}
                        onChange={(e) => setCookingTime(e.target.value)}
                    />
                </div>

                <div className="form__group">
                    <label className="form__label" htmlFor="user">
                        Author:
                    </label>
                    <select
                        className="form__select"
                        id="user"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    >
                        {options}
                    </select>
                </div>
            </div>
            {/* Form fields similar to NewRecipeForm */}
            {/* Add all the input fields for editing recipe */}
        </form>
    )
}

export default EditRecipeForm