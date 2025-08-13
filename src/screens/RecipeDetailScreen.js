// src/screens/RecipeDetailScreen.js
import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/favoritesSlice";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function RecipeDetailScreen(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const recipe = props.route?.params || {};
  const favoriteRecipes = useSelector((s) => s.favorites.favoriteRecipes || []);
  const isFav = favoriteRecipes.some((r) => r?.idFood === recipe?.idFood);

  const onToggle = () => dispatch(toggleFavorite(recipe));

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Image */}
      <View testID="imageContainer">
        {!!recipe?.recipeImage && (
          <Image
            source={{ uri: recipe.recipeImage }}
            style={styles.recipeImage}
            resizeMode="cover"
          />
        )}
      </View>

      {/* Top buttons */}
      <View style={styles.topButtons}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.btnText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.favBtn} onPress={onToggle}>
          <Text style={styles.favIcon}>{isFav ? "♥" : "♡"}</Text>
        </TouchableOpacity>
      </View>

      {/* Title */}
      <View testID="recipeTitle" style={styles.block}>
        <Text style={styles.title}>{recipe?.recipeName || "Recipe"}</Text>
      </View>

      {/* Category */}
      <View testID="recipeCategory" style={styles.block}>
        <Text style={styles.categoryLabel}>Category</Text>
        <Text style={styles.categoryValue}>{recipe?.category || "—"}</Text>
      </View>

      {/* Misc icons/info */}
      <View testID="miscContainer" style={[styles.block, styles.misc]}>
        <View style={styles.miscItem}>
          <Text style={styles.miscTop}>{recipe?.mins ?? "—"}</Text>
          <Text style={styles.miscBottom}>mins</Text>
        </View>
        <View style={styles.miscItem}>
          <Text style={styles.miscTop}>{recipe?.servings ?? "—"}</Text>
          <Text style={styles.miscBottom}>servings</Text>
        </View>
        <View style={styles.miscItem}>
          <Text style={styles.miscTop}>{recipe?.calories ?? "—"}</Text>
          <Text style={styles.miscBottom}>calories</Text>
        </View>
        <View style={styles.miscItem}>
          <Text style={styles.miscTop}>{recipe?.type || "—"}</Text>
          <Text style={styles.miscBottom}>type</Text>
        </View>
      </View>

      {/* Ingredients */}
      <View testID="sectionContainer" style={styles.block}>
        <Text style={styles.sectionTitle}>Ingredients</Text>
        <View testID="ingredientsList" style={{ marginTop: 8 }}>
          {(recipe?.ingredients || []).map((ing, i) => (
            <View
              key={(ing?.name || ing)?.toString() + i}
              style={{ flexDirection: "row", gap: 8, marginVertical: 4 }}
            >
              <Text style={{ fontWeight: "700" }}>•</Text>
              <Text style={styles.ingText}>
                {ing?.name || ing} {ing?.measure ? `— ${ing.measure}` : ""}
              </Text>
            </View>
          ))}
          {!recipe?.ingredients?.length && (
            <Text style={styles.ingText}>No ingredients provided.</Text>
          )}
        </View>
      </View>

      {/* Instructions */}
      <View testID="sectionContainer" style={styles.block}>
        <Text style={styles.sectionTitle}>Instructions</Text>
        <Text style={styles.instructionsText}>
          {recipe?.recipeInstructions || "No instructions provided."}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  recipeImage: { width: "100%", height: hp(35) },
  topButtons: {
    position: "absolute",
    top: hp(3),
    left: wp(4),
    right: wp(4),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  backBtn: {
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 22,
  },
  favBtn: {
    backgroundColor: "rgba(255,255,255,0.85)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 22,
  },
  btnText: { color: "#fff", fontWeight: "700" },
  favIcon: { fontSize: 18 },
  block: { paddingHorizontal: wp(5), paddingVertical: hp(2) },
  title: { fontSize: wp(7), fontWeight: "800" },
  categoryLabel: { color: "#666", marginBottom: 4 },
  categoryValue: { fontSize: wp(4.2), fontWeight: "600" },
  misc: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fafafa",
    borderRadius: 16,
  },
  miscItem: { alignItems: "center", flex: 1, paddingVertical: 10 },
  miscTop: { fontWeight: "800", fontSize: wp(4.2) },
  miscBottom: { color: "#666", fontSize: wp(3.2) },
  sectionTitle: { fontWeight: "800", fontSize: wp(5) },
  ingText: { fontSize: wp(3.6), color: "#333" },
  instructionsText: { marginTop: 8, lineHeight: 22, color: "#333" },
});
