"use client";

import {
  Paper,
  TextField,
  Button,
  Stack,
  Box,
  Typography,
} from "@mui/material";
import { useState } from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const CustomTextField = ({ value, name, label, placeholder, onChange }) => {
  return (
    <TextField
      value={value}
      name={name}
      label={label}
      placeholder={placeholder}
      minRows={10}
      maxRows={15}
      multiline
      helperText="* Kiekvieną įrašą atskirkite paspausdami Enter."
      required
      onChange={onChange}
      color="success"
    ></TextField>
  );
};

const CustomResultTextField = ({ label, value }) => {
  return (
    <TextField
      fullWidth
      label={label}
      value={value}
      minRows={10}
      maxRows={15}
      multiline
      disabled
    ></TextField>
  );
};

export default function Home() {
  const [cars, setCars] = useState({
    vin: "",
    model: "",
    delivery: "",
    received: "",
    status: "",
  });

  const [newCars, setNewCars] = useState({
    vin: "",
    model: "",
    delivery: "",
    received: "",
    status: "",
  });

  const [carAmount, setCarAmount] = useState(0);
  const [resultAmount, setResultAmount] = useState(0);

  const onChange = (e) => {
    const { name, value } = e.target;

    setCars({
      ...cars,
      [name]: value,
    });
  };

  const excelHeader = [
    "Fahrgestellnummer",
    "Modellname lang",
    "Versandziel",
    "Feldzuweisung",
    "Būsena",
  ];

  const [result, setResult] = useState({
    vin: "",
    model: "",
    delivery: "",
    received: "",
    status: "",
  });

  const [tempResult, setTempResult] = useState({
    vin: "",
    model: "",
    delivery: "",
    received: "",
    status: "",
  });

  const removeDuplicateCars = (cars) => {
    const uniqueVins = new Set(); // Store unique VINs
    return cars.filter((car) => {
      if (!car.vin || uniqueVins.has(car.vin)) {
        return false; // Skip duplicates and empty VINs
      }
      uniqueVins.add(car.vin);
      return true;
    });
  };

  const search = () => {
    const vin = cars.vin.split("\n");
    const model = cars.model.split("\n");
    const delivery = cars.delivery.split("\n");
    const received = cars.received.split("\n");
    const status = cars.status.split("\n");

    const newCars = [{}];
    for (let i = 0; i < vin.length; i++) {
      newCars[i] = {
        vin: vin[i],
        model: model[i],
        delivery: delivery[i],
        received: received[i],
        status: status[i],
      };
    }

    // setNewCars({
    //   ...newCars,
    // });

    setNewCars([...newCars]);

    const uniqueCars = removeDuplicateCars(newCars);

    setCarAmount(newCars.length);

    const isExported = uniqueCars.filter((car) => {
      return car.status.toLowerCase() == "ne" || !car.status;
    });

    setResult(isExported);

    setTempResult(isExported);

    var v = "";
    var m = "";
    var d = "";
    var r = "";
    var s = "";

    for (let i = 0; i < isExported.length; i++) {
      v += isExported[i].vin + "\n";
      m += isExported[i].model + "\n";
      d += isExported[i].delivery + "\n";
      r += isExported[i].received + "\n";
      s += isExported[i].status + "\n";
    }

    setResult({
      ...result,
      vin: v,
      model: m,
      delivery: d,
      received: r,
      status: s,
    });

    setResultAmount(isExported.length);
  };

  return (
    <>
      <Paper elevation={12} sx={{ p: 10 }}>
        <Typography variant="h4" align="center">
          Pradiniai duomenys
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          Kiekis: {carAmount}
        </Typography>
        <Stack>
          <Stack direction={"row"} gap={4}>
            <CustomTextField
              value={cars?.vin}
              name="vin"
              label="Fahrgestellnummer"
              placeholder="WAUZZZGY7SA088553 ..."
              onChange={onChange}
            />
            <CustomTextField
              value={cars?.model}
              name="model"
              label="Modellname lang"
              placeholder="Audi A3 Limousine PA MK2 ..."
              onChange={onChange}
            />
            <CustomTextField
              value={cars.delivery}
              name="delivery"
              label="Versandziel"
              placeholder="DEU 390 B ..."
              onChange={onChange}
            />
            <CustomTextField
              value={cars.received}
              name="received"
              label="Feldzuweisung"
              placeholder="10.02.2025 08:02:35 ..."
              onChange={onChange}
            />
            <CustomTextField
              value={cars.status}
              name="status"
              label="Būsena"
              placeholder="Išvežta ..."
              onChange={onChange}
            />
          </Stack>
          <Box
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Button
              variant="contained"
              color="success"
              sx={{
                p: 4,
                m: 4,
                width: "50%",
              }}
              onClick={() => {
                search();
              }}
            >
              Filtruoti
            </Button>
          </Box>
        </Stack>
      </Paper>
      <Paper elevation={12} sx={{ p: 10 }}>
        <Typography variant="h4" align="center">
          Filtruoti duomenys
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          Kiekis: {resultAmount}
        </Typography>
        <Stack direction={"row"} gap={4}>
          <CustomResultTextField label="Fahrgestellnummer" value={result.vin} />
          <CustomResultTextField label="Modellname lang" value={result.model} />
          <CustomResultTextField label="Versandziel" value={result.delivery} />
          <CustomResultTextField
            label="Feldzuweisung"
            value={result.received}
          />
          <CustomResultTextField label="Būsena" value={result.status} />
        </Stack>
        <Button
          disabled={resultAmount == 0}
          variant="contained"
          color="success"
          sx={{ p: 2, m: 2 }}
          type="button"
          id="exportExcel"
          onClick={async () => {
            console.log(result);

            const worksheet = XLSX.utils.json_to_sheet(tempResult);
            const workbook = XLSX.utils.book_new();

            XLSX.utils.book_append_sheet(workbook, worksheet, "sheet");

            XLSX.utils.sheet_add_aoa(worksheet, [excelHeader], {
              origin: "A1",
            });

            let wscols = [];
            excelHeader.map((arr) => {
              wscols.push({ wch: arr.length + 5 });
            });
            worksheet["!cols"] = wscols;

            XLSX.writeFile(workbook, "2025.xlsx", {
              compression: true,
            });
          }}
        >
          Eksportuoti
        </Button>
      </Paper>
    </>
  );
}
