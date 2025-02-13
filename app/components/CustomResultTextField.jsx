import { TextField } from "@mui/material";

const CustomResultTextField = ({ label, value }) => {
  return (
    <TextField
      variant="filled"
      fullWidth
      label={label}
      value={value}
      minRows={15}
      maxRows={15}
      multiline
      disabled
    ></TextField>
  );
};

export default CustomResultTextField;
