import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const router = useRouter();
  const { phone, setPhone } = useAuth();

  const [inputPhone, setInputPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPasswordField, setShowPasswordField] = useState(false);

  const handleLogin = () => {
    // Admin logic
    if (inputPhone === '7569648872') {
      if (!showPasswordField) {
        setShowPasswordField(true); // Show password field first
        return;
      } else {
        if (password !== 'Admin@123') {
          alert('Incorrect admin password');
          return;
        }
      }
    }

    // Validate phone
    if (inputPhone.length === 10) {
      setPhone(inputPhone); // save in auth context
      router.replace('/home/tabs'); // Go to Home
    } else {
      alert('Please enter a valid 10-digit phone number');
    }
  };

  return (
    <ImageBackground source={require('../assets/images/splash.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome To Lalli Collections..!</Text>

        <TextInput
          placeholder="Enter Phone Number"
          keyboardType="phone-pad"
          maxLength={10}
          style={styles.input}
          value={inputPhone}
          onChangeText={setInputPhone}
        />

        {/* Admin password field */}
        {showPasswordField && inputPhone === '7569648872' && (
          <TextInput
            placeholder="Enter Admin Password"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
        )}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    marginTop: 200,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#fff',
    width: '100%',
  },
  button: {
    backgroundColor: '#FF69B4',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
