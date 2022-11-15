import { useState } from 'react';

function VolumeSlider({ volume, setCollab, url, id }) {
  const [currentVolume, setCurrentVolume] = useState(String(volume));


  function handleVolumeChange(e) {
    setCurrentVolume(e.target.value);
    const track = document.getElementById(String(id));
    track.volume=currentVolume/100;
    setCollab((prevState) => {
      const moddedTracks = prevState.tracks.map((el) => {
        if (el.url === url) {
          el.volume = e.target.value;
        }
        return el;
      });
      return {
        ...prevState,
        tracks: moddedTracks
      };
    });
  }

  return (
      <input
        key={url}
        className="volumeSlider"
        type="range"
        min="0"
        max="100"
        onChange={handleVolumeChange}
        value={currentVolume}
      ></input>
  );
}

export default VolumeSlider;
