import AcquiredReactPlayer from '../AcquiredReactPlayer';

type Props = {
  userStates: any;
};

const VideoContainer = ({ userStates }: Props) => {
  return (
    <div className="bg-gray-900">
      <AcquiredReactPlayer
        userStates={userStates}
        url={userStates?.video?.videoUrl}
      />
    </div>
  );
};

export default VideoContainer;
