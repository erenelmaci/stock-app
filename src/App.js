import { ThemeProvider } from "@emotion/react"
import { blueGrey, grey } from "@mui/material/colors"
import { createTheme } from "@mui/system"
import { Provider } from "react-redux"
import "./App.css"
import AppRouter from "./router/AppRouter"
import store from "./app/store"
import {ToastContainer} from "react-toastify"

function App() {
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
  return (
    <>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <AppRouter />
          <ToastContainer />
        </Provider>
      </ThemeProvider>
    </>
  )
}

export default App
