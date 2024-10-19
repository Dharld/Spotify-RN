import React, {createContext, ReactNode, useContext, useState} from 'react';
import AudioService from './audio.service'; // Ensure the path is correct for your project
import showToast from '../../ui/toast.service';

// Define the Sound interface
interface Sound {
  name: string;
  artist: string;
  previewUrl: string;
  albumCover: string;
}

// Define the shape of the context
interface AudioPlayerContextType {
  currentSong: Sound | null;
  setCurrentSong: (song: Sound | null) => void;
  playSong: (song: Sound) => Promise<void>;
  pauseSong: () => void;
  stopSong: () => void;
  isPlaying: boolean;
}

// Create the Audio Player Context
const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(
  undefined,
);

// Audio Provider component
export const AudioPlayerProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const [currentSong, setCurrentSong] = useState<Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const {error} = showToast;

  // Play a song using the AudioService
  const playSong = async (song: Sound) => {
    console.log(song);
    if (!song.previewUrl) {
      error("There's no preview available for this song", 'Error');
      return;
    }
    // If the song is already the current song and is playing, do nothing
    if (
      currentSong &&
      currentSong.previewUrl === song.previewUrl &&
      isPlaying
    ) {
      console.log('The song is already playing');
      return;
    }

    // If a new song is selected, stop the current one
    if (currentSong && currentSong.previewUrl !== song.previewUrl) {
      AudioService.stop();
    }

    // Set the new song
    setCurrentSong(song);

    // Load and play the new song
    try {
      await AudioService.loadSound(song.previewUrl);
      await AudioService.play();
      setIsPlaying(true);
    } catch (error) {
      console.error('Error playing song:', error);
    }
  };

  // Pause the current song using the AudioService
  const pauseSong = () => {
    AudioService.pause();
    setIsPlaying(false);
  };

  // Stop the current song using the AudioService
  const stopSong = () => {
    AudioService.stop();
    setIsPlaying(false);
  };

  return (
    <AudioPlayerContext.Provider
      value={{
        currentSong,
        setCurrentSong,
        playSong,
        pauseSong,
        stopSong,
        isPlaying,
      }}>
      {children}
    </AudioPlayerContext.Provider>
  );
};

// Custom hook to use the Audio Player Context
export const useAudioPlayerContext = (): AudioPlayerContextType => {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error(
      'useAudioPlayerContext must be used within an AudioPlayerProvider',
    );
  }
  return context;
};
