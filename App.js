import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { API_KEY } from "@env";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import dayjs from "dayjs";

export default function App() {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const fetchWeatherData = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.cod === "400") {
          // setError(data.message);
          setWeatherData(null);
        } else {
          setWeatherData(data);
          // setError(null);
        }
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        // setError("Error fetching weather data. Please try again.");
        setWeatherData(null);
      });
  };

  const handleChange = (name) => {
    if(!name) {
      setWeatherData(null)
    } else {
      setCityName(name)
    }
  }

  const handleSearch = () => {
    // setWeatherData(null)
    fetchWeatherData()
  }

  console.log("Weather data", weatherData);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?cs=srgb&dl=pexels-pixabay-209831.jpg&fm=jpg",
        }}
        style={styles.backgroundImage}
      >
        <View style={styles.contentContainer}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.input}
              value={cityName}
              onChangeText={(name) => handleChange(name)}
            />
            <TouchableOpacity
              style={styles.icon}
              onPress={() => handleSearch()}
              disabled={!cityName ? true : false}
            >
              <FontAwesome name="search" size={24} color="black" />
            </TouchableOpacity>
          </View>
          {(weatherData && cityName) && (
            <View style={styles.resultContainer}>
              <Text>{weatherData.name}</Text>
              <Text>{new Date().toString()}</Text>
              <Text>{weatherData?.main?.temp}</Text>
              <Text>{weatherData.weather[0].description}</Text>
            </View>
          )}
        </View>
        <StatusBar style="auto" />
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  resultContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#000",
    flex: 1,
    borderRadius: 10,
    padding: 10,
  },
  icon: {
    backgroundColor: "yellow",
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
  },
});
