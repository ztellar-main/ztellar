import React from 'react'
import {Navigate,Outlet, useLocation} from 'react-router-dom'

import { useSelector } from 'react-redux'

const OwnedEventPrivateRoute = () => {
    const user = useSelector(state => state.user.currentUser);
    const courseArray = user?.course_owned;

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const eventId = query.get('eventId');

    const recentSubjectData = courseArray?.find(e => {
        return e._id === eventId
    })
  return (
    recentSubjectData === undefined ? 
    <Navigate to='/owned' />
    : 
    <Outlet /> 
  )
}

export default OwnedEventPrivateRoute
