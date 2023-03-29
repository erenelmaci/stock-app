import { Button, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import BrandCard from "../components/BrandCard"
import useStockCall from "../hooks/useStockCall"
import { flex } from "../styles/globalStyle"

const Brands = () => {
  const { getStockData } = useStockCall()
  const { brands } = useSelector((state) => state.stock)
  const [open, setOpen] = useState(false)
  const [info, setInfo] = useState({})

  console.log(brands)

  useEffect(() => {
    getStockData("brands")
  }, [])

  return (
    <div>
      <Typography variant="h4" color="error" mb={3}>
        Brands
      </Typography>
      <Button
        variant="contained"
        sx={{ backgroundColor: "black" }}
        onClick={() => {
          setInfo({})
          setOpen(true)
        }}
      >
        New Brand
      </Button>
      <Grid container sx={flex}>
        {brands?.map((brand) => (
          <Grid item key={brand.id}>
            <BrandCard brand={brand} setOpen={setOpen} setinfo={setInfo} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default Brands
