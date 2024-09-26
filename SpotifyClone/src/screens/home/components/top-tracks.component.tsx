import React, {useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTopTracks} from '../../../store/slices/music/music.actions';
import {RootState, AppDispatch} from '../../../store/store';

interface TopTracksProps {}

const TopTracks: React.FC<TopTracksProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {topTracks, status} = useSelector((state: RootState) => state.music);

  useEffect(() => {
    dispatch(fetchTopTracks());
  }, [dispatch]);

  if (status === 'loading') {
    return <Text>Loading top tracks...</Text>;
  }

  if (status === 'failed') {
    return <Text style={{color: 'white'}}>This is my error</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Tracks</Text>
      <FlatList
        data={topTracks}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.trackItem}>
            <Text style={styles.trackName}>{item.name}</Text>
            <Text style={styles.artistName}>{item.artist}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  trackItem: {
    marginBottom: 10,
  },
  trackName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  artistName: {
    fontSize: 14,
    color: 'gray',
  },
});

export default TopTracks;
