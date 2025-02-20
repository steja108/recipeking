import { useParams } from 'react-router-dom'
import EditRecipeForm from './EditRecipeForm'
import { useGetRecipesQuery } from './recipesApiSlice'
import { useGetUsersQuery } from '../users/usersApiSlice'
import useAuth from '../../hooks/useAuth'
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from '../../hooks/useTitle'

const EditRecipe = () => {
    useTitle('RecipeStar: Edit Recipe')

    const { id } = useParams()

    const { username, isManager, isAdmin } = useAuth()

    const { recipe } = useGetRecipesQuery("recipesList", {
        selectFromResult: ({ data }) => ({
            recipe: data?.entities[id]
        }),
    })

    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        }),
    })

    if (!recipe || !users?.length) return <PulseLoader color={"#FFF"} />

    if (!isManager && !isAdmin) {
        if (recipe.user.username !== username) {
            return <p className="errmsg">No access</p>
        }
    }

    const content = <EditRecipeForm recipe={recipe} users={users} />

    return content
}

export default EditRecipe