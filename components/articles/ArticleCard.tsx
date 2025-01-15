import { format } from "date-fns";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Linking,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  useColorScheme, // Import useColorScheme to detect theme
} from "react-native";

export default function ArticleCard({ article }: { article: Article }) {
  const [isFullContentVisible, setFullContentVisible] = useState(false);
  const [showLinkPopup, setShowLinkPopup] = useState(false);
  const MAX_DESCRIPTION_LENGTH = 155; // Set a maximum length for the description

  const scheme = useColorScheme(); // Get the current color scheme (light or dark)

  const handlePress = async () => {
    Alert.alert(
      "Confirm Link",
      "Are you sure you would like to proceed to the article?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              const supported = await Linking.canOpenURL(article.url);
              if (supported) {
                await Linking.openURL(article.url);
              } else {
                console.error("The URL is not supported.");
              }
            } catch (error) {
              console.error("Error opening the URL:", error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const toggleContent = () => {
    setFullContentVisible(!isFullContentVisible);
  };

  // Truncate description to a max length if it's not full
  const truncatedDescription =
    article.description?.length > MAX_DESCRIPTION_LENGTH
      ? article.description.slice(0, MAX_DESCRIPTION_LENGTH) + "..."
      : article.description;

  // Display description or full content
  const descriptionToShow = isFullContentVisible
    ? article.content
    : truncatedDescription;

  // Display source and author on the same line
  const authorAndSource = (
    <Text style={styles.authorAndSource}>
      {article.source?.name ? `Source: ${article.source.name} | ` : ""}
      By {article.author}
    </Text>
  );

  // Display published date
  const publishedAt = article.publishedAt ? (
    <Text style={styles.publishedAt}>
      Published: {format(new Date(article.publishedAt), "MMM d, yyyy, h:mm a")}
    </Text>
  ) : null;

  // Set background color and text color based on the current theme
  const cardBackgroundColor = scheme === "dark" ? "#212529" : "#f8f9fa"; // Dark mode background color
  const textColor = scheme === "dark" ? "#f8f9fa" : "#212529"; // Dark mode text color

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={1}
      style={[styles.card, { backgroundColor: cardBackgroundColor }]}
    >
      {article.urlToImage && (
        <Image source={{ uri: article.urlToImage }} style={styles.image} />
      )}
      <View style={styles.content}>
        <Text style={[styles.title, { color: textColor }]}>
          {article.title}
        </Text>

        {/* Display description or full content */}
        <Text style={[styles.description, { color: textColor }]}>
          {descriptionToShow}
        </Text>

        {/* "Read More" link at the end of description */}
        {article.description &&
          article.description.length > MAX_DESCRIPTION_LENGTH && (
            <TouchableOpacity onPress={toggleContent}>
              <Text style={[styles.toggleText, { color: textColor }]}>
                {isFullContentVisible ? "Read Less" : "Read More"}
              </Text>
            </TouchableOpacity>
          )}

        {/* Display source and author on the same line */}
        <View style={styles.extraContent}>
          {(article.source?.name || article.author) && authorAndSource}
          {publishedAt}
        </View>
      </View>

      {/* Popup Modal for Link Confirmation */}
      {showLinkPopup && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={showLinkPopup}
          onRequestClose={() => setShowLinkPopup(false)}
        >
          <TouchableWithoutFeedback onPress={() => setShowLinkPopup(false)}>
            <View style={styles.overlay}>
              <View style={styles.popup}>
                <Text style={[styles.popupText, { color: textColor }]}>
                  Do you want to open this link?
                </Text>
                <TouchableOpacity
                  onPress={handlePress}
                  style={styles.popupButton}
                >
                  <Text style={styles.popupButtonText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setShowLinkPopup(false)}
                  style={styles.popupButton}
                >
                  <Text style={styles.popupButtonText}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.15, // Slightly darker shadow for better contrast
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    borderWidth: 1,
    borderColor: "#ddd", // Soft border to enhance the card outline
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18, // Larger text for better readability
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 12,
  },
  extraContent: {
    marginTop: 8,
  },
  authorAndSource: {
    fontSize: 12,
    color: "#6c757d", // Lighter color for source and author to distinguish it
    marginBottom: 4,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  publishedAt: {
    fontSize: 12,
    color: "#6c757d", // Similar color as author/source for consistency
  },
  toggleText: {
    fontSize: 14,
    marginTop: 8,
    textDecorationLine: "underline",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay for popups
  },
  popup: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  popupText: {
    fontSize: 16,
    marginBottom: 20,
  },
  popupButton: {
    backgroundColor: "#007bff", // Clear blue for button
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  popupButtonText: {
    color: "#fff", // White text for button
    fontSize: 16,
  },
});
