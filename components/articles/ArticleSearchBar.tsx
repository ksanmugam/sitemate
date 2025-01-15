import { useArticles } from "@/context/ArticlesContext";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

interface SearchBarProps {
  placeholder: string;
  testID?: string; // Add testID as an optional property
}

export default function SearchBar({ placeholder }: SearchBarProps) {
  const { query, setQuery, searchArticles } = useArticles();
  const colorScheme = useColorScheme(); // Get current color scheme (light or dark)

  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false); // Track whether TextInput is focused

  const clearText = () => {
    setQuery(""); // Clear the search text
  };

  const handleSearch = () => {
    if (query.trim()) {
      // Add query to search history
      const newHistory = [
        query,
        ...searchHistory.filter((item) => item !== query),
      ];
      setSearchHistory(newHistory);

      searchArticles(); // Only search if query is not empty
      Keyboard.dismiss(); // Dismiss the keyboard after searching
    }
  };

  const handleHistoryItemPress = (item: string) => {
    setQuery(item);
    searchArticles();
  };

  const handleFocus = () => {
    setIsFocused(true); // Set focus state to true when input is focused
  };

  const handleBlur = () => {
    setIsFocused(false); // Set focus state to false when input is blurred
  };

  // Define dynamic styles based on colorScheme
  const backgroundColor = colorScheme === "dark" ? "#444" : "#fff"; // Darker background for better contrast
  const inputColor = colorScheme === "dark" ? "#fff" : "#333"; // Lighter text color for better contrast in dark mode
  const buttonColor = colorScheme === "dark" ? "#1e90ff" : "#007bff"; // Brighter blue for dark mode
  const clearButtonColor = colorScheme === "dark" ? "#fff" : "#007bff"; // Ensure the clear button contrasts well
  const placeholderColor = colorScheme === "dark" ? "#bbb" : "#aaa"; // Lighter placeholder for dark mode
  const historyListBackground = backgroundColor; // More contrasting background for history in both modes
  const historyItemColor = colorScheme === "dark" ? "#fff" : "#000"; // Lighter text color for history items in dark mode

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <TextInput
        style={[styles.searchInput, { color: inputColor }]}
        placeholder={placeholder}
        value={query}
        onChangeText={setQuery}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        onSubmitEditing={handleSearch} // Trigger search when the return key is pressed
        placeholderTextColor={placeholderColor}
        onFocus={handleFocus} // Show search history when focused
        onBlur={handleBlur} // Hide search history when blurred
      />
      {query ? (
        <TouchableOpacity style={styles.clearButton} onPress={clearText}>
          <Ionicons name="close-circle" size={20} color={clearButtonColor} />
        </TouchableOpacity>
      ) : null}
      <TouchableOpacity
        style={[styles.searchButton, { backgroundColor: buttonColor }]}
        onPress={handleSearch}
        disabled={!query.trim()} // Disable search button if query is empty
      >
        <Ionicons name="search" size={20} color="#fff" />
      </TouchableOpacity>

      {/* Show search history only when input is focused and query is empty */}
      {isFocused && query === "" && searchHistory.length > 0 && (
        <FlatList
          data={searchHistory}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleHistoryItemPress(item)}>
              <Text style={[styles.historyItem, { color: historyItemColor }]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          style={[
            styles.historyList,
            { backgroundColor: historyListBackground },
          ]} // Adjusted the background color for contrast
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginVertical: 12,
    borderRadius: 30,
    shadowColor: "#000", // Subtle shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5, // For Android shadow
    position: "relative", // Ensures child elements are positioned relative to the container
  },
  searchInput: {
    flex: 1,
    height: 48,
    borderRadius: 25,
    paddingLeft: 16,
    fontSize: 16,
    backgroundColor: "transparent", // Make sure the background is transparent to blend with container
  },
  searchButton: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginLeft: 10, // Spacing between input and button
    elevation: 3, // Button shadow for depth
  },
  clearButton: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  historyList: {
    position: "absolute", // Makes it overlay above the other elements
    top: 50, // Position it below the search input and icon (adjust if needed)
    left: 16,
    right: 16,
    borderRadius: 10,
    padding: 10,
    zIndex: 999999999999999,
    maxHeight: 200, // Optional: Prevent overflowing
  },
  historyItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 14,
  },
});
