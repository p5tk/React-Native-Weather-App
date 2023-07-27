import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import React from "react";
import dayjs from "dayjs";
import SizeBox from "./SizeBox";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const Result = ({ errMsg, weatherData, loading }) => {
  return (
    <>
      { !loading ? (
        <View>
          {Object.keys(weatherData).length !== 0 && (
            <View style={styles.resultContainer}>
              <Image
                source={{
                  uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
                }}
                style={styles.demoText}
              />
              <Text style={styles.cityName}>{weatherData.name}</Text>
              <Text style={styles.normalText}>
                {dayjs(new Date()).format("D.M.YYYY (ddd)")}
              </Text>
              <SizeBox height={40} />
              <Text style={styles.temp}>{weatherData?.main?.temp}°C</Text>
              <Text style={styles.normalText}>
                {weatherData.weather[0].description}
              </Text>
              <SizeBox height={40} />
              <View style={styles.extraInfo}>
                <FontAwesome
                  name="thermometer"
                  size={24}
                  color="#fff"
                  style={styles.infoIcon}
                />
                <Text
                  style={[
                    styles.normalText,
                    { width: 100, fontWeight: "bold" },
                  ]}
                >
                  Feels like
                </Text>
                <Text style={styles.normalText}>
                  {weatherData.main.feels_like} °C
                </Text>
              </View>
              <View style={styles.extraInfo}>
                <Ionicons
                  name="water"
                  size={24}
                  color="#fff"
                  style={styles.infoIcon}
                />
                <Text
                  style={[
                    styles.normalText,
                    { width: 100, fontWeight: "bold" },
                  ]}
                >
                  Humidity
                </Text>
                <Text style={styles.normalText}>
                  {weatherData.main.humidity} %
                </Text>
              </View>
              <View style={styles.extraInfo}>
                <MaterialCommunityIcons
                  name="weather-windy"
                  size={22}
                  color="#fff"
                  style={styles.infoIcon}
                />
                <Text
                  style={[
                    styles.normalText,
                    { width: 100, fontWeight: "bold" },
                  ]}
                >
                  Winds
                </Text>
                <Text style={styles.normalText}>
                  {weatherData.wind.speed} m/s
                </Text>
              </View>
            </View>
          )}
          {errMsg && (
            <View style={{ position: "relative", marginTop: -30 }}>
              <Image
                source={require("../assets/error.png")}
                style={{ height: 400, width: 400, alignSelf: "center" }}
              />
              <Text
                style={{
                  position: "absolute",
                  top: 100,
                  left: 100,
                  width: 70,
                  textAlign: "center",
                }}
              >
                {errMsg}
              </Text>
            </View>
          )}
        </View>
      ) : (
        <ActivityIndicator size='large' color='#000' />
      )}
    </>
  );
};

export default Result;

const styles = StyleSheet.create({
  resultContainer: {
    backgroundColor: "rgba(0,0,0,0.8)",
    borderRadius: 15,
    padding: 15,
    position: "relative",
  },
  normalText: {
    fontSize: 16,
    color: "#fff",
  },
  cityName: {
    fontSize: 25,
    color: "#fff",
    fontWeight: "bold",
  },
  date: {
    marginBottom: 30,
    color: "#fff",
  },
  temp: {
    fontSize: 50,
    color: "#fff",
    fontWeight: "bold",
  },
  extraInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  infoIcon: {
    width: 35,
  },
  demoText: {
    position: "absolute",
    height: 100,
    width: 100,
    top: 10,
    right: 10,
  },
});
