import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styles from './home.styles';
import TopTracks from './components/TopTracks.component';

interface RecentlyPlayedItemProps {
  imageUrl: string;
  title: string;
}

/* const RecentlyPlayedItem: React.FC<RecentlyPlayedItemProps> = ({
  imageUrl,
  title,
}) => (
  <TouchableOpacity style={styles.recentlyPlayedItem}>
    <Image source={{uri: imageUrl}} style={styles.recentlyPlayedImage} />
    <Text style={styles.recentlyPlayedTitle}>{title}</Text>
  </TouchableOpacity>
); */

/* interface PlaylistItemProps {
  imageUrl: string;
  title: string;
  description: string;
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({
  imageUrl,
  title,
  description,
}) => (
  <TouchableOpacity style={styles.playlistItem}>
    <Image source={{uri: imageUrl}} style={styles.playlistImage} />
    <Text style={styles.playlistTitle}>{title}</Text>
    <Text style={styles.playlistDescription}>{description}</Text>
  </TouchableOpacity>
); */

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <TopTracks />
    </SafeAreaView>
  );
}
