type Props = {
  data: any;
};

const FaqAnserCard = ({ data }: Props) => {
  const link = data?.split("\\")[2];
  return (
    <div className="w-100 bg-gray-600 p-[20px] text-lg text-white flex items-center justify-between tablet:text-base mobile:text-sm pl-[30px]">
      {link ? (
        <p
          onClick={() => {
            window.open(
              `${link}`,
              "_blank" // <- This is what makes it open in a new window.
            );
          }}
          className="text-blue-300 underline cursor-pointer hover:opacity-[60%]"
        >
          {link}
        </p>
      ) : (
        data
      )}
    </div>
  );
};

export default FaqAnserCard;
