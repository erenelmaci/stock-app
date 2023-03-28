import axios from "axios"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify"
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} from "../features/authSlice"

const useAuthCall = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const BASE_URL = "http://12160.fullstack.clarusway.com/"

  const login = async (userInfo) => {
    dispatch(fetchStart())
    try {
      const { data } = await axios.post(
        `${BASE_URL}account/auth/login/`,
        userInfo
      )
      dispatch(loginSuccess(data))
      toastSuccessNotify("Login performed")
      navigate("/stock")
    } catch (error) {
      console.log(error)
      toastErrorNotify(error)
      dispatch(fetchFail())
    }
  }

  const logout = async () => {
    dispatch(fetchStart())
    try {
      await axios.post(`${BASE_URL}account/auth/logout/`)
      dispatch(logoutSuccess())
      toastSuccessNotify("logout performed")
      navigate("/")
    } catch (error) {
      console.log(error)
      dispatch(fetchFail())
      toastErrorNotify("logout can not be performed")
    }
  }
  const register = async (userInfo) => {
    dispatch(fetchStart())
    try {
      const { data } = await axios.post(
        `${BASE_URL}account/register/`,
        userInfo
      )
      dispatch(registerSuccess(data))
      toastSuccessNotify("Register performed")
      navigate("/stock")
    } catch (error) {
      console.log(error)
      dispatch(fetchFail())
      toastErrorNotify("Register can not be performed")
    }
  }

  return { login, register, logout }
}

export default useAuthCall
