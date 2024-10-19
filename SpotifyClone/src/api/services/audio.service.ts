import Sound from 'react-native-sound';

class AudioService {
  private sound: Sound | null = null;

  constructor() {
    Sound.setCategory('Playback');
  }

  loadSound(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.sound = new Sound(url, '', error => {
        if (error) {
          console.log('Failed to load the sound', error);
          reject(error);
        } else {
          console.log('Sound loaded successfully');
          resolve();
        }
      });
    });
  }

  play(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.sound) {
        reject(new Error('No sound loaded'));
        return;
      }

      this.sound.play(success => {
        if (success) {
          console.log('Sound played successfully');
          resolve();
        } else {
          console.log('Playback failed due to audio decoding errors');
          reject(new Error('Playback failed'));
        }
      });
    });
  }

  pause(): void {
    if (this.sound) {
      this.sound.pause();
    }
  }

  stop(): void {
    if (this.sound) {
      this.sound.stop();
    }
  }

  release(): void {
    if (this.sound) {
      this.sound.release();
      this.sound = null;
    }
  }
}

export default new AudioService();
