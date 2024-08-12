import { Card, Typography } from "@material-tailwind/react";
import { Select, Option } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";

const SponsorNowEvent = () => {
  const sponsorBootAvailable = [
    {
      number: 1,
      options: [
        {
          type: "Silver",
          price: 1000,
        },
        {
          type: "Platinum",
          price: 2000,
        },
        {
          type: "Gold",
          price: 3000,
        },
      ],
      status: "Available",
    },
    {
      number: 2,
      options: [
        {
          type: "Silver",
          price: 1000,
        },
        {
          type: "Platinum",
          price: 2000,
        },
        {
          type: "Gold",
          price: 3000,
        },
      ],
      status: "Available",
    },
    {
      number: 3,
      options: [
        {
          type: "Silver",
          price: 1000,
        },
        {
          type: "Platinum",
          price: 2000,
        },
        {
          type: "Gold",
          price: 3000,
        },
      ],
      status: "Sold",
    },
  ];

  const TABLE_HEAD = ["Boot number", "Options to pay", "Status", "Action"];
  return (
    <div>
      {/* header */}
      <div className="w-100 bg-blue-800 p-[10px]">
        <p className="text-white text-center">Sponsor this event</p>
      </div>

      {/* title of event */}

      <div className="w-100 p-[10px] bg-gray-50">
        <p className="text-center text-lg font-semibold">
          This is a sample title of event
        </p>
      </div>

      {/* image */}
      <div className="flex justify-center items-center">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/ztellar-11a4f.appspot.com/o/images%2Fplan.jpg?alt=media&token=f89d78b4-f252-4be3-a36e-340ef03f250a"
          alt=""
          className="max-h-[500px] w-[auto]"
        />
      </div>

      {/* list of available boots */}
      {/* number , price option , submit-button */}

      <div className="p-[20px] mobile:p-[10px]">
        <Card
          className="h-full w-full overflow-scroll"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-semibold leading-none opacity-70"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sponsorBootAvailable.map((data: any, index: any) => {
                const isLast = index === sponsorBootAvailable.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={index}>
                    {/* boot number */}
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        {data?.number}
                      </Typography>
                    </td>

                    {/* options to pay */}
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        <div className="flex w-72 flex-col gap-6">
                          <Select
                            size="lg"
                            label="Select type to sponsor"
                            placeholder={undefined}
                            onPointerEnterCapture={() => {}}
                            onPointerLeaveCapture={undefined}
                          >
                            {data?.options?.map((optionsData: any, i: any) => {
                              return (
                                <Option key={i}>
                                  {optionsData?.type}: {optionsData?.price}
                                </Option>
                              );
                            })}
                          </Select>
                        </div>
                      </Typography>
                    </td>

                    {/* status */}
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className={`font-semibold ${
                          data?.status === "Available"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        {data?.status}
                      </Typography>
                    </td>

                    {/* action */}
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        <Button
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                          className="bg-blue-800"
                        >
                          Send Request
                        </Button>
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

export default SponsorNowEvent;
