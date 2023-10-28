/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

LogBox.ignoreAllLogs();

import TrackPlayer from 'react-native-track-player';

export const onRegisterPlayback = async function () {
  TrackPlayer.addEventListener('remote-play', () => {
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener('remote-pause', () => {
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener('remote-seek', ({position}) => {
    TrackPlayer.seekTo(position);
  });
};

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => onRegisterPlayback);
