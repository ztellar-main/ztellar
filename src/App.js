import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {ReactQueryDevtools} from 'react-query/devtools'

// COMPONENTS
import HeaderComponent from './components/HeaderComponent';
import Navbar from './components/Navbar';

// PAGES
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import SignupPage from './pages/SignupPage';
import Search from './pages/Search'
import ViewCourse from './pages/ViewCourse';
import BuyCoursePage from './pages/BuyCoursePage';

// SETTINGS
import AccountSettings from './pages/Settings/AccountSettings';

// AUTHOR PAGES
import AddCourse from './pages/Author/AddCourse'
import CourseSetup from './pages/Author/CourseSetup'

// OWNED PAGE
import OwnedCourse from './pages/Owned/OwnedCourse';
import Owned from './pages/Owned/Owned';
import OwnedEvent from './pages/Owned/OwnedEvent';


import Sample from './pages/Sample/Sample';
import SampleEmpty from './pages/Sample/SampleEmpty';

// PRIVATE ROUTE COMPONENTS
import PrivateRoute from './components/PrivateRoute'
import OwnedPrivateRoute from './pages/Owned/OwnedPrivateRoute';
import OwnedEventPrivateRoute from './pages/Owned/OwnedEventPrivateRoute';

// PAYMONGO
import PaymongoSuccessRedirect from './components/Paymongo/PaymongoSuccessRedirect';
import PaymongoPageRefresher from './components/Paymongo/PaymongoPageRefresher';


// GOOGLE
import EmailVerify from './pages/EmailVerify';

// AGENT
import ValidateAndUpdateReceipt from './pages/Agent/ValidateAndUpdateReceipt';

const queryClient = new QueryClient()
function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
      <Router>
        <ToastContainer />
        <Navbar />
          <Routes>
            {/* ALL */}
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/search' element={<Search />} />
            <Route path='/course' element={<ViewCourse />} />

            {/* EMAIL VERIFY */}
            <Route path='/email-verify' element={<EmailVerify />} /> 
            
            {/* OWNED PRIVATE */}
            <Route path='' element={<OwnedPrivateRoute />}>
              {/* OWNED COURSE */}
              <Route path='/owned/course' element={<OwnedCourse />} />
            </Route>

            {/* OWNED EVENT PRIVATE ROUTE */}
            <Route path='' element={<OwnedEventPrivateRoute />}>
              <Route path='/owned/event' element={<OwnedEvent />} />
            </Route>
            
            <Route path='' element={<PrivateRoute />}>
              <Route path='/owned' element={<Owned />} />
            </Route>
            
            {/* SAMPLE */}
            <Route path='/sample' element={<Sample />} />
            <Route path='/sample-home' element={<SampleEmpty />} />

            {/* PRIVATE ROUTES */}
            <Route path='' element={<PrivateRoute />}>
              {/* AUTHOR */}
              <Route path='/author/add-course' element={<AddCourse />} />
              <Route path='/author/add-course/course-setup' element={<CourseSetup />} />

              {/* BUY */}
              <Route path='/buy-course' element={<BuyCoursePage />} />
            </Route>

            {/* SETTINGS */}

            {/* ACCOUNT SETTINGS */}
            <Route path='/settings/account-settings' element={<AccountSettings />} />

            {/* PAYMONGO */}
            <Route path='/paymongo-save' element={<PaymongoSuccessRedirect />} />
            <Route path='/paymongo-refresh' element={<PaymongoPageRefresher />} />

            {/* AUTHOR */}
            <Route path='/agent' element={<ValidateAndUpdateReceipt />} />
          </Routes>
      </Router>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </div>
  );
}

export default App;
