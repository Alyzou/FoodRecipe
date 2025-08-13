// src/components/recipes.js
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Recipe = ({ categories, foods }) => {
  const navigation = useNavigation();

  const ArticleCard = ({ item, index }) => {
    return (
      <View testID="articleDisplay" style={styles.cardWrap}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("RecipeDetail", item)}
          style={styles.card}
        >
          {!!item?.recipeImage && (
            <Image
              source={{ uri: item.recipeImage }}
              style={[
                styles.image,
                { height: index % 3 === 0 ? hp(22) : hp(28) },
              ]}
              resizeMode="cover"
            />
          )}
          <View style={styles.textWrap}>
            <Text numberOfLines={1} style={styles.title}>
              {item?.recipeName || "Recipe"}
            </Text>
            <Text numberOfLines={2} style={styles.desc}>
              {item?.recipeInstructions || "Tap to view details"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View testID="recipesDisplay" style={styles.container}>
      <FlatList
        data={foods || []}
        keyExtractor={(it, i) =>
          (it?.idFood?.toString?.() ||
            it?.id?.toString?.() ||
            `${it?.recipeName}_${i}`) + ""
        }
        numColumns={2}
        renderItem={({ item, index }) => (
          <ArticleCard item={item} index={index} />
        )}
        columnWrapperStyle={{ gap: wp(3) }}
        contentContainerStyle={{ paddingBottom: hp(4) }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Recipe;

const styles = StyleSheet.create({
  container: { paddingHorizontal: wp(4), paddingTop: hp(1) },
  cardWrap: { flex: 1 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: hp(2),
    elevation: 2,
  },
  image: { width: "100%" },
  textWrap: { padding: 12 },
  title: { fontWeight: "700", fontSize: wp(4) },
  desc: { marginTop: 4, fontSize: wp(3.2), color: "#555" },
});
