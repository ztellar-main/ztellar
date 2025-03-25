// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';

const SubscribeMoviePage = () => {
  const query = new URLSearchParams(location.search);
  const productId = query.get('id') || '';

  console.log(productId);

  // const {data, isLoading} = useQuery({
  //     queryKey: ["query-subscribe_movies"],
  //     queryFn: async() => {
  //         const res = await axios({
  //             method:
  //         })
  //     }
  // })

  return (
    <div>
      <iframe
        src="https://player.vdocipher.com/v2/?otp=20160313versASE323UzKJkDKy2Jr78aQfHUaWiznmGFuLRgG9QTDPlAVTdrgmKo&playbackInfo=eyJ2aWRlb0lkIjoiOWEwM2U1NDg3NjM2NDVmMDlkZTBlNTBlNDBmYjkzODgifQ=="
        style={{
          border: '0',
          height: '100vh',
          width: '100%',
          maxWidth: '100%',
        }}
        allowFullScreen={true}
        allow="encrypted-media"
      >
        
      </iframe>
    </div>
  );
};

export default SubscribeMoviePage;
