import {View, Text, StyleSheet, Image, useColorScheme} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Light, Dark} from '../Theme/Colors';

const PlayerCurrentLocation = ({location}) => {
  const [userName, setUserName] = useState(''); // State for user name
  const [profileImageUrl, setProfileImageUrl] = useState(''); // State for profile image URL

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  useEffect(() => {
    AsyncStorage.getItem('Name')
      .then(value => {
        if (value) {
          setUserName(value);
        }
      })
      .catch(error => {
        console.error('Error retrieving user name: ', error);
      });

    AsyncStorage.getItem('profileImageURL')
      .then(value => {
        if (value) {
          setProfileImageUrl(value);
        }
      })
      .catch(error => {
        console.error('Error retrieving profile image URL: ', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.TextContainer}>
        <Text
          style={[
            styles.text,
            {color: isDarkMode ? Dark.textColor : Light.textColor},
          ]}>
          Currently At this Location : {location}
        </Text>
      </View>

      <View style={styles.ImageContainer}>
        <View style={[styles.imageBackground, {padding: 5}]}>
          <Image source={{uri: profileImageUrl}} style={styles.profileImage} />
        </View>
        <Text
          style={[
            styles.userName,
            {color: isDarkMode ? Dark.textColor : Light.textColor},
          ]}>
          {userName}
        </Text>
      </View>
      {/* <View style={styles.ImageContainer}>
        <View
          style={[
            styles.imageBackground,
            {backgroundColor: isDarkMode ? Dark.textColor : Light.textColor},
          ]}>
          <FontAwesome5
            name="smile-beam"
            size={95}
            color={isDarkMode ? Dark.textColor : Light.textColor}
            style={{
              backgroundColor: isDarkMode ? Dark.bg : Light.bg,
              borderRadius: 50,
            }}
          />
        </View>
        <Text
          style={[
            styles.userName,
            {color: isDarkMode ? Dark.textColor : Light.textColor},
          ]}>
          And others...
        </Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '30%',
  },
  TextContainer: {
    marginLeft: '5%',
    alignContent: 'flex-end',
  },
  text: {
    // color: '#800080',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 85,
    height: 85,
    borderRadius: 50,
  },
  imageBackground: {
    // backgroundColor: '#800080', // Violet background color
    borderRadius: 50, // Make it circular
    // padding: 5, // Add some padding
  },
  ImageContainer: {
    flexDirection: 'row',
    marginLeft: '5%',
    alignItems: 'center', // Center vertically
    marginTop: '5%',
  },
  userName: {
    // color: '#800080',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: '5%',
  },
});

export default PlayerCurrentLocation;
