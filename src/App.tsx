import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// PAGES IMPORTS
import Home from './pages/Home';
import Signup from './pages/Signup';
import EmailVerify from './pages/EmailVerify';
import Login from './pages/Login';
import Search from './pages/Search';
import ViewProduct from './pages/ViewProduct';
import BuyProduct from './pages/BuyProduct';
import UpdateUserBeforeLoggingIn from './pages/UpdateUserBeforeLoggingIn';
import ResetPassword from './pages/ResetPassword';
import UserList from './pages/UserList';
import EditProfile from './pages/EditProfile';
import SponsorNowEvent from './pages/SponsorNowEvent';
import CompanySignup from './pages/CompanySignup';
import CompanyEmailVerify from './pages/CompanyEmailVerify';

// AUTHOR
import AuthorDashboard from './pages/Author/AuthorDashboard';
import AddCourse from './pages/Author/AddCourse';
import AddEvent from './pages/Author/AddEvent';
import CreateEvent from './pages/Author/CreateEvent';
import EventSetup from './pages/Author/EventSetup';
import AddVideoToSubjectEvent from './pages/Author/AddVideoToSubjectEvent';
import LiveEvent from './pages/Author/LiveEvent';
import LiveEventsList from './pages/Author/LiveEventsList';
import GoLiveEvent from './pages/Author/GoLiveEvent';
import ScanQrCode from './pages/Author/ScanQrCode';
import GoScan from './pages/Author/GoScan';
import EventListCashPayment from './pages/Author/EventListCashPayment';
import GoEventCash from './pages/Author/GoEventCash';
import PaymongoSuccessRedirectCashPayment from './pages/Paymongo/PaymongoSuccessRedirectCashPayment';
import Total from './pages/Author/Total';

// PRIVATE ROUTES
import EmailVerifyPrivateRoute from './privateRoutes/EmailVerifyPrivateRoute';
import LoginAndSignupPrivateRoute from './privateRoutes/LoginAndSignupPrivateRoute';

// OWNED
import Owned from './pages/Owned/Owned';
import OwnedEventLive from './pages/Owned/OwnedEventLive';
import OwnedEventSDL from './pages/Owned/OwnedEventSDL';
import OwnedEventCredentials from './pages/Owned/OwnedEventCredentials';
import OwnedQrCode from './pages/Owned/OwnedQrCode';
import OwnedEventQuiz from './pages/Owned/OwnedEventQuiz';

// PAYMONGO
import PaymongoSuccessRedirect from './pages/Paymongo/PaymongoSuccessRedirect';
import CoursePaymongoSuccessRedirect from './pages/Paymongo/CoursePaymongoSuccessRedirect';

// ADMIN
// course
import AdminAddCourse from './pages/AdminDashboard/Course/Course';
import DashboardNewAuthor from './pages/AdminDashboard/Course/AdminDashboard';
import CreateCourse from './pages/AdminDashboard/Course/CreateCourse';
import EditCourse from './pages/AdminDashboard/Course/EditCourse';
import EditCourseImage from './pages/AdminDashboard/Course/EditCourseImage';
import SetupCourse from './pages/AdminDashboard/Course/SetupCourse';
import AddSubject from './pages/AdminDashboard/Course/AddSubject';
import AddVideo from './pages/AdminDashboard/Course/AddVideo';
import EditSubjectOrder from './pages/AdminDashboard/Course/EditCourseSubjectOrder';
import EditCourseSubjectTitle from './pages/AdminDashboard/Course/EditCourseSubjectTitle';
import EditCourseVideoTitle from './pages/AdminDashboard/Course/EditCourseVideoTitle';
import EditCourseVideoOrder from './pages/AdminDashboard/Course/EditCourseVideoOrder';
import PreviewCourseVideo from './pages/AdminDashboard/Course/PreviewCourseVideo';
import SetupSubjectQuestions from './pages/AdminDashboard/Course/SetupSubjectQuestions';

// COURSE PUBLIC
import CoursePreviewPublic from './pages/CoursePublic/CoursePreviewPublic';

// COURSE PRIVATE
import BuyCourse from './pages/CoursePrivate/BuyCourse';
import AcquiredCourse from './pages/CoursePrivate/AcquiredCourse';
import CourseAnswerPage from './pages/CoursePrivate/CourseAnswerPage';
import DownloadCertificateCourse from './pages/CoursePrivate/DownloadCertificateCourse';

// ACQUIRED COURSE PRIVATE ROUTE
import AcquiredCoursePrivateRoute from './privateRoutes/AcquiredCoursePrivateRoute';

// SAMPLE
import SamplePage from './pages/AdminDashboard/Course/SamplePage';
import ViewCertificateSample from './pages/ViewCertificateSample';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <div className="laptop:text-sm desktop:text-base">
        <QueryClientProvider client={queryClient}>
          <Router>
            <Routes>
              {/* sample */}
              <Route index path="/samsansan" element={<SamplePage />} />
              <Route
                index
                path="/view-cert"
                element={<ViewCertificateSample />}
              />
              {/* GENERAL */}
              <Route index path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/view/event" element={<ViewProduct />} />
              <Route path="/buy/product" element={<BuyProduct />} />
              <Route
                path="/complete-info"
                element={<UpdateUserBeforeLoggingIn />}
              />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/thisisasampleuserlist" element={<UserList />} />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="/event/sponsor-now" element={<SponsorNowEvent />} />
              <Route path="/company-signup" element={<CompanySignup />} />
              <Route
                path="/company-email-verify"
                element={<CompanyEmailVerify />}
              />
              {/* PAYMONGO */}
              <Route
                path="/paymongo-save"
                element={<PaymongoSuccessRedirect />}
              />
              <Route
                path="/process-payment"
                element={<CoursePaymongoSuccessRedirect />}
              />
              {/* OWNED */}
              <Route path="/owned" element={<Owned />} />
              <Route path="/owned/event/live" element={<OwnedEventLive />} />
              <Route path="/owned/event/sdl" element={<OwnedEventSDL />} />
              <Route path="/owned/event/quiz" element={<OwnedEventQuiz />} />
              <Route
                path="/owned/event/credentials"
                element={<OwnedEventCredentials />}
              />
              <Route path="/owned/qr" element={<OwnedQrCode />} />
              {/* EMAIL VERIFY */}
              <Route path="" element={<EmailVerifyPrivateRoute />}>
                <Route path="/email-verify" element={<EmailVerify />} />
              </Route>
              {/* LOGIN AND SIGNUP */}
              <Route path="" element={<LoginAndSignupPrivateRoute />}>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
              </Route>
              {/* ADMIN COURSE */}
              <Route
                path="/admin-dashboard/dashboard"
                element={<DashboardNewAuthor />}
              />
              <Route
                path="/admin-dashboard/course"
                element={<AdminAddCourse />}
              />
              <Route
                path="/admin-dashboard/create-course"
                element={<CreateCourse />}
              />
              <Route
                path="/admin-dashboard/course/edit"
                element={<EditCourse />}
              />
              <Route
                path="/admin-dashboard/course/edit-image"
                element={<EditCourseImage />}
              />
              <Route
                path="/admin-dashboard/course/setup"
                element={<SetupCourse />}
              />
              <Route
                path="/admin-dashboard/course/setup/add-subject"
                element={<AddSubject />}
              />
              <Route
                path="/admin-dashboard/course/setup/add-video"
                element={<AddVideo />}
              />
              <Route
                path="/admin-dashboard/course/setup/edit-subject-order"
                element={<EditSubjectOrder />}
              />
              <Route
                path="/admin-dashboard/course/setup/edit-subject-title"
                element={<EditCourseSubjectTitle />}
              />
              <Route
                path="/admin-dashboard/course/setup/edit-video-title"
                element={<EditCourseVideoTitle />}
              />
              <Route
                path="/admin-dashboard/course/setup/edit-video-order"
                element={<EditCourseVideoOrder />}
              />
              <Route
                path="/admin-dashboard/course/setup/preview-course-video"
                element={<PreviewCourseVideo />}
              />
              <Route
                path="/admin-dashboard/course/setup/subject-questions"
                element={<SetupSubjectQuestions />}
              />
              {/* COURSE PUBLIC */}
              <Route path="/view/course" element={<CoursePreviewPublic />} />
              {/* COURSE PRIVATE */}
              <Route path="/acquire/course" element={<BuyCourse />} />
              <Route
                path="/acquired/course"
                element={<AcquiredCoursePrivateRoute />}
              >
                <Route path="/acquired/course" element={<AcquiredCourse />} />
              </Route>

              <Route
                path="/acquired/course/answer"
                element={<CourseAnswerPage />}
              />
              <Route
                path="/acquired/course/download-certificate-page"
                element={<DownloadCertificateCourse />}
              />

              {/* AUTHOR */}
              <Route path="">
                <Route path="/author/dashboard" element={<AuthorDashboard />} />
                <Route path="/author/add-course" element={<AddCourse />} />
                <Route path="/author/add-event" element={<AddEvent />} />
                <Route
                  path="/author/add-event-page"
                  element={<CreateEvent />}
                />
                <Route path="/author/event/setup" element={<EventSetup />} />
                <Route
                  path="/author/event/setup/add-video-to-subject"
                  element={<AddVideoToSubjectEvent />}
                />
                <Route path="/author/event/live" element={<LiveEvent />} />\
                <Route
                  path="/author/event/live-list"
                  element={<LiveEventsList />}
                />
                <Route path="/author/event/go-live" element={<GoLiveEvent />} />
                <Route
                  path="/author/event/scan-qr-code"
                  element={<ScanQrCode />}
                />
                <Route path="/author/event/go-scan" element={<GoScan />} />
                <Route
                  path="/author/event/event-cash-payment-list"
                  element={<EventListCashPayment />}
                />
                <Route
                  path="/author/event/go-event-cash"
                  element={<GoEventCash />}
                />
                <Route
                  path="/paymongo-save-cash-payment"
                  element={<PaymongoSuccessRedirectCashPayment />}
                />
                <Route path="/total-sum-secret" element={<Total />} />
              </Route>
            </Routes>
          </Router>
        </QueryClientProvider>
      </div>
    </>
  );
}

export default App;
