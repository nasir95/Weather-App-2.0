import { Grid } from "@mui/material";
import WeatherApp from './components/WeatherApp';


function App() {
  return (
    <Grid container sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100VH",
      backgroundColor: "#454545"
    }}>
      <WeatherApp/>
    </Grid>
  );
}

export default App;
