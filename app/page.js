"use client";

import { Paper, TextField, Stack, Box, Typography } from "@mui/material";
import { useState } from "react";
import * as XLSX from "xlsx";
import CustomInputTextField from "./components/CustomInputTextField";
import CustomResultTextField from "./components/CustomResultTextField";
import SubmitButton from "./components/SubmitButton";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FlexBox from "./components/FlexBox";

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
    const uniqueVins = new Set();
    return cars.filter((car) => {
      if (!car.vin || uniqueVins.has(car.vin)) {
        return false;
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

  //
  const searchV2 = () => {
    const uniqueCars = removeDuplicateCars(newArray);

    setCarAmount(newArray.length);

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

  const [array, setArray] = useState([]);
  const [newArray, setNewArray] = useState([
    {
      VIN: "",
      Model: "",
      Plate: "",
      Status: "",
      DateTime: "",
    },
  ]);

  return (
    <>
      <Paper elevation={12} sx={{ p: 10 }}>
        <Typography variant="h6" align="center" gutterBottom>
          Kiekis: {carAmount}
        </Typography>
        <Stack>
          <Stack direction={"row"} gap={4}>
            <CustomInputTextField
              value={cars?.vin}
              name="vin"
              label="Fahrgestellnummer"
              placeholder="WAUZZZGY7SA088553 ..."
              onChange={onChange}
            />
            <CustomInputTextField
              value={cars?.model}
              name="model"
              label="Modellname lang"
              placeholder="Audi A3 Limousine PA MK2 ..."
              onChange={onChange}
            />
            <CustomInputTextField
              value={cars.delivery}
              name="delivery"
              label="Versandziel"
              placeholder="DEU 390 B ..."
              onChange={onChange}
            />
            <CustomInputTextField
              value={cars.received}
              name="received"
              label="Feldzuweisung"
              placeholder="10.02.2025 08:02:35 ..."
              onChange={onChange}
            />
            <CustomInputTextField
              value={cars.status}
              name="status"
              label="Būsena"
              placeholder="Išvežta ..."
              onChange={onChange}
            />
          </Stack>
          <FlexBox>
            <SubmitButton
              label={"Filtruoti"}
              icon={<FilterAltIcon />}
              onClick={() => {
                search();
              }}
            />
          </FlexBox>
          <form>
            <TextField
              color="green"
              multiline
              maxRows={10}
              minRows={10}
              fullWidth
              label="Duomenys"
              required
              name="allCars"
              onChange={(e) => {
                setArray(e.target.value);
              }}
            />
            <FlexBox>
              <SubmitButton
                label={"Filtruoti"}
                icon={<FilterAltIcon />}
                onClick={(e) => {
                  e.preventDefault();

                  let rows = array.trim().split("\n");

                  let formattedArray = rows
                    .map((row) => {
                      let columns = row.split("\t");

                      return {
                        vin: columns[0]?.trim() || "",
                        model: columns[1]?.trim() || "",
                        delivery: columns[2]?.trim() || "",
                        received: columns[3]?.trim() || "",
                        status: columns[4]?.trim() || "Ne",
                      };
                    })
                    .filter((item) => item.VIN !== "");

                  setNewArray([...formattedArray]);

                  searchV2();
                }}
              />
            </FlexBox>
          </form>
        </Stack>
      </Paper>
      <Paper elevation={12} sx={{ p: 10 }}>
        <Typography variant="h6" align="center" gutterBottom>
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
        <FlexBox>
          <SubmitButton
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="#FFFFFF"
              >
                <path d="M 12 3 L 2 5 L 2 19 L 12 21 L 12 3 z M 14 5 L 14 7 L 16 7 L 16 9 L 14 9 L 14 11 L 16 11 L 16 13 L 14 13 L 14 15 L 16 15 L 16 17 L 14 17 L 14 19 L 21 19 C 21.552 19 22 18.552 22 18 L 22 6 C 22 5.448 21.552 5 21 5 L 14 5 z M 18 7 L 20 7 L 20 9 L 18 9 L 18 7 z M 4.1757812 8.296875 L 5.953125 8.296875 L 6.8769531 10.511719 C 6.9519531 10.692719 7.0084063 10.902625 7.0664062 11.140625 L 7.0917969 11.140625 C 7.1247969 10.997625 7.1919688 10.779141 7.2929688 10.494141 L 8.3222656 8.296875 L 9.9433594 8.296875 L 8.0078125 11.966797 L 10 15.703125 L 8.2714844 15.703125 L 7.1582031 13.289062 C 7.1162031 13.204062 7.0663906 13.032922 7.0253906 12.794922 L 7.0097656 12.794922 C 6.9847656 12.908922 6.934375 13.079594 6.859375 13.308594 L 5.7363281 15.703125 L 4 15.703125 L 6.0605469 11.996094 L 4.1757812 8.296875 z M 18 11 L 20 11 L 20 13 L 18 13 L 18 11 z M 18 15 L 20 15 L 20 17 L 18 17 L 18 15 z"></path>
              </svg>
            }
            label={"Eksportuoti"}
            onClick={() => {
              const today = new Date().toLocaleDateString();
              console.log(today);

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

              XLSX.writeFile(workbook, `${today}.xlsx`, {
                compression: true,
              });
            }}
          />
        </FlexBox>
      </Paper>
    </>
  );
}
