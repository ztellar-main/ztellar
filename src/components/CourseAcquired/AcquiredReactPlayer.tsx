import ReactPlayer from 'react-player';

type Props = {
  url: string;
};

const AcquiredReactPlayer = ({ url }: Props) => {
  const handleContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
  };
  return (
    <div className="w-100 flex items-center justify-center h-[600px] laptop:h-[400px] mobile:h-[auto] mobile:min-h-[250px]">
      <div className="w-100 h-[100%]" onContextMenu={handleContextMenu}>
        <ReactPlayer
          url={url}
          controls={true}
          playing={true}
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default AcquiredReactPlayer;
