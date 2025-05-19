import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import AboutUs from './components/AboutUs'
import Login from './features/auth/Login'
import Signup from './features/auth/SignUp'
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import RecipesList from './features/recipes/RecipesList'
import RecipeDetails from './features/recipes/RecipeDetails' // NEW IMPORT
import UsersList from './features/users/UsersList'
import EditUser from './features/users/EditUser'
import NewUserForm from './features/users/NewUserForm'
import EditRecipe from './features/recipes/EditRecipe'
import NewRecipe from './features/recipes/NewRecipe'
import Prefetch from './features/auth/Prefetch'
import PersistLogin from './features/auth/PersistLogin'
import RequireAuth from './features/auth/RequireAuth'
import SavedRecipes from './features/saved/SavedRecipes'
import { ROLES } from './config/roles'
import useTitle from './hooks/useTitle';
import AdminRoleRequestsPage from './features/admin/AdminRoleRequestsPage';

function App() {
  useTitle('RecipeStar')

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="aboutus" element={<AboutUs />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="recipes/:id" element={<RecipeDetails />} /> {/* NEW ROUTE */}

        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>

                <Route index element={<Welcome />} />
                <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                  <Route path="users">
                      <Route index element={<UsersList />} />
                      <Route path=":id" element={<EditUser />} />
                      <Route path="new" element={<NewUserForm />} />
                  </Route>
                  
                  {/* Add the new admin role requests route */}
                  <Route path="admin/role-requests" element={<AdminRoleRequestsPage />} />
                </Route>

                <Route element={<RequireAuth allowedRoles={[ROLES.Writer, ROLES.Admin]} />}>
                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path=":id" element={<EditUser />} />
                    <Route path="new" element={<NewUserForm />} />
                  </Route>
                </Route>

                <Route path="recipes">
                  <Route index element={<RecipesList />} />
                  <Route path="/dash/recipes/manage" element={<RecipesList />} />

                  <Route path=":id" element={<EditRecipe />} />
                  <Route path="new" element={<NewRecipe />} />
                </Route>
                <Route path="saved-recipes" element={<SavedRecipes />} />

              </Route>{/* End Dash */}
            </Route>
          </Route>
        </Route>{/* End Protected Routes */}

      </Route>
    </Routes>
  );
}

export default App;