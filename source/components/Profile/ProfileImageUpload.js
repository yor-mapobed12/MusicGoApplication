import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  useColorScheme,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
} from 'react-native-alert-notification';
import {Light, Dark} from '../Theme/Colors';
import NewBottomTab from '../NewBottomTab/NewBottomTab';

const ProfileImageUpload = ({navigation}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState('');
  const scrollViewRef = useRef(null);

  const getData = async () => {
    const res = await AsyncStorage.getItem('profileImageURL');

    setSelectedImage(res);

    const names = await AsyncStorage.getItem('Name');

    setName(names);
  };

  useEffect(() => {
    getData();
  }, []);

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const pickImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setSelectedImage(image.path);
      })
      .catch(error => {
        console.log('Image picker error:', error);
      });
  };

  const handleNameChange = text => {
    setName(text);
  };

  const uploadImage = async path => {
    try {
      const response = await fetch(path);
      const blob = await response.blob();

      const storageRef = storage().ref(`/profile/${name}.jpg`);
      await storageRef.put(blob);

      const downloadUrl = await storageRef.getDownloadURL();

      await AsyncStorage.setItem('profileImageURL', downloadUrl);
    } catch (error) {
      console.log('Image upload error:', error);
    }
  };

  const UploadName = async () => {
    await AsyncStorage.setItem('Name', name); // Corrected the function
  };

  const NameError = () => {
    Dialog.show({
      type: ALERT_TYPE.DANGER,
      title: 'Alert',
      textBody: 'Please Enter the Name',
      button: 'close',
    });
  };

  const ImageError = () => {
    Dialog.show({
      type: ALERT_TYPE.DANGER,
      title: 'Alert',
      textBody: 'Please Add an Image',
      button: 'close',
      // autoClose: 2000,
    });
  };

  const UploadSuccess = () => {
    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Successful 👍',
      textBody: 'Profile Uploaded Successfully',
      button: 'close',
      autoClose: 2000,
    });
  };

  const UpdateButton = () => {
    if (name.trim() === '') {
      NameError();
    } else if (!selectedImage) {
      ImageError();
    } else {
      uploadImage(selectedImage);
      UploadName();
      UploadSuccess();
    }
  };

  const [focus, setFocus] = useState(false);

  return (
    <AlertNotificationRoot>
      <View style={{backgroundColor: isDarkMode ? Dark.bg : Light.bg, flex: 1}}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <ScrollView
            ref={scrollViewRef}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}>
            <View
              style={{
                alignItems: 'center',
                flex: 1,
                paddingTop: '5%',
              }}>
              <View
                style={{
                  width: '85%',
                  height: '70%',
                  backgroundColor: 'transparent',
                  borderWidth: 2,
                  // borderColor: '#800080',
                  borderRadius: 10, // Border radius
                  borderStyle: 'dashed',
                  borderColor: selectedImage ? 'transparent' : '#800080',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 16,
                }}>
                {selectedImage ? (
                  <>
                    <Image
                      source={{uri: selectedImage}}
                      style={{
                        width: '100%',
                        height: '100%',
                        marginTop: '12%',
                        position: 'absolute',
                        borderRadius: 20,
                      }}
                    />
                    <TouchableOpacity
                      style={[
                        styles.buttonBg,
                        {
                          marginTop: '120%',
                          backgroundColor: isDarkMode
                            ? Dark.textColor
                            : Light.textColor,
                        },
                      ]}
                      onPress={pickImage}>
                      <Text
                        style={[
                          styles.buttonText,
                          {color: isDarkMode ? '#000' : '#fff'},
                        ]}>
                        Change Photo
                      </Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity
                    style={[
                      styles.buttonBg,
                      {
                        backgroundColor: isDarkMode
                          ? Dark.textColor
                          : Light.textColor,
                      },
                    ]}
                    onPress={pickImage}>
                    <Text
                      style={[
                        styles.buttonText,
                        {color: isDarkMode ? '#000' : '#fff'},
                      ]}>
                      Add Photo
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              <TextInput
                onFocus={() => {
                  setFocus(true);
                }}
                onBlur={() => {
                  setFocus(false);
                }}
                style={[
                  styles.input,
                  {
                    backgroundColor: isDarkMode
                      ? Dark.textColor
                      : Light.textColor,

                    color: isDarkMode ? '#000' : '#fff',
                  },
                ]}
                placeholder="Name"
                placeholderTextColor={isDarkMode ? '#000' : '#fff'}
                value={name}
                onChangeText={handleNameChange}
              />

              <TouchableOpacity
                style={[
                  styles.buttonBg,
                  {
                    marginTop: '5%',
                    backgroundColor: isDarkMode
                      ? Dark.textColor
                      : Light.textColor,
                  },
                ]}
                onPress={UpdateButton}>
                <Text
                  style={[
                    styles.buttonText,
                    {color: isDarkMode ? '#000' : '#fff'},
                  ]}>
                  Update
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </View>
      {!focus && (
        <View style={{bottom: 0}}>
          <NewBottomTab navigation={navigation} />
        </View>
      )}
    </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  buttonBg: {
    // backgroundColor: '#800080',
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    position: 'relative',
  },
  input: {
    width: '80%',
    height: '8%',
    borderWidth: 1,
    color: '#000',
    // backgroundColor: '#f0c4f0',
    borderWidth: 1,
    borderColor: '#800080', // Border color
    borderRadius: 10, // Border radius
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default ProfileImageUpload;
