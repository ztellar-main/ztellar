import React from 'react'
import {Navigate,Outlet, useLocation} from 'react-router-dom'

import { useSelector } from 'react-redux'

const OwnedPrivateRoute = () => {
    const user = useSelector(state => state.user.currentUser);
    const courseArray = user?.course_owned;

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const courseId = query.get('courseId');

    const recentSubjectData = courseArray?.find(e => {
        return e._id === courseId
      })
  return (
    recentSubjectData === undefined ? 
    <Navigate to='/owned' />
    : 
    <Outlet /> 
  )
}

export default OwnedPrivateRoute
