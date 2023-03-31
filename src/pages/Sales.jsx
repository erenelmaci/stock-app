import { Button, createTheme, ThemeProvider, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import useStockCall from "../hooks/useStockCall"
import Box from "@mui/material/Box"
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid"
import DeleteIcon from "@mui/icons-material/Delete"
import { btnStyle } from "../styles/globalStyle"
import { blueGrey, grey } from "@mui/material/colors"
import EditIcon from "@mui/icons-material/Edit"
import SaleModal from "../components/modals/SaleModal"
import { getProCatBrandSuccess } from "../features/stockSlice"

const Sales = () => {
  const { getStockData, deleteStockData } = useStockCall()
  const { sales } = useSelector((state) => state.stock)
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
  const [info, setInfo] = useState({
    brand_id: "",
    product_id: "",
    quantity: "",
    price: "",
  })

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    getProCatBrandSuccess()
    getStockData("sales")
  }, [])

  const columns = [
    {
      field: "createds",
      headerName: "Date",
      minWidth: 50,
      maxWidth: 100 ,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "brand",
      headerName: "Brand",
      flex: 1,
      minWidth: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "product",
      headerName: "Product",
      flex: 1,
      minWidth: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "quantity",
      headerName: "Quantity",
      minWidth: 50,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 50,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "price_total",
      headerName: "Amount",
      minWidth: 50,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 40,
      headerAlign: "center",
      align: "center",
      renderCell: ({ id, row: { brand_id, product_id, quantity, price } }) => {
        return [
          <GridActionsCellItem
            key={"edit"}
            icon={<EditIcon />}
            label="Edit"
            onClick={() => {
              setOpen(true)
              setInfo({ id, brand_id, product_id, quantity, price })
            }}
            sx={btnStyle}
          />,
          <GridActionsCellItem
            key={"delete"}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => deleteStockData("sales", id)}
            sx={btnStyle}
          />,
        ]
      },
    },
  ]

  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h4" color="error" mb={3}>
        Sales
      </Typography>
      <Button
        variant="contained"
        sx={{ backgroundColor: "black" }}
        onClick={handleOpen}
      >
        New Sale
      </Button>

      <SaleModal
        open={open}
        handleClose={handleClose}
        info={info}
        setInfo={setInfo}
      />

      <Box sx={{ width: "100%", marginTop: "2rem" }}>
        <DataGrid
          autoHeight
          rows={sales}
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

export default Sales
