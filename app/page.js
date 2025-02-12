"use client";

import { Typography, Paper, TextField, Button } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const vin = [];
  const [text, setText] = useState("");

  return (
    <>
      <Paper elevation={12}>
        {/* <Typography variant="h2">VIN</Typography> */}
        <TextField label="VIN" placeholder="WAUZZZFU8SN018678"></TextField>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            setText("loooooooool");
          }}
        >
          Ieškoti
        </Button>
      </Paper>
      <h1>{text}</h1>
      {/* <label>VIN: </label>
      <textarea placeholder="WAUZZZFU8SN018678" rows={10} />
      <button>Submit</button>
      <textarea placeholder="WAUZZZFU8SN018678" rows={10} /> */}
    </>
  );
}
