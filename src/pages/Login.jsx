import Avatar from "@mui/material/Avatar"
import CssBaseline from "@mui/material/CssBaseline"
import { Link } from "react-router-dom"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme } from "@mui/material/styles"
import { ThemeProvider } from "@emotion/react"
import { Form, Formik } from "formik"
import TextField from "@mui/material/TextField"
import { object, string, number, date, InferType } from "yup"
import { display } from "@mui/system"

const theme = createTheme()
const Login = () => {
  const handleSubmit = () => {}

  const loginSchema = object({
    email: string().email("Yanlış email formatı").required("Email zorunludur"),
    password: string()
      .required("Password Zorunludur")
      .min(8, "Password 8 karakter uzunluğunda olmalıdır")
      .max(30, "Password en fazla 30 karakter uzunluğunda olmalıdır")
      .matches(/\d+/, "Password en az bir sayi içermelidir")
      .matches(/[a-z]/, "Password en az bir küçük harf içermelidir")
      .matches(/[A-Z]/, "Password en az bir büyük harf içermelidir"),
  })
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Grid item xs={12} mb={3}>
          <Typography variant="h3" color="primary" align="center">
            STOCK APP
          </Typography>
        </Grid>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
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
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
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
                  </Box>
                </Form>
              )}
            </Formik>
            {/* <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button> */}
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default Login
