// components/SortModal.js

import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

const SortModal: React.FC<SortModalProps> = ({
  isVisible,
  onClose,
  selectedOption,
  onSelect,
}) => {
  const colorScheme = useColorScheme(); // Get the current color scheme

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View
          style={[
            styles.pickerContainer,
            {
              backgroundColor: colorScheme === "dark" ? "#333" : "#fff",
            },
          ]}
        >
          <Text
            style={[
              styles.pickerTitle,
              {
                color: colorScheme === "dark" ? "#fff" : "#000",
              },
            ]}
          >
            Sort By
          </Text>
          <Picker selectedValue={selectedOption} onValueChange={onSelect}>
            <Picker.Item label="Published At" value="publishedAt" />
            <Picker.Item label="Popularity" value="popularity" />
            <Picker.Item label="Relevancy" value="relevancy" />
          </Picker>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons
              name="close"
              size={24}
              color={colorScheme === "dark" ? "#fff" : "#000"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  pickerContainer: {
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 8,
    zIndex: 1,
  },
});

export default SortModal;
