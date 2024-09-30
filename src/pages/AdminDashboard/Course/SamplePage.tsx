import { useState } from 'react';
import { MdOutlineCheckCircle } from 'react-icons/md';
import { IoAddCircleOutline } from 'react-icons/io5';

const SamplePage = () => {
  const [prices, setPrices] = useState([
    {
      priceType: '',
      priceName: '',
      price: '',
      id: 1,
    },
  ]);
  const [priceErrorHandler, setPriceErrorHandler] = useState({
    message: '',
    status: 'start',
  });
  const [priceId, setPriceId] = useState(2);

  // HANDLE PRICE ONCHANGE
  const handlePriceChange = (id: any, e: any) => {
    const index = prices.findIndex((p) => p.id === id);
    const _prices = [...prices] as any;

    _prices[index][e.target.name] = e.target.value;

    const priceFirst = prices[0].price;
    const priceNameFirst = prices[0].priceName;
    const priceTypeFirst = prices[0].priceType;

    // if (!priceFirst || !priceNameFirst || !priceTypeFirst) {
    //   return setPriceErrorHandler({
    //     message: 'Please complete your price input fields.',
    //     status: 'failed',
    //   });
    // }

    // setPriceErrorHandler({ message: 'success', status: 'success' });

    setPrices(_prices);
  };

  // HANDLE PRICE DELETE
  const removeMember = (id: any) => {
    let _prices = [...prices];
    _prices = _prices.filter((member) => member.id !== id);
    setPrices(_prices);
  };

  // ADD PRICE ROW
  const addPriceRow = () => {
    setPriceId(priceId + 1);
    const _prices = [...prices];

    const priceIndex = prices.length - 1;

    const _priceType = prices[priceIndex]['priceType'];
    const _price = prices[priceIndex]['price'];
    const _priceName = prices[priceIndex]['priceName'];

    if (!_priceType || !_price || !_priceName) {
      return setPriceErrorHandler({
        message:
          'Please fill up all the price inputs first before adding new one.',
        status: 'failed',
      });
    }

    _prices.push({
      priceType: '',
      priceName: '',
      price: '',
      id: priceId,
    });
    setPriceErrorHandler({ message: 'success', status: 'success' });
    setPrices(_prices);
  };
  return (
    <div>
      {prices.map((pricesData, i) => {
        return (
          <div key={i} className="class">
            <div className="flex items-center mb-[10px] grow mobile:flex-col ">
              <div className=" mr-[10px] w-[140px] mobile:w-100 mobile:mr-0 flex items-center mobile:mb-[10px]">
                <p className="mr-[10px] text-gray-800">{i + 1}.</p>
                <select
                  name="priceType"
                  id=""
                  value={pricesData?.priceType}
                  onChange={(e) => {
                    handlePriceChange(pricesData?.id, e);
                  }}
                  className="p-[10px] w-100 border rounded text-xs text-gray-700"
                >
                  <option value="">Choose type</option>
                  <option value="face_to_face">Face to face</option>
                  <option value="virtual">Virtual</option>
                </select>
              </div>

              <input
                type="number"
                name="price"
                value={pricesData?.price}
                placeholder="Enter price"
                onChange={(e) => {
                  handlePriceChange(pricesData?.id, e);
                }}
                className="p-[10px] rounded grow border min-w-[20px] mobile:w-100"
              />
            </div>
            <div className="flex w-100 items-center mb-[10px] ">
              <input
                type="text"
                name="priceName"
                value={pricesData?.priceName}
                placeholder="Enter price name"
                onChange={(e) => {
                  handlePriceChange(pricesData?.id, e);
                }}
                className="w-100 p-[10px] rounded  border"
              />
              {prices.length > 1 && (
                <button
                  onClick={() => removeMember(pricesData?.id)}
                  className="bg-red-600 p-[10px] text-white rounded cursor-pointer text-nowrap ml-[10px] shadow hover:bg-red-400 active:bg-red-600"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        );
      })}
      <div className="text-red-600 flex items-center text-sm mobile:text-xs">
        {priceErrorHandler?.status !== 'start' && (
          <>
            <MdOutlineCheckCircle
              className={`${
                priceErrorHandler?.status === 'success'
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            />
            <p
              className={`text-sm tablet:text-xs ml-[5px] ${
                priceErrorHandler?.status === 'success'
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              {priceErrorHandler?.message}
            </p>
          </>
        )}
      </div>

      <button
        onClick={addPriceRow}
        className="bg-blue-600 p-[10px] text-white rounded cursor-pointer shadow mt-[10px] flex items-center"
      >
        Add price
        <IoAddCircleOutline className="ml-[5px] w-[auto] h-[20px]" />
      </button>
    </div>
  );
};

export default SamplePage;
