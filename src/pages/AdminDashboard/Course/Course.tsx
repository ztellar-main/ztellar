import { useState } from 'react';
import Header from '../../../components/AdminDashboard/Header';
import Sidebar from '../../../components/AdminDashboard/Sidebar';
import SubHeader from '../../../components/AdminDashboard/SubHeader';
import { Button, Tooltip } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { Card, Typography } from '@material-tailwind/react';
import { Select, Option } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAppSelector } from '../../../state/store';
import { CgSpinnerTwoAlt } from 'react-icons/cg';

const AuthorAddCourse = () => {
  const token = useAppSelector((e: any) => e.user.token);
  const [openSidebar, setopenSidebar] = useState(true);
  const [filterValue, setFilterValue] = useState('Title');
  const [search, setSearch] = useState('');
  const filter = ['Title', 'Author id'];
  const navigate = useNavigate();

  const {
    data: coursesData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['courses_data_admin'],
    queryFn: async () => {
      const res = await axios({
        method: 'get',
        url: '/course/get-all-courses-admin',
        headers: {
          authorization: `Token ${token}`,
        },
      });
      return res?.data;
    },
  });

  const Loading = () => {
    if (isLoading) {
      return (
        <p className="absolute left-[50%] translate-x-[-50%] mt-[80px]">
          <CgSpinnerTwoAlt className="text-blue-800 animate-spin w-[50px] h-[50px]" />
        </p>
      );
    }
  };

  if (isError) {
  }

  return (
    <>
      <div className="bg-gray-50 flex">
        <Sidebar
          setopenSidebar={setopenSidebar}
          openSidebar={openSidebar}
          page="Course"
        />
        <div className="w-100">
          <Header />
          <SubHeader
            setopenSidebar={setopenSidebar}
            openSidebar={openSidebar}
            page="/course"
          />

          {/* MAIN BODY */}
          <div className="w-100 p-[10px]">
            {/* create course button */}
            <Tooltip content="Click to create new course">
              <Button
                onClick={() => navigate('/admin-dashboard/create-course')}
                placeholder={undefined}
                onPointerEnterCapture
                onPointerLeaveCapture
                className="bg-blue-900"
              >
                Create Course
              </Button>
            </Tooltip>
          </div>

          {/* list of courses start */}
          <div className="w-100 h-[40px] bg-blue-gray-50 flex items-center justify-center text-gray-700 font-semibold tracking-wider">
            List of Courses
          </div>

          {/* search container */}
          <div className="w-100 p-[10px] bg-blue-gray-50">
            <div className="flex items-center mobile:flex-col">
              {/* filter */}
              <div className="ml-[20px] flex cursor-pointer mb-[10px] mobileMin:hidden">
                {filter?.map((filterData: any, i: any) => {
                  return (
                    <div
                      key={i}
                      onClick={() => setFilterValue(filterData)}
                      className={`w-[100px] bg-white p-[10px] flex items-center border-r-[1px] justify-center border-b-[4px] text-gray-800
                        ${
                          filterValue === filterData
                            ? 'border-b-blue-800  '
                            : 'border-b-gray-500 hover:border-b-blue-600 hover:bg-gray-50'
                        }         
                       `}
                    >
                      {filterData}
                    </div>
                  );
                })}
              </div>
              <input
                type="text"
                className="w-100 border laptopMin:w-[500px] border-gray-500 rounded p-[10px]"
                value={search}
                onChange={(e: any) => setSearch(e.target.value)}
              />
              {/* filter container */}
              <div className="ml-[20px] flex cursor-pointer mobile:hidden">
                {filter?.map((filterData: any, i: any) => {
                  return (
                    <div
                      key={i}
                      onClick={() => setFilterValue(filterData)}
                      className={`w-[100px] bg-white p-[10px] flex items-center border-r-[1px] justify-center border-b-[4px] text-gray-800
                        ${
                          filterValue === filterData
                            ? 'border-b-blue-800  '
                            : 'border-b-gray-500 hover:border-b-blue-600 hover:bg-gray-50'
                        }
                       `}
                    >
                      {filterData}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* table */}
          <div className="w-100 p-[10px]">
            <Card
              className="h-full w-full overflow-scroll min-h-[600px]"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <table className="w-full min-w-max table-auto text-left">
                <thead className="">
                  <tr>
                    {/* ID header */}
                    <th className="border-b border-blue-800 bg-blue-800 p-4">
                      <Typography
                        variant="small"
                        color="white"
                        className="font-normal leading-none opacity-90"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        ID
                      </Typography>
                    </th>
                    {/* title header */}
                    <th className="border-b border-blue-800 bg-blue-800 p-4">
                      <Typography
                        variant="small"
                        color="white"
                        className="font-normal leading-none opacity-90"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        Title
                      </Typography>
                    </th>
                    {/* action header */}
                    <th className="border-b border-blue-800 bg-blue-800 p-4">
                      <Typography
                        variant="small"
                        color="white"
                        className="font-normal leading-none opacity-90"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        Action
                      </Typography>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {coursesData?.map((coursesDataMap: any, index: any) => {
                    const isLast = index === coursesData?.length - 1;
                    const classes = isLast
                      ? 'p-4 '
                      : 'p-4 border-b border-blue-gray-50';

                    return (
                      <tr key={index}>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                          >
                            {index + 1}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                          >
                            {coursesDataMap?.title}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Select
                            label="Select Action"
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                          >
                            <Option
                              onClick={() =>
                                navigate(
                                  `/admin-dashboard/course/setup?id=${coursesDataMap?._id}`
                                )
                              }
                            >
                              Setup
                            </Option>
                            <Option
                              onClick={() =>
                                navigate(
                                  `/admin-dashboard/course/edit?id=${coursesDataMap?._id}`
                                )
                              }
                            >
                              Edit Details
                            </Option>
                            <Option
                              onClick={() =>
                                navigate(
                                  `/admin-dashboard/course/edit-image?id=${coursesDataMap?._id}`
                                )
                              }
                            >
                              Edit Cover Photo
                            </Option>
                            <Option>Preview Public</Option>
                            <Option>Preview Acquired</Option>
                          </Select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <Loading />
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthorAddCourse;
