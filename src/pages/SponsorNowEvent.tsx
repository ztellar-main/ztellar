import { Card, Typography } from '@material-tailwind/react';

import { Button } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import SponsorNowReserve from '../components/SponsorNowReserve';
import { useState } from 'react';
import toas from '../utils/toas';

const SponsorNowEvent = () => {
  const query = new URLSearchParams(location.search);
  const productId = query.get('id') || '';
  const [refresh, setRefresh] = useState(false);

  function formatToPeso(number: number) {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
    }).format(number);
  }

  const { data: sponsorsBootData, isLoading } = useQuery({
    queryKey: ['sponsors-boot', refresh],
    queryFn: async () => {
      const res = await axios({
        method: 'get',
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
    mainBootId: any;
  };

  const SponsorRow = ({
    classes,
    index,
    data,
    eventTitle,
    mainBootId,
  }: SponsorProps) => {
    const [openForm, setOpenForm] = useState(false);

    return (
      <>
        {openForm && (
          <>
            <SponsorNowReserve
              eventTitle={eventTitle}
              fileUrl=""
              setOpenForm={setOpenForm}
              productId={productId}
              setRefresh={setRefresh}
              bootData={data}
              mainBootId={mainBootId}
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
              {data?.boot_name}
            </Typography>
          </td>

          {/* boot type */}
          <td className={classes}>
            <div
              className={`${data?.boot_type_color} p-[10px] w-[150px] text-center rounded text-blue-gray-700`}
            >
              {data?.boot_type}
            </div>
          </td>

          {/* boot price */}
          <td className={classes}>
            <p className="font-semibold text-blue-gray-800">
              {formatToPeso(data?.boot_price)}
            </p>
          </td>

          {/* status */}
          <td className={classes}>
            <Typography
              variant="small"
              className={`font-semibold ${
                data?.boot_status === 'Available' && 'text-green-600'
              }
              ${data?.status === 'Reserved' && 'text-blue-600'}
              ${data?.status === 'Sold' && 'text-red-600'}
              `}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {data?.boot_status}
            </Typography>
          </td>

          {/* action */}
          <td className={classes}>
            <Button
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              className="bg-blue-800"
              onClick={() => {
                if (data?.boot_status !== 'Available') {
                  return toas(
                    `This boot is already ${data?.boot_status}`,
                    'error'
                  );
                }
                setOpenForm(true);
              }}
            >
              Open Form
            </Button>
          </td>
        </tr>
      </>
    );
  };

  const TABLE_HEAD = [
    'Booth Name/#',
    'Booth Type',
    'Booth Price',
    'Status',
    'Action',
  ];
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
            src={sponsorsBootData?.sponsors_boot[0]?.image_url}
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
                      ? 'p-4'
                      : 'p-4 border-b border-blue-gray-50';

                    return (
                      <SponsorRow
                        classes={classes}
                        index={index}
                        data={data}
                        eventTitle={sponsorsBootData?.title}
                        mainBootId={sponsorsBootData?.sponsors_boot[0]?._id}
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
