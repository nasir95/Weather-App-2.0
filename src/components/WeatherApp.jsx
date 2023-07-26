import React, { useState } from "react";
import {
  Paper,
  Box,
  TextField,
  Typography,
  Grid,
  Divider,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import moment from "moment/moment";
import axios from "axios";

function WeatherApp() {
  const [data, setData] = useState({});
  const [forecastData, setForecastData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [val, setVal] = useState("New York, NY, US");
  const [firstDay, setFirstDay] = useState();
  const [secondDay, setSecondDay] = useState();
  const [thirdDay, setThirdDay] = useState();
  const [fourthDay, setFourthDay] = useState();
  const [fifthDay, setFifthDay] = useState();
  const apiKey = process.env.REACT_APP_API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${val}&units=imperial&appid=${apiKey}`;
  const forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${val}&units=imperial&appid=${apiKey}`;

  const getDefault = () => {
    if (val === "New York, NY, US") {
      axios.get(url).then((res) => {
        setData(res.data);
        // console.log(res.data);
      });
      axios.get(forecast).then((res) => {
        setForecastData(res.data);
        // console.log(res.data)
        setFirstDay(moment(res.data.list[0].dt_txt).format("dddd"));
        setSecondDay(moment(res.data.list[0 + 8].dt_txt).format("dddd"));
        setThirdDay(moment(res.data.list[0 + 16].dt_txt).format("dddd"));
        setFourthDay(moment(res.data.list[0 + 24].dt_txt).format("dddd"));
        setFifthDay(moment(res.data.list[0 + 32].dt_txt).format("dddd"));
        setLoading(true);
      });
      setVal("");
    }
  };
  getDefault();

  const change = (e) => {
    setVal(e.target.value);
  };

  const getTemps = () => {
    axios.get(url).then((res) => {
      setData(res.data);
      // console.log(res.data);
    });
    setVal("");
  };

  const getForecast = () => {
    axios.get(forecast).then((res) => {
      setForecastData(res.data);
      // console.log(res.data);
      setVal("");
    });
  };

  const temps = (e) => {
    if (e.keyCode === 13) {
      getTemps();
      getForecast();
      setFirstDay(moment(forecastData.list[0].dt_txt).format("dddd"));
      setSecondDay(moment(forecastData.list[0 + 8].dt_txt).format("dddd"));
      setThirdDay(moment(forecastData.list[0 + 16].dt_txt).format("dddd"));
      setFourthDay(moment(forecastData.list[0 + 24].dt_txt).format("dddd"));
      setFifthDay(moment(forecastData.list[0 + 32].dt_txt).format("dddd"));
    }
  };

  return (
    <Box
      className="Weather App"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: 600,
          height: 750,
        },
      }}
    >
      <Paper
        elevation={24}
        sx={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#161616",
          borderRadius: 12,
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          alignItems="center"
        >
          <TextField
            label="Search City or Search City, State, and Country"
            InputLabelProps={{
              style: { color: "#fff" },
            }}
            onChange={change}
            placeholder="City, State Code, Country Code"
            value={val}
            onKeyDown={temps}
            InputProps={{
              style: { borderColor: "#fff !important" },
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#fff" }} />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            sx={{
              width: "80%",
              marginTop: 4,
              fieldset: { borderColor: "#fff" },
              input: { color: "#fff" },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#fff",
                },
              },
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h2" align="center" sx={{ color: "#fff" }}>
              {data?.name}
            </Typography>
            <Typography
              variant="h2"
              align="center"
              sx={{ color: "#fff", marginTop: 1 }}
            >
              {data?.main?.temp.toFixed()}°
            </Typography>
            {isLoading ? (
              <Typography variant="h5" sx={{ color: "#fff", marginRight: 2 }}>
                {data?.weather?.[0]?.main}
              </Typography>
            ) : (
              ""
            )}
            {isLoading ? (
              <Box
                component="img"
                sx={{
                  height: 70,
                  width: 70,
                  marginRight: 2,
                }}
                alt="weather"
                src={`http://openweathermap.org/img/w/${data?.weather[0].icon}.png`}
              />
            ) : (
              ""
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginBottom: 5,
            }}
          >
            <Paper
              elevation={1}
              sx={{
                minWidth: 600,
                minHeight: 200,
                display: "flex",
                justifyContent: "space-evenly",
                backgroundColor: "#181818",
                borderRadius: 12,
              }}
            >
              <Typography
                variant="h9"
                sx={{ color: "#fff", alignSelf: "center" }}
              >
                {isLoading ? firstDay : ""}
                <Typography>
                  {isLoading
                    ? Math.ceil(forecastData.list[0].main.temp) + "° F "
                    : ""}
                </Typography>
                <Typography>
                  {isLoading ? forecastData.list[0].weather[0].description : ""}
                </Typography>
                {isLoading ? (
                  <Box
                    component="img"
                    alt="weather"
                    src={`http://openweathermap.org/img/w/${forecastData.list[0].weather[0].icon}.png`}
                  />
                ) : (
                  ""
                )}
              </Typography>
              <Divider orientation="vertical" flexItem />
              <Typography
                variant="h9"
                sx={{ color: "#fff", alignSelf: "center" }}
              >
                {isLoading ? secondDay : ""}
                <Typography>
                  {isLoading
                    ? Math.ceil(forecastData.list[0 + 8].main.temp) + "° F "
                    : ""}
                </Typography>
                <Typography>
                  {isLoading
                    ? forecastData.list[0 + 8].weather[0].description
                    : ""}
                </Typography>
                {isLoading ? (
                  <Box
                    component="img"
                    alt="weather"
                    src={`http://openweathermap.org/img/w/${
                      forecastData.list[0 + 8].weather[0].icon
                    }.png`}
                  />
                ) : (
                  ""
                )}
              </Typography>
              <Divider orientation="vertical" flexItem />
              <Typography
                variant="h9"
                sx={{ color: "#fff", alignSelf: "center" }}
              >
                {isLoading ? thirdDay : ""}
                <Typography>
                  {isLoading
                    ? Math.ceil(forecastData.list[0 + 16].main.temp) + "° F "
                    : ""}
                </Typography>
                <Typography>
                  {isLoading
                    ? forecastData.list[0 + 16].weather[0].description
                    : ""}
                </Typography>
                {isLoading ? (
                  <Box
                    component="img"
                    alt="weather"
                    src={`http://openweathermap.org/img/w/${
                      forecastData.list[0 + 16].weather[0].icon
                    }.png`}
                  />
                ) : (
                  ""
                )}
              </Typography>
              <Divider orientation="vertical" flexItem />
              <Typography
                variant="h9"
                sx={{ color: "#fff", alignSelf: "center" }}
              >
                {isLoading ? fourthDay : ""}
                <Typography>
                  {isLoading
                    ? Math.ceil(forecastData.list[0 + 24].main.temp) + "° F "
                    : ""}
                </Typography>
                <Typography>
                  {isLoading
                    ? forecastData.list[0 + 24].weather[0].description
                    : ""}
                </Typography>
                {isLoading ? (
                  <Box
                    component="img"
                    alt="weather"
                    src={`http://openweathermap.org/img/w/${
                      forecastData.list[0 + 24].weather[0].icon
                    }.png`}
                  />
                ) : (
                  ""
                )}
              </Typography>
              <Divider orientation="vertical" flexItem />
              <Typography
                variant="h9"
                sx={{
                  color: "#fff",
                  alignSelf: "center",
                }}
              >
                {isLoading ? fifthDay : ""}
                <Typography>
                  {isLoading
                    ? Math.ceil(forecastData.list[0 + 32].main.temp) + "° F "
                    : ""}
                </Typography>
                <Typography>
                  {isLoading
                    ? forecastData.list[0 + 32].weather[0].description
                    : ""}
                </Typography>
                {isLoading ? (
                  <Box
                    component="img"
                    alt="weather"
                    src={`http://openweathermap.org/img/w/${
                      forecastData.list[0 + 32].weather[0].icon
                    }.png`}
                  />
                ) : (
                  ""
                )}
              </Typography>
            </Paper>
          </Box>
        </Grid>
      </Paper>
    </Box>
  );
}

export default WeatherApp;
