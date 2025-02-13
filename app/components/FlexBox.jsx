import { Box } from "@mui/material";

const FlexBox = ({ children }) => {
  return (
    <Box
      width={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {children}
    </Box>
  );
};

export default FlexBox;
