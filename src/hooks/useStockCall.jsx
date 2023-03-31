import { useDispatch } from "react-redux"
import { fetchFail, getSuccess, fetchStart } from "../features/stockSlice"
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify"
import {getProCatBrandSuccess} from "../features/stockSlice"
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

  const getProCatBrand = async () => {
    dispatch(fetchStart())
    try {
      const [products, categories, brands] = await Promise.all([
        axiosWithToken.get("stock/products/"),
        axiosWithToken.get("stock/categories/"),
        axiosWithToken.get("stock/brands/"),
      ])

      dispatch(
        getProCatBrandSuccess([products?.data, categories?.data, brands?.data])
      )
    } catch (error) {
      console.log(error)
      dispatch(fetchFail())
      toastErrorNotify(`Data can not be fetched`)
    }
  }

  return {
    getStockData,
    deleteStockData,
    postStockData,
    putStockData,
    getProCatBrand,
  }
}

export default useStockCall
