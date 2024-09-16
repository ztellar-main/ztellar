import React, { useEffect, useRef } from 'react';
import shaka from 'shaka-player/dist/shaka-player.ui';
import 'shaka-player/dist/controls.css'; // Import Shaka Player UI styles

interface ShakaPlayerWithUIProps {
  src: string;
  setVideoState: any;
}

const ShakaPlayerWithUI: React.FC<ShakaPlayerWithUIProps> = ({
  src,
  setVideoState,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const uiContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const result = async () => {
      if (!videoRef.current || !uiContainerRef.current)
        return console.log('something');
      // Initialize Shaka Player
      const player = new shaka.Player(videoRef.current);

      // Initialize Shaka UI
      const ui = new shaka.ui.Overlay(
        player,
        uiContainerRef.current,
        videoRef.current
      );

      const config = {
        controlPanelElements: [
          'play_pause',
          'time_and_duration',
          'mute',
          'volume',
          'spacer',
          'quality',
          'fullscreen',
        ],
        seekBarColors: {
          base: '#eff6ff',
          buffered: '#93c5fd',
          played: '#2563eb',
        },
        volumeBarColors: {
          base: '#eff6ff',
          level: '#2563eb',
        },
        castReceiverAppId: '07AEE832',
        // Enable casting to native Android Apps (e.g. Android TV Apps)
        castAndroidReceiverCompatible: true,
        enableTooltips: true,

        //   enableKeyboardPlaybackControls: true,
      };

      ui.configure(config);

      const controls = ui.getControls();

      // Error handling
      const onError = (event: any) => {
        console.error('Error code', event.code, 'object', event);
      };

      player.addEventListener('error', onError);

      if (!controls) {
        return;
      }

      controls.addEventListener('error', onError);

      // Load the video
      try {
        await player.load(src);
        setVideoState({
          message: 'The video is already uploaded and functioning properly',
          status: 'success',
        });
      } catch (err) {
        setVideoState({
          message: "The video hasn't been uploaded yet",
          status: 'error',
        });
        console.log('Something went wrong');
        // Cleanup on unmount
        return () => {
          ui.destroy();
          player.destroy();
        };
      }

      // Cleanup on unmount
      return () => {
        ui.destroy();
        player.destroy();
      };
    };

    result();
  }, [src]);

  return (
    <div
      className="w-100 flex items-center justify-center h-[600px] laptop:h-[400px] mobile:h-[auto] mobile:min-h-[250px]"
      ref={uiContainerRef}
    >
      <video ref={videoRef} autoPlay={true} className="w-100 h-[100%] " />
    </div>
  );
};

export default ShakaPlayerWithUI;
