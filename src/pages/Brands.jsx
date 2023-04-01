import { Box, Button, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import BrandCard from "../components/BrandCard"
import BrandModal from "../components/modals/BrandModal"
import useStockCall from "../hooks/useStockCall"
import { flex } from "../styles/globalStyle"

const Brands = () => {
  const { getStockData } = useStockCall()
  const { brands } = useSelector((state) => state.stock)
  const [open, setOpen] = useState(false)
  const [info, setInfo] = useState({})

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    getStockData("brands")
  }, []) // eslint-disable-line

  return (
    <Box>
      <Typography variant="h4" color="error" mb={3}>
        Brands
      </Typography>
      <Button
        variant="contained"
        sx={{ backgroundColor: "black" }}
        onClick={handleOpen}
      >
        New Brand
      </Button>
      <BrandModal
        open={open}
        handleClose={handleClose}
        info={info}
        setInfo={setInfo}
      />
      <Grid container sx={flex}>
        {brands?.map((brand) => (
          <Grid item key={brand.id}>
            <BrandCard brand={brand} setOpen={setOpen} setInfo={setInfo} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Brands
