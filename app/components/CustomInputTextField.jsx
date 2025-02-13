import { TextField } from "@mui/material";

const CustomInputTextField = ({
  value,
  name,
  label,
  placeholder,
  onChange,
}) => {
  return (
    <TextField
      value={value}
      name={name}
      label={label}
      placeholder={placeholder}
      onChange={onChange}
      minRows={10}
      maxRows={10}
      multiline
      helperText="* Kiekvieną įrašą atskirkite paspausdami Enter."
      required
      color="success"
      fullWidth
    ></TextField>
  );
};

export default CustomInputTextField;
