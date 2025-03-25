import toas from '../../../utils/toas';

function formatToPeso(number: any) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(number);
}

type Props = {
  courseData: any;
  setPriceData: any;
  setComponentState: any;
  priceData: any;
};

const ChoosePrice = ({
  courseData,
  setPriceData,
  setComponentState,
  priceData,
}: Props) => {
  console.log(courseData?.movie_prices);
  const nextFunction = () => {
    const price = priceData.split('/')[1];
    const months = priceData.split('/')[0];
    if (price === '0' || months === '0') {
      return toas('Please select your subscription', 'error');
    }
    setComponentState('choose-payment-method');
  };


  const asd = "[{asdasd}]";

  console.log(asd.split("/")[0])
  return (
    <div className="">
      <p className="mb-1 text-tcolor">Select your subscription</p>
      <select
        name=""
        id=""
        className="border border-[#333333] w-[100%] px-4 py-2 mb-4"
        onChange={(e: any) => {
          const priceData = e.target.value;
          setPriceData(priceData);
        }}
      >
        <option className="" value="">
          Choose
        </option>

        {courseData?.movie_prices?.map((priceData: any, i: any) => {
          return (
            <option key={i} value={`${priceData?.hours}/${priceData?.price}`}>
              {priceData?.hours} Hours - {formatToPeso(priceData?.price)}
            </option>
          );
        })}
      </select>

      {/* actions */}
      <div className="w-full grid grid-cols-2 gap-2">
        <button className="bg-[#e9e9e9] border border-gray-400 px-4 py-2 cursor-pointer">
          Cancel
        </button>
        <button
          onClick={nextFunction}
          className="bg-[#007bff] text-white cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ChoosePrice;
