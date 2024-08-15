import { Card, Typography } from "@material-tailwind/react";

import { Button } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SponsorNowReserve from "../components/SponsorNowReserve";
import { useState } from "react";
import toas from "../utils/toas";

const SponsorNowEvent = () => {
  const query = new URLSearchParams(location.search);
  const productId = query.get("id") || "";

  const { data: sponsorsBootData, isLoading } = useQuery({
    queryKey: ["sponsors-boot"],
    queryFn: async () => {
      const res = await axios({
        method: "get",
        url: `author/get-sponsors-boot?id=${productId}`,
      });
      return res?.data;
    },
  });

  if (isLoading) {
    return <p className="class">Loading</p>;
  }

  type SponsorProps = {
    classes: any;
    index: any;
    data: any;
    eventTitle: String;
  };

  const SponsorRow = ({ classes, index, data, eventTitle }: SponsorProps) => {
    const [openForm, setOpenForm] = useState(false);
    return (
      <>
        {openForm && (
          <>
            <SponsorNowReserve
              eventTitle={eventTitle}
              bootNumber={data?.boot_number}
              fileUrl={sponsorsBootData?.sponsors_boot[0]?.file_letter_url}
              prices={data?.prices}
              setOpenForm={setOpenForm}
              productId={productId}
              bootId={data?._id}
            />
          </>
        )}

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
              {data?.boot_number}
            </Typography>
          </td>

          {/* status */}
          <td className={classes}>
            <Typography
              variant="small"
              className={`font-semibold ${
                data?.status === "Available" ? "text-green-600" : "text-red-600"
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
                onClick={() => {
                  if (data?.status !== "Available") {
                    return toas(
                      `This boot is already ${data?.status}`,
                      "error"
                    );
                  }
                  setOpenForm(true);
                }}
              >
                Open Form
              </Button>
            </Typography>
          </td>
        </tr>
      </>
    );
  };

  const TABLE_HEAD = ["Boot number", "Options to pay", "Status", "Action"];
  return (
    <>
      <div>
        {/* header */}
        <div className="w-100 bg-blue-800 p-[10px]">
          <p className="text-white text-center">Sponsor this event</p>
        </div>

        {/* title of event */}

        <div className="w-100 p-[10px] bg-gray-50">
          <p className="text-center text-lg font-semibold">
            {sponsorsBootData?.title}
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
                {sponsorsBootData?.sponsors_boot[0]?.boot_list.map(
                  (data: any, index: any) => {
                    const isLast =
                      index ===
                      sponsorsBootData?.sponsors_boot[0]?.boot_list?.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";
                    console.log(data);
                    return (
                      <SponsorRow
                        classes={classes}
                        index={index}
                        data={data}
                        eventTitle={sponsorsBootData?.title}
                      />
                    );
                  }
                )}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SponsorNowEvent;
