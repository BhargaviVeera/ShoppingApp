// app/components/CategoryScreen.tsx
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { addUploadedItem } from '../lib/uploadedData';


import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function CategoryScreen({ title }: { title: string }) {
  const { phone } = useAuth();
  const isAdmin = phone === '7569648872';

  const [showDescModal, setShowDescModal] = useState(false);
  const [tempDescription, setTempDescription] = useState('');
  const [activeId, setActiveId] = useState<number | null>(null);

  const [images, setImages] = useState<{ uri: string; description?: string; id: number }[]>(
    Array.from({ length: 50 }, (_, i) => ({
      uri: `https://via.placeholder.com/400x300?text=${title}+${i + 1}`,
      id: i + 1,
    }))
  );

  const handleUpload = async (id: number) => {
    addUploadedItem({ id, uri: result.assets[0].uri, category: title });

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const updated = [...images];
      const index = updated.findIndex((item) => item.id === id);
      if (index !== -1) {
        updated[index].uri = result.assets[0].uri;
        setImages(updated);
      }
    }
  };

  const handleAddDescription = (id: number) => {
    setActiveId(id);
    const existing = images.find((img) => img.id === id);
    setTempDescription(existing?.description || '');
    setShowDescModal(true);
  };

  const handleSaveDescription = () => {
  if (activeId !== null) {
    const updated = [...images];
    const index = updated.findIndex((item) => item.id === activeId);
    if (index !== -1) {
      updated[index].description = tempDescription;
      setImages(updated);

      addUploadedItem({
        id: updated[index].id,
        uri: updated[index].uri,
        description: tempDescription,
        category: title,
      });
    }
  }
}; // 



  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>{title} Collection</Text>

      {images.map((item) => (
        <View key={item.id} style={styles.card}>
          <Image source={{ uri: item.uri }} style={styles.image} />
          {isAdmin && (
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleUpload(item.id)}>
                <Ionicons name="cloud-upload-outline" size={24} color="#FF69B4" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleAddDescription(item.id)}>
                <Ionicons name="create-outline" size={24} color="#388E3C" />
              </TouchableOpacity>
            </View>
          )}
          {item.description && <Text style={styles.description}>{item.description}</Text>}
        </View>
      ))}

      {/* Modal for Description */}
      <Modal
        transparent
        visible={showDescModal}
        animationType="slide"
        onRequestClose={() => setShowDescModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Enter Description</Text>
            <TextInput
              value={tempDescription}
              onChangeText={setTempDescription}
              placeholder="Type description..."
              style={styles.modalInput}
              multiline
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={handleSaveDescription}>
                <Text style={styles.saveBtn}>Save</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setShowDescModal(false)}>
                <Text style={styles.cancelBtn}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, color: '#FF69B4' },
  card: { marginBottom: 20 },
  image: { width: '100%', height: 300, borderRadius: 10 },
  actions: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 20,
  },
  description: {
    marginTop: 6,
    color: '#555',
    fontSize: 14,
    fontStyle: 'italic',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  saveBtn: {
    backgroundColor: '#4CAF50',
    color: 'white',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    overflow: 'hidden',
  },
  cancelBtn: {
    backgroundColor: '#FF5252',
    color: 'white',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    overflow: 'hidden',
  },
});
