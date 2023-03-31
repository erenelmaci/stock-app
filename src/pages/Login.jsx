import Avatar from "@mui/material/Avatar"
import { Link } from "react-router-dom"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockIcon from "@mui/icons-material/Lock"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme } from "@mui/material/styles"
import { ThemeProvider } from "@emotion/react"
import { Formik } from "formik"
import image from "../assets/result.svg"
import { blueGrey, grey } from "@mui/material/colors"
import useAuthCall from "../hooks/useAuthCall"
import LoginForm, { loginSchema } from "../components/LoginForm"


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

const Login = () => {
  const { login } = useAuthCall()

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Grid
          container
          justifyContent="center"
          direction="row"
          sx={{
            p: 2,
          }}
        >
          <Grid item xs={12} mb={3}>
            <Typography variant="h3" color="primary" align="center">
              STOCK APP
            </Typography>
          </Grid>
        </Grid>

        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row-reverse" },
              justifyContent: { xs: "center", md: "space-between" },
              mt: 8,
            }}
          >
            <Box sx={{ width: "50%" }}>
              <Avatar
                sx={{
                  backgroundColor: "secondary.light",
                  m: "auto",
                }}
              >
                <LockIcon size="30" />
              </Avatar>
              <Typography
                variant="h4"
                align="center"
                mb={4}
                color="secondary.light"
              >
                Login
              </Typography>
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={loginSchema}
                onSubmit={(values, actions) => {
                  login(values)
                  actions.resetForm()
                  actions.setSubmitting(false)
                }}
                component={(props) => <LoginForm {...props} />}
              ></Formik>

              <Grid sx={{ mt: "1rem", textAlign: "center" }}>
                <Grid item>
                  <Link to="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Grid width={"30rem"} item xs={10} sm={7} md={6}>
                <Container>
                  <img src={image} alt="img" />
                </Container>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default Login
