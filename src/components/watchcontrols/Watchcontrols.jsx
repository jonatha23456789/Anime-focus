import { faBackward, faForward, faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const ToggleButton = ({ label, isActive, onClick }) => (
  <button className="flex gap-x-2" onClick={onClick}>
    <h1 className="capitalize text-[13px]">{label}</h1>
    <span
      className={`capitalize text-[13px] ${
        isActive ? "text-[#ffbade]" : "text-red-500"
      }`}
    >
      {isActive ? "on" : "off"}
    </span>
  </button>
);

export default function WatchControls({
  autoPlay,
  setAutoPlay,
  autoSkipIntro,
  setAutoSkipIntro,
  autoNext,
  setAutoNext,
  episodeId,
  episodes = [],
  onButtonClick,
  animeInfo,
}) {
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(
    episodes?.findIndex(
      (episode) => episode.id.match(/ep=(\d+)/)?.[1] === episodeId
    )
  );

  useEffect(() => {
    if (episodes?.length > 0) {
      const newIndex = episodes.findIndex(
        (episode) => episode.id.match(/ep=(\d+)/)?.[1] === episodeId
      );
      setCurrentEpisodeIndex(newIndex);
    }
  }, [episodeId, episodes]);

  const takeScreenshot = async () => {
    try {
      const playerElement = document.querySelector('.player video');
      if (!playerElement) {
        alert('Video player not found');
        return;
      }

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Set canvas dimensions to match video
      canvas.width = playerElement.videoWidth || playerElement.clientWidth;
      canvas.height = playerElement.videoHeight || playerElement.clientHeight;
      
      // Draw video frame to canvas
      ctx.drawImage(playerElement, 0, 0, canvas.width, canvas.height);
      
      // Convert to blob and download
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${animeInfo?.title || 'anime'}_episode_${episodeId}_screenshot.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 'image/png');
      
      // Show notification
      const notification = document.createElement('div');
      notification.textContent = 'Screenshot saved!';
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        z-index: 9999;
        font-family: Arial, sans-serif;
      `;
      document.body.appendChild(notification);
      
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 3000);
      
    } catch (error) {
      console.error('Screenshot failed:', error);
      alert('Failed to take screenshot. This might be due to CORS restrictions.');
    }
  };

  return (
    <div className="bg-[#11101A] w-full flex justify-between flex-wrap px-4 pt-4 max-[1200px]:bg-[#14151A] max-[375px]:flex-col max-[375px]:gap-y-2">
      <div className="flex gap-x-4 flex-wrap">
        <ToggleButton
          label="auto play"
          isActive={autoPlay}
          onClick={() => setAutoPlay((prev) => !prev)}
        />
        <ToggleButton
          label="auto skip intro"
          isActive={autoSkipIntro}
          onClick={() => setAutoSkipIntro((prev) => !prev)}
        />
        <ToggleButton
          label="auto next"
          isActive={autoNext}
          onClick={() => setAutoNext((prev) => !prev)}
        />
      </div>
      <div className="flex gap-x-6 max-[575px]:gap-x-4 max-[375px]:justify-end">
        <button
          onClick={() => {
            if (currentEpisodeIndex > 0) {
              onButtonClick(
                episodes[currentEpisodeIndex - 1].id.match(/ep=(\d+)/)?.[1]
              );
            }
          }}
          disabled={currentEpisodeIndex <= 0}
        >
          <FontAwesomeIcon
            icon={faBackward}
            className="text-[20px] max-[575px]:text-[16px] text-white"
          />
        </button>
        <button
          onClick={takeScreenshot}
          className="text-white hover:text-[#ffbade] transition-colors duration-200"
          title="Take Screenshot"
        >
          <FontAwesomeIcon
            icon={faCamera}
            className="text-[20px] max-[575px]:text-[16px]"
          />
        </button>
        <button
          onClick={() => {
            if (currentEpisodeIndex < episodes?.length - 1) {
              onButtonClick(
                episodes[currentEpisodeIndex + 1].id.match(/ep=(\d+)/)?.[1]
              );
            }
          }}
          disabled={currentEpisodeIndex >= episodes?.length - 1}
        >
          <FontAwesomeIcon
            icon={faForward}
            className="text-[20px] max-[575px]:text-[16px] text-white"
          />
        </button>
      </div>
    </div>
  );
}
