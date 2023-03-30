import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import { modalStyle } from "../../styles/globalStyle"
import TextField from "@mui/material/TextField"
import { Button, createTheme } from "@mui/material"
import { blueGrey, grey } from "@mui/material/colors"
import { ThemeProvider } from "@emotion/react"
import useStockCall from "../../hooks/useStockCall"

export default function ProductModal({ open, handleClose, info, setInfo }) {
  const theme = createTheme({
    palette: {
      primary: {
        main: grey["900"],
      },
      secondary: {
        main: blueGrey["900"],
      },
    },
  })

  const { postStockData, putStockData } = useStockCall()

  const handleChange = (e) => {
    const { name, value } = e.target
    setInfo({ ...info, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    info.id ? putStockData("products", info) : postStockData("products", info)
    handleClose()
    setInfo("")
  }

  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={open}
        onClose={() => {
          handleClose()
          setInfo({})
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            New Firm
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              marginTop: "1rem",
            }}
            component="form"
            onSubmit={handleSubmit}
          >
            <TextField
              label="Firm Name"
              name="name"
              id="name"
              type="text"
              variant="outlined"
              value={info?.name}
              required
              onChange={handleChange}
            />
            <TextField
              label="Address"
              name="address"
              id="address"
              type="text"
              variant="outlined"
              required
              value={info?.address}
              onChange={handleChange}
            />
            <TextField
              label="Firm Image URL"
              name="image"
              id="image"
              type="url"
              variant="outlined"
              required
              value={info?.image}
              onChange={handleChange}
            />
            <TextField
              label="Phone"
              name="phone"
              id="phone"
              type="tel"
              variant="outlined"
              required
              value={info?.phone}
              onChange={handleChange}
            />
            <Button type="submit" variant="contained">
              Submit Firm
            </Button>
          </Box>
        </Box>
      </Modal>
    </ThemeProvider>
  )
}
