import { Button, Typography } from "@mui/material"
import { useEffect } from "react"
import useStockCall from "../hooks/useStockCall"

const Firms = () => {
  const { getStockData } = useStockCall()

  useEffect(() => {
    getStockData("firms")
  }, [])

  return (
    <>
      <Typography variant="h4" color="error" mb={3}>
        Firms
      </Typography>
      <Button variant="contained" sx={{ backgroundColor: "black" }}>
        New Firm
      </Button>
    </>
  )
}

export default Firms
