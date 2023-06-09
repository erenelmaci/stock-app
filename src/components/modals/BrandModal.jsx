import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import { modalStyle } from "../../styles/globalStyle"
import TextField from "@mui/material/TextField"
import { Button, createTheme } from "@mui/material"
import { blueGrey, grey } from "@mui/material/colors"
import { ThemeProvider } from "@emotion/react"
import useStockCall from "../../hooks/useStockCall"

export default function BrandModal({ open, handleClose, info, setInfo }) {
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
    e.preventDefault()
    const { name, value } = e.target
    setInfo({ ...info, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    info.id ? putStockData("brands", info) : postStockData("brands", info)
    handleClose()
    setInfo({})
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
            New Brand
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              marginTop: "1rem",
            }}
            onSubmit={handleSubmit}
            component="form"
          >
            <TextField
              label="Brand Name"
              name="name"
              id="name"
              type="text"
              variant="outlined"
              value={info?.name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Firm Image URL"
              name="image"
              id="image"
              type="url"
              variant="outlined"
              value={info?.image}
              onChange={handleChange}
              required
            />
            <Button type="submit" variant="contained">
              Submit Brand
            </Button>
          </Box>
        </Box>
      </Modal>
    </ThemeProvider>
  )
}
