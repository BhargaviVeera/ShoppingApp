import { Picker } from '@react-native-picker/picker'; // Make sure to install this package
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../../context/AuthContext';
import { getUploadedItems } from '../../lib/uploadedData';




export default function HomeScreen() {
  const { phone } = useAuth();
  const isAdmin = phone === '7569648872';
  const router = useRouter();
  
  const [selectedCategory, setSelectedCategory] = useState('All');

  const uploadedImages = [
    {
      id: 1,
      uri: 'https://via.placeholder.com/150x150?text=Saree+1',
      category: 'Sarees',
      description: 'Red silk saree with golden border',
    },
    {
      id: 2,
      uri: 'https://via.placeholder.com/150x150?text=Kurti+1',
      category: 'Kurtis',
      description: 'Stylish printed kurti',
    },
    {
      id: 3,
      uri: 'https://via.placeholder.com/150x150?text=Kids+1',
      category: 'Kids',
      description: 'Cute frock for girls',
    },
    {
      id: 4,
      uri: 'https://via.placeholder.com/150x150?text=Bags+1',
      category: 'Bags',
      description: 'Trendy handbag',
    },
    {
      id: 5,
      uri: 'https://via.placeholder.com/150x150?text=Jewelry+1',
      category: 'Jewelry',
      description: 'Gold-plated necklace',
    },
    {
      id: 6,
      uri: 'https://via.placeholder.com/150x150?text=Footwear+1',
      category: 'Footwear',
      description: 'Stylish heels',
    },
    {
      id: 7,
      uri: 'https://via.placeholder.com/150x150?text=Saree+2',
      category: 'Sarees',
      description: 'Kanchipuram bridal saree',
    },
    {
      id: 8,
      uri: 'https://via.placeholder.com/150x150?text=Kurti+2',
      category: 'Kurtis',
      description: 'Floral printed cotton kurti',
    },
  ];

   const filteredImages =
    selectedCategory === 'All'
      ? uploadedImages
      : uploadedImages.filter((item) => item.category === selectedCategory);
  

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      
      {/* Header */}
      <Text style={styles.heading}>Welcome to Lalli Collections 👗</Text>

      {/* Search */}
      <TextInput placeholder="Search for products" style={styles.search} />

      {/* Banners */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bannerContainer}>
        {[1, 2, 3].map((i) => (
          <Image
            key={i}
            source={{ uri: `https://via.placeholder.com/300x120?text=Banner+${i}` }}
            style={styles.banner}
          />
        ))}
      </ScrollView>

      {/* Categories */}
      <Text style={styles.subheading}>Shop by Category</Text>

      <View style={styles.grid}>
        {['Sarees', 'Kurtis', 'Jewelry', 'Kids', 'Bags', 'Footwear'].map((cat) => (
          <View key={cat} style={styles.categoryCard}>
      <TouchableOpacity
          key={cat}
          style={styles.categoryCard}
          onPress={() =>
            router.push({
              pathname: '/home/categories/[category]',
              params: { category: cat.toLowerCase() },
            })
          }
        >
          <Text style={styles.categoryText}>{cat}</Text>
        </TouchableOpacity>


      </View>
        ))}
      </View>

      
      {/* Filter */}
      <Text style={styles.subheading}>Filter by Category</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="All" value="All" />
          <Picker.Item label="Sarees" value="Sarees" />
          <Picker.Item label="Kurtis" value="Kurtis" />
          <Picker.Item label="Kids" value="Kids" />
          <Picker.Item label="Bags" value="Bags" />
          <Picker.Item label="Jewelry" value="Jewelry" />
          <Picker.Item label="Footwear" value="Footwear" />
        </Picker>
      </View>

      {/* Uploaded Products */}
      <Text style={styles.subheading}>Uploaded Items</Text>
      <View style={styles.productGrid}>
        {getUploadedItems().map((item) => (
          <View key={item.id + item.category} style={styles.productCard}>
            <Image source={{ uri: item.uri }} style={styles.productImage} />
            <Text style={styles.productTitle}>{item.category}</Text>
            {item.description && (
              <Text style={styles.productPrice}>{item.description}</Text>
            )}
          </View>
        ))}
      </View>

    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, color: '#FF69B4' },
  search: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#f8f8f8',
  },
  bannerContainer: { marginBottom: 20 },
  banner: { width: 300, height: 120, marginRight: 10, borderRadius: 10 },
  subheading: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryCard: {
    backgroundColor: '#FF69B4',
    width: '48%',
    padding: 5,
    borderRadius: 10,
    marginBottom: 5,
  },
  categoryText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },

  // ✅ Product Grid
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eee',
    padding: 8,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
  },
  productPrice: {
    fontSize: 14,
    color: '#388e3c',
    fontWeight: 'bold',
    marginBottom: 6,
  },

  // ✅ Admin Icon Row
  adminRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  adminIcon: {
    fontSize: 16,
    backgroundColor: '#FF69B4',
    color: 'white',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginRight: 8, 
    overflow: 'hidden',
  },
});
