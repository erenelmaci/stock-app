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
import { getProCatBrandSuccess } from "../features/stockSlice"
import PurchaseModal from "../components/modals/PurchaseModal"

const Purchases = () => {
  const { getStockData, deleteStockData } = useStockCall()
  const { purchases } = useSelector((state) => state.stock)
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
    firm_id: "",
    brand_id: "",
    product_id: "",
    quantity: "",
    price: "",
  })

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    const fetchData = async () => {
      getProCatBrandSuccess()
      getStockData("purchases")
      getStockData("products")
      getStockData("categories")
      getStockData("brands")
      getStockData("firms")
    }
    fetchData()
  }, []) // eslint-disable-line

  const columns = [
    {
      field: "createds",
      headerName: "Date",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "firm",
      headerName: "Firm",
      flex: 1,
      minWidth: 100,
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
      renderCell: ({
        id,
        row: { brand_id, product_id, quantity, price, firm_id },
      }) => {
        return [
          <GridActionsCellItem
            key={"edit"}
            icon={<EditIcon />}
            label="Edit"
            onClick={() => {
              setOpen(true)
              setInfo({ id, firm_id, brand_id, product_id, quantity, price })
            }}
            sx={btnStyle}
          />,
          <GridActionsCellItem
            key={"delete"}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => deleteStockData("purchases", id)}
            sx={btnStyle}
          />,
        ]
      },
    },
  ]

  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h4" color="error" mb={3}>
        Purchases
      </Typography>
      <Button
        variant="contained"
        sx={{ backgroundColor: "black" }}
        onClick={handleOpen}
      >
        New Purchases
      </Button>

      <PurchaseModal
        open={open}
        handleClose={handleClose}
        info={info}
        setInfo={setInfo}
      />

      <Box sx={{ maxWidth: "100%", marginTop: "2rem" }}>
        <DataGrid
          autoHeight
          rows={purchases}
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

export default Purchases
