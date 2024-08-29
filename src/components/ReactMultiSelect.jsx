import Select from "react-select";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
const ReactMultiSelect = (props) => {
  const { label, name, options, ...rest } = props;
  const isMulti = false;
const getValue = (val) => {
  if (options) {
    return isMulti
      ? options.filter((option) => val.indexOf(option.value) >= 0)
      : options.find((option) => option.value === val);
  } else {
    return isMulti ? [] : "";
  }
};
  return (
    <div className="mt-2 flex flex-col">
      <label htmlFor={name}>{label}</label>
      <Field name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          
          return (
            <Select
              id={name}
              options={options}
              isMulti={true}
              {...field}
              {...rest}
              value={getValue(value)}
              onChange={(val) =>
                setFieldValue(
                  "color",
                  options ? options.map((item) => item.value) : []
                )
              }
            />
          );
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default ReactMultiSelect;
