"use client";

import { Paper, TextField, Button, Stack } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [vins, setVins] = useState([]);
  const [result, setResult] = useState();

  const onChange = (e) => {
    const { value } = e.target;

    setVins(value);
  };

  const search = () => {
    const currentVins = vins.split("\n");

    console.log(currentVins);

    const duplicateVins = currentVins.filter((vin, index) => {
      return currentVins.indexOf(vin) != index;
    });

    const duplicateVinsSet = new Set(duplicateVins);
    const duplicateArray = Array.from(duplicateVinsSet);

    setResult(duplicateArray);
  };

  return (
    <>
      <Paper elevation={12} sx={{ p: 10 }}>
        <Stack>
          <TextField
            value={vins}
            name="vins"
            label="Įveskite vin numerių sąrašą"
            placeholder="WAUZZZGY7SA088553 WAUZZZGY9SA088456 WAUZZZGY1SA083204"
            minRows={10}
            maxRows={20}
            multiline
            helperText="* Kiekvienas vin numeris turi būti atskirtas vienu tarpu"
            required
            onChange={onChange}
          ></TextField>
          <Button
            variant="contained"
            color="success"
            sx={{ p: 2 }}
            onClick={search}
          >
            Ieškoti
          </Button>
        </Stack>
      </Paper>
      <Paper elevation={12} sx={{ p: 10 }}>
        <Stack>
          <TextField value={result} minRows={10} multiline disabled></TextField>
        </Stack>
      </Paper>
    </>
  );
}
