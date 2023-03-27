import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import LoadingButton from "@mui/lab/LoadingButton"
import { Form } from "formik"
import { useSelector } from "react-redux"
import { object, string } from "yup"

export const registerSchema = object({
  username: string()
    .max(10, "Kullanıcı adı 10 karakterden az olmalıdır")
    .required(),
  first_name: string()
    .max(20, "İsim 20 karakterden az olmalıdır.")
    .required("first name is a required field"),
  last_name: string()
    .max(30, "Soyisim 30 karakterden az olmalıdır.")
    .required("last name is a required field"),
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

const RegisterForm = ({
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
}) => {
  const { loading } = useSelector((state) => state?.auth)
  return (
    <Form>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField
          label="Username"
          name="username"
          id="username"
          type="text"
          variant="outlined"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.username}
          error={touched.username && Boolean(errors.username)}
          helperText={touched.username && errors.username}
        />
        <TextField
          label="First Name"
          name="first_name"
          id="firstName"
          type="text"
          variant="outlined"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.first_name}
          error={touched.first_name && Boolean(errors.first_name)}
          helperText={touched.first_name && errors.first_name}
        />
        <TextField
          label="Last Name"
          name="last_name"
          id="lastname"
          type="text"
          variant="outlined"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.last_name}
          error={touched.last_name && Boolean(errors.last_name)}
          helperText={touched.last_name && errors.last_name}
        />
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
        <LoadingButton type="submit" variant="contained" loading={loading}>
          Submit
        </LoadingButton>
      </Box>
    </Form>
  )
}

export default RegisterForm
