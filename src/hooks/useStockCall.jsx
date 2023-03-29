import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { fetchFail, getSuccess, fetchStart } from "../features/stockSlice"
import useAxios from "./useAxios"

const useStockCall = () => {
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { axiosWithToken } = useAxios()

  const getStockData = async (url) => {
    dispatch(fetchStart())

    try {
      const { data } = axiosWithToken(`stock/${url}`)
      dispatch(getSuccess({ data, url }))
    } catch (error) {
      dispatch(fetchFail())
    }
  }

  const deleteStockData = async (url, id) => {
    const BASE_URL = "https://12160.fullstack.clarusway.com/"
    dispatch(fetchStart())

    try {
      await axios.delete(`${BASE_URL}stock/firms/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      })
      getStockData(url)
    } catch (error) {
      dispatch(fetchFail())
    }
  }

  return { getStockData, deleteStockData }
}

export default useStockCall
