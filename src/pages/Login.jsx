import Avatar from "@mui/material/Avatar"
import { Link, useNavigate } from "react-router-dom"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockIcon from "@mui/icons-material/Lock"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme } from "@mui/material/styles"
import { ThemeProvider } from "@emotion/react"
import { Form, Formik } from "formik"
import TextField from "@mui/material/TextField"
import { object, string } from "yup"
import LoadingButton from "@mui/lab/LoadingButton"
import { useSelector } from "react-redux"
import image from "../assets/result.svg"
import { blueGrey, grey } from "@mui/material/colors"

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
  const navigate = useNavigate()
  const { currentUser, error, loading } = useSelector((state) => state?.auth)

  const loginSchema = object({
    email: string().email("Yanlış email formatı").required("Email zorunludur"),
    password: string()
      .required("Password Zorunludur")
      .min(8, "Password 8 karakter uzunluğunda olmalıdır")
      .max(30, "Password en fazla 30 karakter uzunluğunda olmalıdır")
      .matches(/\d+/, "Password en az bir sayi içermelidir")
      .matches(/[a-z]/, "Password en az bir küçük harf içermelidir")
      .matches(/[A-Z]/, "Password en az bir büyük harf içermelidir")
      .matches(
        /[!,?{}<>%&$#£+-.]/,
        "Password en az bir özel karakter içermelidir"
      ),
  })
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
                  actions.resetForm()
                  actions.setSubmitting(false)
                }}
              >
                {({ values, handleChange, handleBlur, errors, touched }) => (
                  <Form>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                      }}
                    >
                      <TextField
                        label="Email"
                        name="email"
                        id="email"
                        type="email"
                        variant="outlined"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values?.email || ""}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                      />
                      <TextField
                        label="Password"
                        name="password"
                        id="password"
                        type="password"
                        variant="outlined"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values?.password || ""}
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                      />
                      <LoadingButton
                        type="submit"
                        variant="contained"
                        loading={loading}
                      >
                        Submit
                      </LoadingButton>
                    </Box>
                  </Form>
                )}
              </Formik>
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
