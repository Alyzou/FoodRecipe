// src/screens/MyRecipeScreen.js
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function MyRecipeScreen() {
  const navigation = useNavigation();
  const [recipes, setrecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchrecipes = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem("customrecipes");
      if (raw) {
        const arr = JSON.parse(raw);
        setrecipes(Array.isArray(arr) ? arr : []);
      } else {
        setrecipes([]);
      }
    } catch (e) {
      console.warn("Failed to load recipes", e);
      setrecipes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const unsub = navigation.addListener("focus", fetchrecipes);
    fetchrecipes();
    return unsub;
  }, [fetchrecipes, navigation]);

  const handlerecipeClick = (recipe) => {
    navigation.navigate("CustomRecipesScreen", { recipe });
  };

  const handleAddrecipe = () => {
    navigation.navigate("RecipesFormScreen");
  };

  const deleterecipe = async (index) => {
    try {
      const updated = [...recipes];
      updated.splice(index, 1);
      await AsyncStorage.setItem("customrecipes", JSON.stringify(updated));
      setrecipes(updated);
    } catch (e) {
      console.warn("Delete failed", e);
    }
  };

  const editrecipe = (recipe, index) => {
    navigation.navigate("RecipesFormScreen", {
      recipeToEdit: recipe,
      recipeIndex: index,
      onrecipeEdited: fetchrecipes,
    });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text style={{ marginTop: 8 }}>Loading…</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>My Food</Text>
        <TouchableOpacity style={styles.addBtn} onPress={handleAddrecipe}>
          <Text style={styles.addText}>+ Add New Recipe</Text>
        </TouchableOpacity>
      </View>

      {!recipes.length ? (
        <View style={styles.center}>
          <Text>No custom recipes yet.</Text>
        </View>
      ) : (
        <FlatList
          data={recipes}
          contentContainerStyle={{ padding: wp(4), gap: 12 }}
          keyExtractor={(it, i) =>
            (it?.title ? `title:${it.title}` : `${i}`) + ""
          }
          renderItem={({ item, index }) => (
            <View style={styles.card}>
              <TouchableOpacity
                testID="handlerecipeBtn"
                style={{ flex: 1 }}
                onPress={() => handlerecipeClick(item)}
                activeOpacity={0.85}
              >
                {!!item?.image && (
                  <Image source={{ uri: item.image }} style={styles.recipeImage} />
                )}
                <Text style={styles.cardTitle}>{item?.title || "Recipe"}</Text>
                <Text testID="recipeDescp" style={styles.cardDesc}>
                  {item?.description
                    ? item.description.length > 50
                      ? item.description.slice(0, 50) + "…"
                      : item.description
                    : ""}
                </Text>
              </TouchableOpacity>

              <View testID="editDeleteButtons" style={styles.row}>
                <TouchableOpacity
                  style={[styles.smallBtn, { backgroundColor: "#111" }]}
                  onPress={() => editrecipe(item, index)}
                >
                  <Text style={{ color: "#fff", fontWeight: "700" }}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.smallBtn, { backgroundColor: "#e11d48" }]}
                  onPress={() => deleterecipe(index)}
                >
                  <Text style={{ color: "#fff", fontWeight: "700" }}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  header: {
    paddingTop: hp(4),
    paddingHorizontal: wp(4),
    paddingBottom: hp(2),
    gap: 10,
  },
  backBtn: {
    alignSelf: "flex-start",
    backgroundColor: "#111",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  backText: { color: "#fff", fontWeight: "700" },
  title: { fontWeight: "800", fontSize: wp(6), marginTop: 8 },
  addBtn: {
    alignSelf: "flex-start",
    backgroundColor: "#16a34a",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  addText: { color: "#fff", fontWeight: "700" },
  card: {
    backgroundColor: "#fafafa",
    borderRadius: 16,
    padding: 12,
  },
  recipeImage: { width: "100%", height: hp(22), borderRadius: 12, marginBottom: 8 },
  cardTitle: { fontWeight: "800", fontSize: wp(4.5) },
  cardDesc: { color: "#555", marginTop: 4 },
  row: { flexDirection: "row", gap: 8, marginTop: 10 },
  smallBtn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10 },
});
