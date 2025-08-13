// src/screens/FavoriteScreen.js
import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function FavoriteScreen() {
  const navigation = useNavigation();
  const favoriteRecipesList =
    useSelector((s) => s.favorites.favoriteRecipes) || [];

  if (!favoriteRecipesList.length) {
    return (
      <View style={styles.emptyWrap}>
        <Text style={styles.emptyText}>No favorite recipes yet!</Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Favorite Recipes</Text>
      </View>

      <TouchableOpacity
        style={[styles.backBtn, { alignSelf: "flex-start", marginLeft: wp(4) }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>Go back</Text>
      </TouchableOpacity>

      <FlatList
        contentContainerStyle={{ padding: wp(4), paddingTop: hp(1) }}
        data={favoriteRecipesList}
        keyExtractor={(it, i) =>
          (it?.idFood?.toString?.() ||
            it?.id?.toString?.() ||
            `${it?.title || it?.recipeName}_${i}`) + ""
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.card}
            onPress={() => navigation.navigate("RecipeDetail", item)}
          >
            {!!(item?.recipeImage || item?.image) && (
              <Image
                source={{ uri: item.recipeImage || item.image }}
                style={styles.image}
              />
            )}
            <View style={{ flex: 1 }}>
              <Text numberOfLines={1} style={styles.title}>
                {item?.recipeName || item?.title || "Recipe"}
              </Text>
              <Text numberOfLines={2} style={styles.desc}>
                {item?.recipeInstructions || item?.description || ""}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  emptyWrap: { flex: 1, alignItems: "center", justifyContent: "center" },
  emptyText: { fontSize: wp(4.5), marginBottom: 12 },
  backBtn: {
    backgroundColor: "#111",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: hp(2),
  },
  backText: { color: "#fff", fontWeight: "700" },
  header: { padding: wp(4), paddingTop: hp(4) },
  headerTitle: { fontSize: wp(6), fontWeight: "800" },
  card: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: "#fafafa",
    padding: 12,
    borderRadius: 14,
    marginBottom: 12,
    alignItems: "center",
  },
  image: { width: 64, height: 64, borderRadius: 10 },
  title: { fontWeight: "700", fontSize: wp(4) },
  desc: { color: "#555", marginTop: 2 },
});
