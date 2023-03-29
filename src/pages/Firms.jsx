import { Button, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import FirmCard from "../components/FirmCard"
import FirmModal from "../components/modals/FirmModal"
import useStockCall from "../hooks/useStockCall"
import { flex } from "../styles/globalStyle"

const Firms = () => {
  const { getStockData } = useStockCall()
  const { firms } = useSelector((state) => state.stock)

  const [info, setInfo] = useState({
    name: "",
    phone: "",
    address: "",
    image: "",
  })

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    getStockData("firms")
  }, [])

  return (
    <div>
      <Typography variant="h4" color="error" mb={3}>
        Firms
      </Typography>
      <Button
        variant="contained"
        sx={{ backgroundColor: "black" }}
        onClick={handleOpen}
      >
        New Firm
      </Button>

      <FirmModal
        open={open}
        handleClose={handleClose}
        info={info}
        setInfo={setInfo}
      />
      <Grid container sx={flex}>
        {firms?.map((firm) => (
          <Grid item key={firm.id}>
            <FirmCard firm={firm} setOpen={setOpen} setInfo={setInfo} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default Firms
