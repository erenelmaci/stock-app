import { Route, Router, Routes } from "react-router-dom"
import Brands from "../pages/Brands"
import Dashboard from "../pages/Dashboard"
import Firms from "../pages/Firms"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Products from "../pages/Products"
import Purchases from "../pages/Purchases"
import Register from "../pages/Register"
import Sales from "../pages/Sales"
import PrivateRouter from "./PrivateRouter"

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="stock" element={<PrivateRouter />}>
          <Route path="" element={<Dashboard />}>
            <Route index element={<Home />} />
            <Route path="purchases" element={<Purchases />} />
            <Route path="sales" element={<Sales />} />
            <Route path="firms" element={<Firms />} />
            <Route path="brands" element={<Brands />} />
            <Route path="products" element={<Products />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRouter
