// src/screens/RecipesFormScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function RecipesFormScreen() {
  const navigation = useNavigation();
  const { params } = useRoute();
  const recipeToEdit = params?.recipeToEdit;
  const recipeIndex = params?.recipeIndex;
  const onrecipeEdited = params?.onrecipeEdited;

  const [title, setTitle] = useState(recipeToEdit?.title || "");
  const [image, setImage] = useState(recipeToEdit?.image || "");
  const [description, setDescription] = useState(
    recipeToEdit?.description || ""
  );

  const saverecipe = async () => {
    try {
      if (!title.trim()) {
        Alert.alert("Validation", "Please enter a title");
        return;
      }
      const newrecipe = { title: title.trim(), image: image.trim(), description };

      const raw = await AsyncStorage.getItem("customrecipes");
      const recipes = raw ? JSON.parse(raw) : [];

      if (recipeToEdit && Number.isInteger(recipeIndex)) {
        const updated = [...recipes];
        updated[recipeIndex] = newrecipe;
        await AsyncStorage.setItem("customrecipes", JSON.stringify(updated));
      } else {
        const updated = [...recipes, newrecipe];
        await AsyncStorage.setItem("customrecipes", JSON.stringify(updated));
      }

      if (typeof onrecipeEdited === "function") onrecipeEdited();
      navigation.goBack();
    } catch (e) {
      console.warn("Save failed", e);
      Alert.alert("Error", "Failed to save recipe");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {recipeToEdit ? "Edit Recipe" : "Add Recipe"}
      </Text>

      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
        style={styles.input}
        autoCapitalize="none"
      />

      {!!image ? (
        <Image source={{ uri: image }} style={styles.preview} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={{ color: "#777" }}>Upload Image URL</Text>
        </View>
      )}

      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, { height: hp(16), textAlignVertical: "top" }]}
        multiline
      />

      <TouchableOpacity style={styles.saveBtn} onPress={saverecipe}>
        <Text style={styles.saveText}>Save Recipe</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: wp(5), backgroundColor: "#fff" },
  title: { fontWeight: "800", fontSize: wp(6), marginBottom: hp(2) },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  preview: { width: "100%", height: hp(24), borderRadius: 12, marginBottom: 12 },
  placeholder: {
    height: hp(24),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  saveBtn: {
    backgroundColor: "#111",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  saveText: { color: "#fff", fontWeight: "800" },
});
