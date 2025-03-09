import Signup from "@/pages/Signup";
import { Route, Routes } from "react-router";


const UserRouteArray = [
    { path: "signup", component: Signup }
]

const UserRoutes = () => {
    return (
        <>
        <Routes>
            {UserRouteArray.map(({ component: Component, path }, key) => {
                return (
                    <Route
                        path={path}
                        element={<Component />}
                        key={key}
                    />
                );

            })}
            </Routes>
        </>
    )
}

export default UserRoutes