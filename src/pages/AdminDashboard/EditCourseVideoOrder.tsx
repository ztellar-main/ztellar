import { useState } from 'react';
import Header from '../../components/AdminDashboard/Header';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import SubHeader from '../../components/AdminDashboard/SubHeader';
import { Button, Tooltip } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAppSelector } from '../../state/store';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { CgSpinnerTwoAlt } from 'react-icons/cg';
import toas from '../../utils/toas';

const EditCourseVideoOrder = () => {
  const [openSidebar, setopenSidebar] = useState(true);
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const courseId = query.get('courseId') || '';
  const subjectId = query.get('subjectId') || '';
  const token = useAppSelector((e: any) => e.user.token);

  const [rows, setRows] = useState([]);

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const updatedRows = Array.from(rows);
    const [reorderedRow] = updatedRows.splice(result.source.index, 1);
    updatedRows.splice(result.destination.index, 0, reorderedRow);

    setRows(updatedRows);
  };

  const { isLoading } = useQuery({
    queryKey: ['edit-course-video-order'],
    queryFn: async () => {
      const res = await axios({
        method: 'get',
        url: `/course/get-subject-videos?courseId=${courseId}&subjectId=${subjectId}`,
        headers: {
          authorization: `Token ${token}`,
        },
      });
      setRows(res?.data?.videos);
      return res?.data;
    },
  });

  const Loading = () => {
    if (isLoading) {
      return (
        <p className="ml-[50%] translate-x-[-50%] mt-[50px] w-[50px] h-[50px]">
          <CgSpinnerTwoAlt className="text-blue-800 animate-spin w-100 h-[100%]" />
        </p>
      );
    }
  };

  //   update button function
  const updateButtonFunction = async () => {
    try {
      await axios({
        method: 'put',
        url: '/course/update-subject-videos-order',
        data: { data: rows, subjectId, courseId },
        headers: {
          authorization: `Token ${token}`,
        },
      });
      toas('Subject Order Successfully Updated', 'success');
      navigate(`/admin-dashboard/course/setup?id=${courseId}`);
    } catch (err) {
      toas('Something went wrong please try again', 'error');
      navigate(`/admin-dashboard/course/setup?id=${courseId}`);
    }
  };
  return (
    <div>
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
            page="/course/setup/edit-video-order"
          />

          {/* MAIN BODY */}
          <div className="w-100 p-[10px]">
            {/* edit subject order */}
            <Tooltip content="Click to add new subject">
              <Button
                onClick={updateButtonFunction}
                placeholder={undefined}
                onPointerEnterCapture
                onPointerLeaveCapture
                className="bg-blue-900 mr-[10px]"
              >
                UPDATE
              </Button>
            </Tooltip>
            {/* cancel */}
            <Tooltip content="Cancel Edit">
              <Button
                onClick={() =>
                  navigate(`/admin-dashboard/course/setup?id=${courseId}`)
                }
                placeholder={undefined}
                onPointerEnterCapture
                onPointerLeaveCapture
                className="bg-blue-gray-800"
              >
                CANCEL
              </Button>
            </Tooltip>
          </div>
          <div className="w-100 h-[40px] bg-blue-gray-50 flex items-center justify-center text-gray-700 font-semibold tracking-wider">
            List of Videos
          </div>

          <div className="w-100 p-[10px]">
            {/* HEADER */}
            <div className="w-100 bg-blue-800 flex rounded-t text-white font-semibold">
              <div className="p-[10px] min-w-[70px] rounded-tl">#</div>
              <div className="p-[10px] grow rounded-tr">Title</div>
            </div>
            <Loading />

            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="SZXZXCXC" type="group">
                {(provided) => {
                  return (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {rows?.map((iData: any, i: any) => {
                        return (
                          <Draggable
                            key={iData?._id}
                            draggableId={iData?._id}
                            index={i}
                          >
                            {(provided) => {
                              return (
                                <div
                                  //   key={i}
                                  className={`bg-white border-b border-blue-gray-50 flex text-gray-800 ${
                                    isLoading && 'hidden'
                                  }`}
                                  {...provided.dragHandleProps}
                                  {...provided.draggableProps}
                                  ref={provided.innerRef}
                                >
                                  <div className="p-[15px] min-w-[70px] rounded-tl">
                                    {i + 1}
                                  </div>
                                  <div className="p-[15px] grow rounded-tr">
                                    <div className="line-clamp-1">
                                      {iData?.data?.title}
                                    </div>
                                  </div>
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                    </div>
                  );
                }}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCourseVideoOrder;