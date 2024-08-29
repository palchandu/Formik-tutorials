/* eslint-disable react/prop-types */
import Select from "react-select";
const CustomSelect = ({ onChange, options, value, onBlur, className }) => {
  const defaultValue = (options, value) => {
    return options ? options?.find((options) => options.value === value) : "";
  };
  return (
    <div className={className}>
      <Select
        options={options}
        onChange={value=>onChange(value.value)}
        value={defaultValue(options, value)}
        onBlur={onBlur}
      />
    </div>
  );
};

export default CustomSelect;
