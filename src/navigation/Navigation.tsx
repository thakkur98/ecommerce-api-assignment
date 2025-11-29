import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import CartPage from "../pages/cart/Cart";

const Navigation = () =>{
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard/>}/>
            </Routes>            
        </Router>
    )
}

export default Navigation;