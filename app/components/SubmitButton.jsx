import { Button } from "@mui/material";

const SubmitButton = ({ label, onClick, icon }) => {
  return (
    <Button
      type="submit"
      variant="contained"
      color="success"
      size="large"
      startIcon={icon}
      endIcon={icon}
      sx={{ p: 2, m: 2 }}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default SubmitButton;
