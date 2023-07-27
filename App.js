import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ImageBackground } from "react-native";
import React, { useState } from "react";
import Result from "./components/Result";
import Search from "./components/Search";

export default function App() {
  const [weatherData, setWeatherData] = useState({});
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false)

  return (
    <View style={styles.container}>
      <ImageBackground
        source={
          Object.keys(weatherData).length === 0
            ? {
                uri: "https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?cs=srgb&dl=pexels-pixabay-209831.jpg&fm=jpg",
              }
            : {
                uri: `https://source.unsplash.com/1600x900/?" + ${weatherData.weather[0].description} + "`,
              }
        }
        style={styles.backgroundImage}
      >
        <View style={styles.contentContainer}>
          <Search setErrMsg={setErrMsg} setWeatherData={setWeatherData} setLoading={setLoading} />
          <Result errMsg={errMsg} weatherData={weatherData} loading={loading} />
        </View>
        <StatusBar style="light" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
});
