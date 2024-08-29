import Select from "react-select";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
const ReactSelect = (props) => {
  // eslint-disable-next-line react/prop-types
  const { label, name, options, ...rest } = props;

  return (
    <div className="mt-2 flex flex-col">
      <label htmlFor={name}>{label}</label>
      <Field name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          console.log("vvv", value);
          return (
            <Select
              id={name}
              options={options}
              {...field}
              {...rest}
              value={value.value}
              onChange={(val) => setFieldValue("flavour", val.value)}
            />
          );
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default ReactSelect;
