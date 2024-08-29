import { useFormik } from "formik";
import * as Yup from "yup";
import CustomSelect from "./CustomSelect";

function FormikHookExample() {
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid email"),
    job: Yup.string().required("Job is required."),
  });
  const initialValues = {
    email: "",
    job: "",
    descriptions: "",
  };
  const onSubmit = (values) => {
    console.log(values);
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  const option = [
    {
      value: "developer",
      label: "Software Developer",
    },
    {
      value: "chef",
      label: "Chef",
    },
    {
      value: "painter",
      label: "Painter",
    },
  ];
  return (
    <>
      <h2 className="text-3xl mb-4">Select and formik hook example</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-2 flex flex-col">
          <label className="text-lg" htmlFor="email">
            Email
          </label>
          <input
            className=" border-2 rounded-sm p-1"
            placeholder="Email here"
            type="email"
            name="email"
            // value={formik.values.email}
            // onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
            {...formik.getFieldProps("email")}
          />
          {formik.errors.email && formik.touched.email && (
            <p className=" text-red-600 "> {formik.errors.email}</p>
          )}
        </div>
        <div className="mb-2">
          <CustomSelect
            onChange={(value) => formik.setFieldValue("job", value)}
            value={formik.values.job}
            options={option}
            onBlur={formik.handleBlur}
          />
          {formik.errors.job && (
            <p className=" text-red-600 "> {formik.errors.job}</p>
          )}
        </div>
        <div className="mb-2"></div>
        <div className="mb-2">
          <button className=" bg-lime-600 text-white rounded-md " type="submit">
            Sublit
          </button>
        </div>
      </form>
    </>
  );
}

export default FormikHookExample;
