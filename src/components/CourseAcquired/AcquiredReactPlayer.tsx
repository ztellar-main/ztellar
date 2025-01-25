import ReactPlayer from 'react-player';

type Props = {
  url: string;
  userStates: any;
};

const AcquiredReactPlayer = ({ url, userStates }: Props) => {
  const handleContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
  };
  return (
    <div className="w-full lg:h-[500px]" onContextMenu={handleContextMenu}>
      <ReactPlayer
        key={userStates}
        url={url}
        controls={true}
        playing={true}
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default AcquiredReactPlayer;
