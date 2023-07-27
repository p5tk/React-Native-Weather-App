import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { API_KEY } from "@env";
import { FontAwesome } from "@expo/vector-icons";

const Search = ({ setWeatherData, setErrMsg, setLoading }) => {
  const [cityName, setCityName] = useState("");

  const fetchWeatherData = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        setLoading(false)
        if (data && data.cod === "400") {
          setErrMsg(data.message);
          setWeatherData({});
        } else if (data.cod === 200) {
          setWeatherData(data);
          setErrMsg("");
        } else {
          setErrMsg("Something went wrong");
        }
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setWeatherData({});
      });
  };

  const handleChange = (name) => {
    setCityName(name);
    if (!name) {
      setErrMsg("");
      setWeatherData({});
    }
  };

  const handleSearch = () => {
    setLoading(true)
    fetchWeatherData();
  };
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.input}
        value={cityName}
        placeholder="Enter city name"
        placeholderTextColor={'rgba(255,255,255,0.3)'}
        onChangeText={(val) => handleChange(val)}
        onSubmitEditing={() => handleSearch()}
      />
      <TouchableOpacity
        style={styles.icon}
        onPress={() => handleSearch()}
        disabled={!cityName ? true : false}
      >
        <FontAwesome name="search" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "rgba(0,0,0,0.8)",
    fontSize: 16,
    color: "#fff",
    height: 46,
    borderWidth: 1,
    borderColor: "#000",
    flex: 1,
    borderRadius: 10,
    paddingLeft: 15,
  },
  icon: {
    backgroundColor: "rgba(0,0,0,0.8)",
    height: 46,
    width: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
});
