import { useDispatch } from "react-redux"
import { fetchFail, getSuccess, fetchStart } from "../features/stockSlice"
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify"
import useAxios from "./useAxios"

const useStockCall = () => {
  const dispatch = useDispatch()
  const { axiosWithToken } = useAxios()

  const getStockData = async (url) => {
    dispatch(fetchStart())
    try {
      const { data } = await axiosWithToken(`stock/${url}`)
      dispatch(getSuccess({ data, url }))
    } catch (error) {
      dispatch(fetchFail())
    }
  }

  const deleteStockData = async (url, id) => {
    dispatch(fetchStart())
    try {
      await axiosWithToken.delete(`stock/${url}/${id}/`)
      getStockData(url)
      toastSuccessNotify(`${url} successfuly deleted`)
    } catch (error) {
      dispatch(fetchFail())
      toastErrorNotify(`${url} can not be deleted`)
    }
  }
  const postStockData = async (url, info) => {
    dispatch(fetchStart())
    try {
      await axiosWithToken.post(`stock/${url}/`, info)
      getStockData(url)
      toastSuccessNotify(`${url} successfuly posted`)
    } catch (error) {
      dispatch(fetchFail())
      toastErrorNotify(`${url} can not be posted`)
    }
  }
  const putStockData = async (url, info) => {
    dispatch(fetchStart())
    try {
      await axiosWithToken.put(`stock/${url}/${info.id}/`, info)
      getStockData(url)
      toastSuccessNotify(`${url} successfuly updated`)
    } catch (error) {
      dispatch(fetchFail())
      toastErrorNotify(`${url} can not be updated`)
    }
  }

  return { getStockData, deleteStockData, postStockData, putStockData }
}

export default useStockCall
