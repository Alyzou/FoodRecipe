// src/screens/HomeScreen.js
import React, { useState } from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Categories from "../components/categories";
import Recipes from "../components/recipes";

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("Chicken");

  // Categories
  const categories = [
    {
      idCategory: 1,
      strCategory: "Chicken",
      strCategoryThumb:
        "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
    },
    {
      idCategory: 2,
      strCategory: "Vegetarian",
      strCategoryThumb:
        "https://images.unsplash.com/photo-1526312426976-593c125c02d5?q=80&w=1200&auto=format&fit=crop",
    },
    {
      idCategory: 3,
      strCategory: "Dessert",
      strCategoryThumb:
        "https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?q=80&w=1200&auto=format&fit=crop",
    },
    {
      idCategory: 4,
      strCategory: "Pasta",
      strCategoryThumb:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  // Recipes data (short demo set)
  const allFood = [
    {
      idFood: 101,
      category: "Chicken",
      recipeName: "Garlic Butter Chicken",
      recipeImage:
        "https://images.unsplash.com/photo-1585325701954-191c7b1c0af1?q=80&w=1200&auto=format&fit=crop",
      recipeInstructions:
        "Sear chicken in butter, add garlic, herbs, and finish in the pan.",
      ingredients: [
        { name: "Chicken breast", measure: "2 pcs" },
        { name: "Butter", measure: "2 tbsp" },
        { name: "Garlic", measure: "3 cloves" },
      ],
      mins: 25,
      servings: 2,
      calories: 520,
      type: "Main",
    },
    {
      idFood: 102,
      category: "Vegetarian",
      recipeName: "Roasted Veggies Bowl",
      recipeImage:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop",
      recipeInstructions:
        "Roast seasonal vegetables and serve over quinoa with tahini.",
      ingredients: [
        { name: "Mixed veg", measure: "3 cups" },
        { name: "Quinoa", measure: "1 cup" },
        { name: "Tahini", measure: "2 tbsp" },
      ],
      mins: 30,
      servings: 2,
      calories: 430,
      type: "Main",
    },
    {
      idFood: 103,
      category: "Dessert",
      recipeName: "Chocolate Mousse",
      recipeImage:
        "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1200&auto=format&fit=crop",
      recipeInstructions:
        "Melt chocolate, fold with whipped cream, chill until set.",
      ingredients: [
        { name: "Dark chocolate", measure: "150 g" },
        { name: "Cream", measure: "200 ml" },
        { name: "Sugar", measure: "2 tbsp" },
      ],
      mins: 15,
      servings: 4,
      calories: 310,
      type: "Dessert",
    },
    {
      idFood: 104,
      category: "Pasta",
      recipeName: "Pesto Pasta",
      recipeImage:
        "https://images.unsplash.com/photo-1523983302122-73e702a3b88d?q=80&w=1200&auto=format&fit=crop",
      recipeInstructions:
        "Boil pasta, toss with basil pesto and parmesan. Serve warm.",
      ingredients: [
        { name: "Pasta", measure: "200 g" },
        { name: "Pesto", measure: "3 tbsp" },
        { name: "Parmesan", measure: "to taste" },
      ],
      mins: 20,
      servings: 2,
      calories: 600,
      type: "Main",
    },
  ];

  const handleChangeCategory = (cat) => setActiveCategory(cat);
  const filteredfoods = allFood.filter((f) => f.category === activeCategory);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView testID="scrollContainer" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View testID="headerContainer" style={styles.header}>
          <Image
            source={{
              uri: "https://i.pravatar.cc/120",
            }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.hello}>Hello,</Text>
            <Text style={styles.user}>User!</Text>
          </View>
        </View>

        {/* Title */}
        <View testID="titleContainer" style={styles.titleWrap}>
          <Text style={styles.bigTitle}>Make your own food</Text>
          <Text style={styles.subtitle}>stay at home</Text>
        </View>

        {/* Categories */}
        <View testID="categoryList" style={{ marginTop: hp(1) }}>
          <Categories
            categories={categories}
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
          />
        </View>

        {/* Recipes */}
        <View testID="foodList" style={{ marginTop: hp(2) }}>
          <Recipes foods={filteredfoods} categories={categories} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f7f7" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
    gap: 12,
  },
  avatar: { width: 48, height: 48, borderRadius: 24 },
  hello: { color: "#444" },
  user: { fontWeight: "700", fontSize: wp(5) },
  titleWrap: { paddingHorizontal: wp(5), marginTop: hp(2) },
  bigTitle: { fontSize: wp(8), fontWeight: "800" },
  subtitle: { color: "#666", marginTop: 4 },
});
