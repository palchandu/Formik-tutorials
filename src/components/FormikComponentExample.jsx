/* eslint-disable react/prop-types */
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import TextError from "./TextError";
import DatePicker from "./DatePicker";
import ReactSelect from "./ReactSelect";
import NewCustomSelect from "./NewCustomSelect";
const FormikComponentExample = () => {
  const initialValues = {
    email: "",
    name: "",
    message: "",
    address: "",
    phoneNumber: ["", ""],
    emails: [""],
      birthDate: null,
      flavour: "",
    color:[""]
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid email"),
    name: Yup.string().required("Name is required."),
    message: Yup.string().required("Message is required."),
    address: Yup.string().required("Address is required."),
      birthDate: Yup.date().required("Required").nullable(),
    flavour:Yup.string().required("Required")
  });
  const onSubmit = (values) => {
    console.log(values);
  };

  const primaryNumberValidate = (value) => {
    let error;
    if (!value) {
      error = "Required";
    }
    return error;
  };
  function handleAvailable(formik) {
    const available = false;
    if (!available) {
      console.log("fffr", formik);
      formik.setFieldTouched("email");
      formik.setFieldError("email", "Email Already Exists");
    } else {
      formik.setFieldTouched("email", false);
      formik.setFieldError("email", "");
    }
  }
    const optionsFlavour = [
      { value: "chocolate", label: "Chocolate" },
      { value: "strawberry", label: "Strawberry" },
      { value: "vanilla", label: "Vanilla" },
    ];
    const optionsColor = [
      { value: "red", label: "Red" },
      { value: "orange", label: "Orange" },
      { value: "yellow", label: "yellow" },
      { value: "green", label: "Green" },
      { value: "blue", label: "Blue" },
      { value: "indigo", label: "Indigo" },
      { value: "voilet", label: "Voilet" },
    ];
  return (
    <div>
      <h2>Formik components</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {(formik) => {
          console.log("formik", formik);
          return (
            <Form>
              <div className="mb-2 flex flex-col">
                <label className="text-lg" htmlFor="email">
                  Email
                </label>
                <div className="flex gap-2">
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter email"
                    className="border-2 rounded-sm p-1"
                  />
                  <button
                    className="mt-1 border-2 bg-green-500 text-white w-22 h-8 text-[12px]"
                    onClick={() => {
                      handleAvailable(formik);
                    }}
                    type="button"
                  >
                    Availability
                  </button>
                </div>

                <div className=" text-red-600 ">
                  <ErrorMessage name="email" component={TextError} />
                </div>
              </div>
              <div className="mb-2 flex flex-col">
                <label className="text-lg" htmlFor="name">
                  Name
                </label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter name"
                  className="border-2 rounded-sm p-1"
                />
                <ErrorMessage name="name">
                  {(errorMsg) => <div className="text-red-600">{errorMsg}</div>}
                </ErrorMessage>
              </div>
              <div className="mb-2 flex flex-col">
                <label className="text-lg" htmlFor="message">
                  Message
                </label>
                <Field
                  name="message"
                  id="message"
                  placeholder="Your Message"
                  className="border-2 rounded-sm p-1"
                  component="textarea"
                />
                <div className=" text-red-600 ">
                  <ErrorMessage name="message" />
                </div>
              </div>
              <div className="mb-2 flex flex-col">
                <label htmlFor="address">Address</label>
                <Field name="address" id="address">
                  {(props) => {
                    //  console.log("Render Props", props);
                    const { field, form, meta } = props;
                    // console.log("form", form);
                    // console.log("field", field);
                    // console.log("meta", meta);
                    return (
                      <div>
                        <input
                          type="text"
                          id="address"
                          className=" border-2 rounded-sm p-1"
                          {...field}
                        />
                        {meta.touched && meta.error ? (
                          <div className=" text-red-600 ">{meta.error}</div>
                        ) : null}
                      </div>
                    );
                  }}
                </Field>
              </div>
              <div className="mb-2 flex flex-col">
                <label htmlFor="numbers">Primary Phone Numbers</label>
                <Field
                  type="text"
                  name="phoneNumber[0]"
                  id="primaryPhoneNumber"
                  className=" border-2 rounded-sm p-1"
                  validate={primaryNumberValidate}
                />
                <ErrorMessage name="phoneNumber[0]" component={TextError} />
              </div>
              <div className="mb-2 flex flex-col">
                <label htmlFor="numbers">Secondary Phone Numbers</label>
                <Field
                  type="text"
                  name="phoneNumber[1]"
                  id="primaryPhoneNumber"
                  className=" border-2 rounded-sm p-1"
                />
              </div>
              <div className="mb-2 flex flex-col">
                <label htmlFor="numbers">Email List</label>
                <FieldArray name="emails">
                  {(fieldArrayProps) => {
                    //console.log("aFieldArray", fieldArrayProps);
                    const { form, push, remove } = fieldArrayProps;
                    const { values } = form;
                    const { emails } = values;
                    return (
                      <div>
                        {emails.map((nemail, index) => (
                          <div key={index}>
                            <Field
                              className=" border-2 rounded-sm p-1"
                              name={`emails[${index}]`}
                            />
                            <button type="button" onClick={() => push("")}>
                              +
                            </button>
                            {index > 0 && (
                              <button
                                type="button"
                                onClick={() => remove(index)}
                              >
                                -
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    );
                  }}
                </FieldArray>
              </div>
              <div className="mt-2">
                <DatePicker label="Select DOB" name="birthDate" />
              </div>
              <div className="mt-2">
                <ReactSelect
                  label="Select Flavour"
                  name="flavour"
                  options={optionsFlavour}
                />
              </div>
              <div className="mt-2">
                <Field
                  className="custom-select"
                  name="color"
                  options={optionsColor}
                  component={NewCustomSelect}
                  placeholder="Select multi languages..."
                  isMulti={true}
                />
              </div>
              <div className="mb-2 flex flex-col">
                <button
                  className=" bg-lime-600 text-white rounded-md "
                  type="submit"
                >
                  Sublit
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default FormikComponentExample;
