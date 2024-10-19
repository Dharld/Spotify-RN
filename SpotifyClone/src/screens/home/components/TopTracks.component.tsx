import React, {useCallback, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTopTracks} from '../../../store/slices/music/music.actions';
import {RootState, AppDispatch} from '../../../store/store';
import Icon from 'react-native-vector-icons/Feather';
import {theme} from '../../../styles/theme';
import InteractivePlayButton from '../../../components/PlayButton.component';
import audioService from '../../../api/services/audio.service';
import showToast from '../../../ui/toast.service';
import {useAudioPlayerContext} from '../../../api/services/audio.context';

interface TopTracksProps {}

const TopTracks: React.FC<TopTracksProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {topTracks, status} = useSelector((state: RootState) => state.music);
  const {currentSong, playSong, pauseSong, isPlaying} = useAudioPlayerContext();
  const {error} = showToast;

  useEffect(() => {
    dispatch(fetchTopTracks());
  }, [dispatch]);

  const handlePlay = (item: any) => {
    playSong(item);
  };

  /** Rendered component */
  const renderTrackItem = useCallback(
    ({item, index}: {item: any; index: number}) => (
      <View style={styles.gridItem}>
        <Image
          source={{uri: item.image || 'https://picsum.photos/200'}}
          style={styles.gridAlbumCover}
        />
        <Text style={styles.gridTrackName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.gridArtistName} numberOfLines={1}>
          {item.artist}
        </Text>
        <InteractivePlayButton
          onPress={() => handlePlay(item)}
          size={36}
          isPlaying={currentSong == item}
        />
      </View>
    ),
    [currentSong],
  );

  /** Loading State */
  if (status === 'loading') {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  /** Failed State */
  if (status === 'failed') {
    return (
      <View style={styles.centerContainer}>
        <Icon name="alert-circle" size={50} color={theme.colors.error} />
        <Text style={styles.errorText}>Failed to load top tracks</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Tracks</Text>
      <FlatList
        data={topTracks}
        keyExtractor={item => item.id || item.name}
        renderItem={renderTrackItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.gridContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.medium,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.medium,
  },
  gridContent: {
    // paddingHorizontal: theme.spacing.small,
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
  gridItem: {
    width: Dimensions.get('window').width / 2 - theme.spacing.medium * 2,
    marginBottom: theme.spacing.medium,
    alignItems: 'center',
    position: 'relative',
  },
  gridAlbumCover: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: theme.borderRadius.small,
    marginBottom: theme.spacing.xsmall,
  },
  gridTrackName: {
    fontSize: theme.fontSizes.sectionTitle,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    textAlign: 'center',
  },

  gridArtistName: {
    fontSize: theme.fontSizes.regular,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  errorText: {
    marginTop: theme.spacing.small,
    fontSize: theme.fontSizes.regular,
    color: theme.colors.error,
  },
});

export default TopTracks;
