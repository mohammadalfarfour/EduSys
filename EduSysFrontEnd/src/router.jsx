import {createBrowserRouter} from "react-router-dom"
import App from "./App"

import PriceChecker from "./views/PriceChecker";

const router =createBrowserRouter([
{
    path: '/',
    element:<PriceChecker />
},

])

export default router;