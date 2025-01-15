import React, { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface LoadingIndicatorProps {
  size?: "small" | "large"; // Optional size prop
  color?: string; // Optional color prop
  text?: string; // Optional custom text
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  size = "large",
  color,
  text = "Loading...",
}) => {
  const spinValue = useRef(new Animated.Value(0)).current; // Spin animation value

  // Spin animation (rotation)
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  // Start the animation
  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [spinValue]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.spinner, { transform: [{ rotate: spin }] }]}
      >
        <ActivityIndicator size={size} color={color} />
      </Animated.View>
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Semi-transparent background
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5, // For Android shadow
  },
  spinner: {
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
});

export default LoadingIndicator;
