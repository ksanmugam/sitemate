import ArticleCard from "@/components/articles/ArticleCard";
import SearchBar from "@/components/articles/ArticleSearchBar";
import LoadingIndicator from "@/components/articles/LoadingIndicator";
import SortModal from "@/components/articles/SortModal";
import { useArticles } from "@/context/ArticlesContext"; // Assuming this context is in place
import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function HomeScreen() {
  const {
    articles,
    query,
    isError,
    error,
    isFetching,
    isFetched,
    searchArticles,
  } = useArticles();

  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("publishedAt");

  const renderArticleCard = ({ item }: { item: any }) => (
    <ArticleCard article={item} />
  );

  const onRefresh = useCallback(() => {
    if (query.trim()) {
      searchArticles();
    }
  }, [query, searchArticles]);

  const showLoadingIndicator =
    isFetching && (!articles || articles.length === 0);

  const colorScheme = useColorScheme(); // Get the current color scheme

  // Show a toast on error
  useEffect(() => {
    if (isError) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: error?.message || "An error occurred while fetching articles.",
      });
    }
  }, [isError, error]);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsPickerVisible(false); // Close the picker after selecting an option
  };

  const headerBackgroundColor = colorScheme === "dark" ? "#333" : "#f9f9f9";
  const headerTextColor = colorScheme === "dark" ? "#fff" : "#000";
  const filterIconColor = colorScheme === "dark" ? "#fff" : "#000";
  const containerBackgroundColor = headerBackgroundColor;

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { flex: 1, backgroundColor: containerBackgroundColor },
      ]}
    >
      <View style={[styles.header, { backgroundColor: headerBackgroundColor }]}>
        <Text style={[styles.title, { color: headerTextColor }]}>Articles</Text>

        {/* Filter Icon */}
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => {
            Toast.show({
              type: "info",
              text1: "Filter coming soon ;)",
            });
          }}
          testID="filter-button"
        >
          <Ionicons name="cellular" size={24} color={filterIconColor} />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <SearchBar placeholder="Search for Articles..." />

        <View style={styles.iconContainer}>
          <Ionicons
            name="options"
            disabled={!isFetched && !articles?.length}
            size={20}
            color={
              !isFetched || !articles?.length
                ? colorScheme === "dark"
                  ? "#555"
                  : "#bbb"
                : colorScheme === "dark"
                ? "#fff"
                : "#000"
            }
            onPress={() => setIsPickerVisible(true)}
          />
        </View>

        {showLoadingIndicator && (
          <LoadingIndicator
            color={colorScheme === "dark" ? "#1e90ff" : "#007bff"}
            text="Fetching articles..."
          />
        )}

        {isError && (
          <Text style={styles.error}>
            {error?.message || "An error occurred while fetching articles."}
          </Text>
        )}

        {!showLoadingIndicator && (
          <FlatList
            data={articles}
            keyExtractor={(item, index) =>
              item?.id ? item.id.toString() : index.toString()
            }
            renderItem={renderArticleCard}
            contentContainerStyle={styles.list}
            ListEmptyComponent={
              !isFetching ? (
                <Text style={styles.emptyMessage}>
                  {isFetched && !articles?.length
                    ? "No articles found. Try a different search query."
                    : "Welcome! Start searching for interesting articles."}
                </Text>
              ) : null
            }
            refreshing={isFetching}
            onRefresh={onRefresh}
            testID="articles-list"
          />
        )}
      </View>

      <SortModal
        isVisible={isPickerVisible}
        onClose={() => setIsPickerVisible(false)}
        selectedOption={selectedOption}
        onSelect={handleOptionSelect}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1, padding: 16 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  title: { fontSize: 20, fontWeight: "bold" },
  filterButton: { padding: 8 },
  iconContainer: {
    alignItems: "flex-end",
    marginVertical: 16,
    marginLeft: "auto",
  },
  error: { color: "red", textAlign: "center", marginBottom: 16 },
  emptyMessage: { textAlign: "center", marginTop: 16, color: "#6c757d" },
  list: { paddingBottom: 16 },
});
