import {View, Text, StyleSheet, useColorScheme} from 'react-native';
import React from 'react';
import {Light, Dark} from '../Theme/Colors';

const ProfileTitle = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <View style={{backgroundColor: isDarkMode ? Dark.bg : Light.bg}}>
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.text1,
            {color: isDarkMode ? Dark.textColor : Light.textColor},
          ]}>
          Edit Profile
        </Text>
        <Text
          style={[
            styles.text2,
            {color: isDarkMode ? Dark.textColor : Light.textColor},
          ]}>
          Mirror, Mirror on the Wall...
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  textContainer: {
    marginLeft: '7%',
  },
  text1: {
    marginTop: '5%',
    fontSize: 23,
    fontWeight: 'bold',
  },
  text2: {
    fontSize: 16,
    fontWeight: '700',
  },
});

export default ProfileTitle;
