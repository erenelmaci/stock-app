import { Button, Grid, Typography } from "@mui/material"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import FirmCard from "../components/FirmCard"
import useStockCall from "../hooks/useStockCall"
import { flex } from "../styles/globalStyle"

const Firms = () => {
  const { getStockData } = useStockCall()
  const { firms } = useSelector((state) => state.stock)

  useEffect(() => {
    getStockData("firms")
  }, [])

  console.log(firms)

  return (
    <div>
      <Typography variant="h4" color="error" mb={3}>
        Firms
      </Typography>
      <Button variant="contained" sx={{ backgroundColor: "black" }}>
        New Firm
      </Button>
      <Grid container sx={flex}>
        {firms?.map((firm) => (
          <Grid item key={firm.id}>
            <FirmCard firm={firm} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default Firms
