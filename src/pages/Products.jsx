import { Button, createTheme, ThemeProvider, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import ProductModal from "../components/modals/ProductModal"
import useStockCall from "../hooks/useStockCall"
import * as React from "react"
import Box from "@mui/material/Box"
import {
  DataGrid,
  GridActionsCellItem,
  GridDeleteIcon,
  GridToolbar,
} from "@mui/x-data-grid"
import { btnStyle } from "../styles/globalStyle"
import { blueGrey, grey } from "@mui/material/colors"

const Products = () => {
  const { getStockData, deleteStockData } = useStockCall()
  const { products } = useSelector((state) => state.stock)
  const [open, setOpen] = useState(false)

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

  const columns = [
    {
      field: "id",
      headerName: "#",
      minWidth: 40,
      maxWidth: 70,
      flex: 0.1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "category",
      headerName: "Category",
      headerAlign: "center",
      align: "center",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "brand",
      headerName: "Brand",
      headerAlign: "center",
      align: "center",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      headerAlign: "center",
      align: "center",
      type: "number",
      minWidth: 110,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stok",
      description: "This column has a value getter and is not sortable.",
      headerAlign: "center",
      align: "center",
      sortable: false,
      minWidth: 160,
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      description: "This column has a value getter and is not sortable.",
      headerAlign: "center",
      align: "center",
      sortable: false,
      minWidth: 160,
      flex: 1,
      renderCell: ({ id }) => (
        <GridActionsCellItem
          sx={btnStyle}
          icon={<GridDeleteIcon />}
          label="Delete"
          onClick={() => deleteStockData("products", id)}
        />
      ),
    },
  ]
  const [info, setInfo] = useState({
    name: "",
    phone: "",
    address: "",
    image: "",
  })

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    const fetchData = async () => {
      await getStockData("products")
      await getStockData("categories")
      await getStockData("brands")
    }
    fetchData()
  }, []) // eslint-disable-line

  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h4" color="error" mb={3}>
        Products
      </Typography>
      <Button
        variant="contained"
        sx={{ backgroundColor: "black" }}
        onClick={handleOpen}
      >
        New Product
      </Button>

      <ProductModal
        open={open}
        handleClose={handleClose}
        info={info}
        setInfo={setInfo}
      />

      <Box sx={{ width: "100%", marginTop: "2rem" }}>
        <DataGrid
          autoHeight
          rows={products}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }}
        />
      </Box>
    </ThemeProvider>
  )
}

export default Products
