import Avatar from "@mui/material/Avatar"
import { Link, useNavigate } from "react-router-dom"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockIcon from "@mui/icons-material/Lock"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme } from "@mui/material/styles"
import { ThemeProvider } from "@emotion/react"
import { Formik } from "formik"
import { useSelector } from "react-redux"
import image from "../assets/result.svg"
import { blueGrey, grey } from "@mui/material/colors"
import useAuthCall from "../hooks/useAuthCall"
import RegisterForm, { registerSchema } from "../components/RegisterForm"

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

const Register = () => {
  const navigate = useNavigate()
  const { currentUser, error } = useSelector((state) => state?.auth)

  const { register } = useAuthCall()

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
                initialValues={{
                  username: "",
                  first_name: "",
                  last_name: "",
                  email: "",
                  password: "",
                }}
                validationSchema={registerSchema}
                onSubmit={(values, actions) => {
                  register({ ...values, password2: values.password })
                  actions.resetForm()
                  actions.setSubmitting(false)
                }}
                component={(props) => <RegisterForm {...props} />}
              ></Formik>

              <Grid sx={{ mt: "1rem", textAlign: "center" }}>
                <Grid item>
                  <Link to="/" variant="body2">
                    {"Do you already have an account"}
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

export default Register
