import { Button, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import ProductModal from "../components/modals/ProductModal"
import useStockCall from "../hooks/useStockCall"
import * as React from "react"
import Box from "@mui/material/Box"
import { DataGrid } from "@mui/x-data-grid"

const Products = () => {
  const { getStockData } = useStockCall()
  const { products } = useSelector((state) => state.stock)
  const [open, setOpen] = useState(false)

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
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
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
    },
  ]

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
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
    getStockData("products")
  }, [])

  return (
    <div>
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

      <Box sx={{ width: "100%" }}>
        <DataGrid
          autoHeight
          rows={rows}
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
        />
      </Box>
    </div>
  )
}

export default Products
