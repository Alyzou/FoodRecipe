import { View, Text, Pressable, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

export default function Recipe({ foods }) {
  const navigation = useNavigation();

  // Render individual recipe card
  const renderItem = ({ item, index }) => (
    <RecipeCard item={item} index={index} navigation={navigation} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={foods}
        renderItem={renderItem}
        keyExtractor={(item) => item.recipeId}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        testID="recipesDisplay"
      />
    </View>
  );
}

// Recipe Card Component
const RecipeCard = ({ item, index, navigation }) => {
  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate('RecipeDetail', { recipeId: item.recipeId })}
      style={styles.cardContainer}
      testID={`recipeCard-${item.recipeId}`}
    >
      <Image 
        source={{ uri: item.recipeImage }} 
        style={styles.articleImage} 
      />
      <Text style={styles.articleText}>{item.recipeName}</Text>
      <Text style={styles.articleDescription}>{item.cookingDescription}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(4), // mx-4 equivalent
    marginTop: hp(2),
  },
  row: {
    justifyContent: 'space-between', // Align columns evenly
  },
  listContent: {
    paddingBottom: hp(4), // Add bottom padding
  },
  cardContainer: {
    width: '48%', // Two columns with spacing
    marginBottom: hp(3),
    overflow: 'hidden',
    borderRadius: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  articleImage: {
    width: '100%',
    height: hp(20), // Adjust height as needed
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  articleText: {
    fontSize: hp(1.7),
    fontWeight: 'bold',
    color: '#333',
    marginLeft: wp(2),
    marginTop: hp(1),
  },
  articleDescription: {
    fontSize: hp(1.3),
    color: '#666',
    marginLeft: wp(2),
    marginTop: hp(0.5),
    marginBottom: hp(1.5),
  },
});