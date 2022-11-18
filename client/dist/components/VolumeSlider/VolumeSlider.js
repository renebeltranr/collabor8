import { useEffect, useState } from "react";
import "./VolumeSlider.css";
function VolumeSlider({ volume, setCollab, url, id }) {
    const [currentVolume, setCurrentVolume] = useState(String(volume));
    useEffect(() => {
        const track = document.getElementById(String(id));
        if (track)
            track.volume = currentVolume / 100;
    }, [currentVolume]);
    function handleVolumeChange(e) {
        setCurrentVolume(e.target.value);
        const track = document.getElementById(String(id));
        track.volume = currentVolume / 100;
        //
        if (id[0] === "t") {
            setCollab((prevState) => {
                const moddedTracks = prevState.tracks.map((el) => {
                    if (el.url === url) {
                        el.volume = Number(e.target.value);
                    }
                    return el;
                });
                return Object.assign(Object.assign({}, prevState), { tracks: moddedTracks });
            });
        }
    }
    return (React.createElement("input", { key: url, className: "volumeSlider", type: "range", min: "0", max: "100", onChange: handleVolumeChange, value: currentVolume }));
}
export default VolumeSlider;
//# sourceMappingURL=VolumeSlider.js.map