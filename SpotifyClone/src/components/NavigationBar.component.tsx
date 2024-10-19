import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import {theme} from '../styles/theme';

import SearchScreen from '../screens/search/search.screen';
import LibraryScreen from '../screens/library/Library.screen';
import NowPlayingBar from './NowPlaying.component';
import HomeScreen from '../screens/home/home.screen';
import {useAudioPlayerContext} from '../api/services/audio.context';

const Tab = createBottomTabNavigator();

// Sub Icon to render the tab icons
const TabIcon = ({name, focused}: {name: string; focused: boolean}) => (
  <View style={styles.tabIconContainer}>
    <Icon
      name={name}
      size={24}
      color={focused ? theme.colors.active : theme.colors.textSecondary}
    />
  </View>
);

/** Tab label */
const TabLabel = ({label, focused}: {label: string; focused: boolean}) => (
  <Text
    style={[
      styles.tabLabel,
      focused ? styles.tabLabelFocused : styles.tabLabelUnfocused,
    ]}>
    {label}
  </Text>
);

/** Tab navigators */
const MainTabs = () => {
  const {isPlaying, currentSong} = useAudioPlayerContext();

  const handlePlayPause = () => {};

  const handleNext = () => {
    // Logic to play next song
    console.log('Next song');
  };

  return (
    <View style={styles.container}>
      {currentSong && (
        <NowPlayingBar
          songTitle={currentSong.name}
          artist={currentSong.artist}
          albumCover={currentSong.image}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onNext={handleNext}
        />
      )}
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: theme.colors.active,
          tabBarInactiveTintColor: theme.colors.textSecondary,
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <TabIcon name="home" focused={focused} />
            ),
            tabBarLabel: ({focused}) => (
              <TabLabel label="Home" focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <TabIcon name="search" focused={focused} />
            ),
            tabBarLabel: ({focused}) => (
              <TabLabel label="Search" focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="Your Library"
          component={LibraryScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <TabIcon name="list" focused={focused} />
            ),
            tabBarLabel: ({focused}) => (
              <TabLabel label="Your Library" focused={focused} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  tabBar: {
    backgroundColor: theme.colors.background,
    borderTopWidth: 0,
    height: 60,
    paddingBottom: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 10, // for
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  tabLabel: {
    fontSize: theme.fontSizes.xsmall,
    marginTop: 2,
  },
  tabLabelFocused: {
    color: theme.colors.active,
  },
  tabLabelUnfocused: {
    color: theme.colors.textSecondary,
  },
});

export default MainTabs;
