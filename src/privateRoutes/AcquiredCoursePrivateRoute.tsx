import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '../state/store';
import axios from 'axios';
import { Navigate, Outlet } from 'react-router-dom';

const AcquiredCoursePrivateRoute = () => {
  const token = useAppSelector((e: any) => e?.user?.token);
  const query = new URLSearchParams(location.search);
  const courseId = query.get('id') || '';

  const { data, isLoading } = useQuery({
    queryKey: ['acquired-course-private-route'],
    queryFn: async () => {
      const res = await axios({
        method: 'get',
        url: `/course/acquired-course-private-route?courseId=${courseId}`,
        headers: {
          authorization: `Token ${token}`,
        },
      });
      return res?.data;
    },
  });

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (!data) {
    return <Navigate to="/owned" />;
  }

  return <Outlet />;
};

export default AcquiredCoursePrivateRoute;
