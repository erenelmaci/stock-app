import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import { modalStyle } from "../../styles/globalStyle"
import TextField from "@mui/material/TextField"
import { Button, createTheme } from "@mui/material"
import { blueGrey, grey } from "@mui/material/colors"
import { ThemeProvider } from "@emotion/react"
import useStockCall from "../../hooks/useStockCall"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import { useSelector } from "react-redux"

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

  const { postStockData } = useStockCall()
  const { categories } = useSelector((state) => state.stock)

  const handleChange = (e) => {
    const { name, value } = e.target
    setInfo({ ...info, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
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
            New Products
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
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="category-label">Categories</InputLabel>
                <Select
                  labelId="category"
                  id="category"
                  // value={age}
                  label="Category"
                  onChange={handleChange}
                >
                  {categories?.map(({name}) => (
                    <MenuItem value={10}>{name}</MenuItem>
                  ))}
                  
                </Select>
              </FormControl>
            </Box>
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
            <Button type="submit" variant="contained">
              Submit Firm
            </Button>
          </Box>
        </Box>
      </Modal>
    </ThemeProvider>
  )
}
