// Create a singleton audio instance for click sound
const clickSound = new Audio('/click.mp3');
clickSound.preload = 'auto';

// Create a singleton audio instance for background music
const backgroundMusic = new Audio('/background_music.mp3');
backgroundMusic.preload = 'auto';
backgroundMusic.loop = true;
backgroundMusic.volume = 0.3;

export const playClickSound = () => {
    try {
        // Reset playback to start
        clickSound.currentTime = 0;
        // Play the sound
        clickSound.play().catch(err => console.log('Audio play failed:', err));
    } catch (err) {
        console.log('Error playing sound:', err);
    }
};

export const playBackgroundMusic = () => {
    try {
        backgroundMusic.play().catch(err => console.log('Background music play failed:', err));
    } catch (err) {
        console.log('Error playing background music:', err);
    }
};

export const stopBackgroundMusic = () => {
    try {
        backgroundMusic.pause();
    } catch (err) {
        console.log('Error stopping background music:', err);
    }
};

export const getBackgroundMusicState = () => {
    return !backgroundMusic.paused;
};
