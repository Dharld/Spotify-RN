import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {theme} from '../styles/theme';

interface NowPlayingBarProps {
  songTitle: string;
  artist: string;
  albumCover: string;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
}

const NowPlayingBar: React.FC<NowPlayingBarProps> = ({
  songTitle,
  artist,
  albumCover,
  isPlaying,
  onPlayPause,
  onNext,
}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: albumCover}} style={styles.albumCover} />
      <View style={styles.songInfo}>
        <Text style={styles.songTitle} numberOfLines={1}>
          {songTitle}
        </Text>
        <Text style={styles.artistName} numberOfLines={1}>
          {artist}
        </Text>
      </View>
      <View style={styles.controls}>
        <TouchableOpacity onPress={onPlayPause} style={styles.controlButton}>
          <Icon
            name={isPlaying ? 'pause' : 'play'}
            size={24}
            color={theme.colors.textPrimary}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onNext} style={styles.controlButton}>
          <Icon
            name="skip-forward"
            size={24}
            color={theme.colors.textPrimary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.secondary,
    padding: theme.spacing.small,
    paddingHorizontal: theme.spacing.small,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    position: 'absolute',
    bottom: 60,
    zIndex: 1000,
  },
  albumCover: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.small,
  },
  songInfo: {
    flex: 1,
    marginLeft: theme.spacing.small,
  },
  songTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.regular,
    fontWeight: theme.fontWeights.bold,
  },
  artistName: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.small,
  },
  controls: {
    flexDirection: 'row',
  },
  controlButton: {
    padding: theme.spacing.xsmall,
    marginLeft: theme.spacing.small,
  },
});

export default NowPlayingBar;
