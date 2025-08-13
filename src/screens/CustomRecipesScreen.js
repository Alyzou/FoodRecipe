// src/screens/CustomRecipesScreen.js
import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/favoritesSlice";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function CustomRecipesScreen() {
  const navigation = useNavigation();
  const { params } = useRoute();
  const recipe = params?.recipe || params || {};
  const dispatch = useDispatch();

  // Normalized id for fav check
  const favoriteRecipes = useSelector((s) => s.favorites.favoriteRecipes || []);
  const recipeId =
    recipe?.idFood ??
    recipe?.id ??
    (typeof recipe?.title === "string" ? `title:${recipe.title}` : undefined);
  const isFav = favoriteRecipes.some((r) => {
    const rid =
      r?.idFood ??
      r?.id ??
      (typeof r?.title === "string" ? `title:${r.title}` : undefined);
    return rid === recipeId;
  });

  const handleToggleFavorite = () => dispatch(toggleFavorite(recipe));

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View testID="imageContainer">
        {!!recipe?.image && (
          <Image
            source={{ uri: recipe.image }}
            style={[
              styles.articleImage,
              // height index hint from PDF: simulate varying heights
              { height: hp(30) },
            ]}
            resizeMode="cover"
          />
        )}
      </View>

      <View testID="topButtonsContainer" style={styles.topButtons}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backLabel}>GoBack</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={handleToggleFavorite}
        >
          <Text style={styles.heart}>{isFav ? "♥" : "♡"}</Text>
        </TouchableOpacity>
      </View>

      <View testID="contentContainer" style={styles.content}>
        <Text style={styles.title}>{recipe?.title || "Custom Recipe"}</Text>

        <View style={{ marginTop: 10 }}>
          <Text style={styles.contentLabel}>Content</Text>
          <Text style={styles.desc}>
            {recipe?.description || "No description provided."}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  articleImage: { width: "100%" },
  topButtons: {
    position: "absolute",
    top: hp(3),
    left: wp(4),
    right: wp(4),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  backButton: {
    backgroundColor: "rgba(0,0,0,0.65)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  backLabel: { color: "#fff", fontWeight: "700" },
  favoriteButton: {
    backgroundColor: "rgba(255,255,255,0.9)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  heart: { fontSize: 18 },
  content: { padding: wp(5), paddingTop: hp(2) },
  title: { fontWeight: "800", fontSize: wp(6) },
  contentLabel: { fontWeight: "700", marginBottom: 6, color: "#444" },
  desc: { color: "#333", lineHeight: 22 },
});
