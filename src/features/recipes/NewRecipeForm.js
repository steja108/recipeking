import { useState, useEffect } from "react"
import { useAddNewRecipeMutation } from "./recipesApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import { useSelector } from "react-redux"
import { selectCurrentUserId } from "../auth/authSlice"
const NewRecipeForm = ({ users }) => {
    const [addNewRecipe, { 
        isLoading, 
        isSuccess, 
        isError, 
        error 
    }] = useAddNewRecipeMutation()
    
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState(null)

    // Add image state
    const [image, setImage] = useState('')
    const [title, setTitle] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [instructions, setInstructions] = useState('')
    const [cookingTime, setCookingTime] = useState('')
    const userId = useSelector(selectCurrentUserId); 

    useEffect(() => {
        if (isSuccess) {
            resetForm()
            navigate('/dash/recipes')
        }
    }, [isSuccess, navigate])

    useEffect(() => {
        if (isError) {
            setErrorMessage(error?.data?.message || 'Failed to save recipe')
        }
    }, [isError, error])

    const resetForm = () => {
        setImage('')
        setTitle('')
        setIngredients('')
        setInstructions('')
        setCookingTime('')
    }

    const canSave = [title, ingredients, instructions, cookingTime].every(Boolean) && !isLoading

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('User ID:', userId);
        if (!canSave) return
        
        try {
            // Convert to arrays and filter empty lines
            const ingredientsArray = ingredients.split('\n')
                              .filter(line => line.trim() !== '')
            const instructionsArray = instructions.split('\n')
                              .filter(line => line.trim() !== '')
            
            await addNewRecipe({
                title,
                image: image || '/default-recipe.jpg', // Add image
                ingredients: ingredientsArray,
                instructions: instructionsArray,
                cookingTime: Number(cookingTime)
            }).unwrap()

        } catch (err) {
            console.error('Failed to save recipe:', err)
            setErrorMessage(err.data?.message || 'Failed to save recipe')
        }
    }

    return (
        <>
            <p className={errorMessage ? "errmsg" : "offscreen"}>
                {errorMessage}
            </p>
            
            <form className="form" onSubmit={handleSubmit}>
                <div className="form__title-row">
                    <h2>New Recipe</h2>
                    <button 
                        className="icon-button" 
                        title="Save"
                        disabled={!canSave}
                    >
                        <FontAwesomeIcon icon={faSave} />
                    </button>
                </div>

                {/* Add Image Input */}
                <label className="form__label" htmlFor="image">
                    Image URL (optional):
                </label>
                <input
                    className="form__input"
                    id="image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                />

                {/* Existing fields */}
                <label className="form__label" htmlFor="title">Title:</label>
                <input
                    className="form__input"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <label className="form__label" htmlFor="ingredients">Ingredients:</label>
                <textarea
                    className="form__input form__input--text"
                    id="ingredients"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    rows="4"
                    placeholder="Enter one ingredient per line"
                    required
                />

                <label className="form__label" htmlFor="instructions">Instructions:</label>
                <textarea
                    className="form__input form__input--text"
                    id="instructions"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    rows="6"
                    placeholder="Enter one step per line"
                    required
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
                            min="1"
                            required
                        />
                    </div>

                </div>

                {isLoading && <p className="form__loading">Saving recipe...</p>}
            </form>
        </>
    )
}

export default NewRecipeForm