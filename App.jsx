import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, Platform, Pressable } from "react-native";
import { AppearanceProvider, Appearance } from "react-native-appearance";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";

const App = () => {
    const [userTheme, setUserTheme] = useState(Appearance.getColorScheme());
    const [errorMsg, setErrorMsg] = useState(null);
    const [location, setLocation] = useState(null);

    const locationLoaderAsync = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            setErrorMsg("Permission to access location was denied");
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
    };

    useEffect(() => {
        locationLoaderAsync();
    }, []);

    useEffect(() => {
        console.log(location);
    }, [location]);

    let theme = lightTheme;

    if (userTheme === "dark") {
        theme = darkTheme;
    }

    Appearance.addChangeListener(() => {});

    const toggleTheme = () => {
        if (userTheme === "light") {
            setUserTheme("dark");
            theme = darkTheme;
        } else {
            setUserTheme("light");
            theme = lightTheme;
        }
    };

    return (
        <AppearanceProvider>
            <StatusBar style={userTheme === "dark" ? "light" : "dark"} />
            <View style={[layout.wrapper, theme.surface]}>
                <View style={layout.header}>
                    <Text style={[theme.textColorAccent, typography.textTitle]}>
                        Weather App
                    </Text>
                    <Pressable
                        style={[layout.themeSwitcher, theme.themeSwitcher]}
                        onPress={toggleTheme}
                    >
                        <Text
                            style={[theme.themeSwitcherText, typography.bold]}
                        >
                            <Ionicons
                                name="moon"
                                size={18}
                                color={theme.textColorAccent.color}
                            />
                        </Text>
                    </Pressable>
                </View>
                <View>
                    {location && (
                        <Text style={theme.textColorMain}>
                            Lat: {location.coords.latitude}, Lon:{" "}
                            {location.coords.longitude}
                        </Text>
                    )}
                </View>
            </View>
        </AppearanceProvider>
    );
};

export default App;

const typography = StyleSheet.create({
    textBody: {
        fontSize: 18,
        lineHeight: 22,
        fontWeight: "500",
    },
    textLabel: {
        fontSize: 16,
        lineHeight: 20,
    },
    textTitle: {
        fontSize: 28,
        lineHeight: 32,
        fontWeight: "700",
    },
    regular: {
        fontWeight: "400",
    },
    medium: {
        fontWeight: "500",
    },
    bold: {
        fontWeight: "700",
    },
});

const layout = StyleSheet.create({
    wrapper: {
        padding: 16,
        paddingTop: Platform.OS === "android" ? 42 : 16,
        flex: 1,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    themeSwitcher: {
        width: 32,
        height: 32,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 6,
    },
});

const lightTheme = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#D1D5DB",
    },
    textColorMain: {
        color: "#1F2937",
    },
    textColorAccent: {
        color: "#2563EB",
    },
    textColorError: {
        color: "#F43F5E",
    },
    surface: {
        backgroundColor: "#D1D5DB",
    },
    surfaceAccent: {
        backgroundColor: "#F3F4F6",
    },
    themeSwitcher: {
        backgroundColor: "#F3F4F6",
    },
    themeSwitcherText: {
        color: "#2563EB",
    },
});

const darkTheme = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E5E7EB",
    },
    textColorMain: {
        color: "#E5E7EB",
    },
    textColorAccent: {
        color: "#A5B4FC",
    },
    textColorError: {
        color: "#F87171",
    },
    surface: {
        backgroundColor: "#111827",
    },
    surfaceAccent: {
        backgroundColor: "#1F2937",
    },
    themeSwitcher: {
        backgroundColor: "#1F2937",
    },
    themeSwitcherText: {
        color: "#A5B4FC",
    },
});
