import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// PAGES IMPORTS
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import EmailVerify from "./pages/EmailVerify";
import Login from "./pages/Login";
import Search from "./pages/Search";
import ViewProduct from "./pages/ViewProduct";
import BuyProduct from "./pages/BuyProduct";
import UpdateUserBeforeLoggingIn from "./pages/UpdateUserBeforeLoggingIn";

// AUTHOR
import AuthorDashboard from "./pages/Author/AuthorDashboard";
import AddCourse from "./pages/Author/AddCourse";
import AddEvent from "./pages/Author/AddEvent";
import CreateEvent from "./pages/Author/CreateEvent";
import EventSetup from "./pages/Author/EventSetup";
import AddVideoToSubjectEvent from "./pages/Author/AddVideoToSubjectEvent";
import LiveEvent from "./pages/Author/LiveEvent";
import LiveEventsList from "./pages/Author/LiveEventsList";
import GoLiveEvent from "./pages/Author/GoLiveEvent";

// PRIVATE ROUTES
import EmailVerifyPrivateRoute from "./privateRoutes/EmailVerifyPrivateRoute";
import LoginAndSignupPrivateRoute from "./privateRoutes/LoginAndSignupPrivateRoute";

// OWNED
import Owned from "./pages/Owned/Owned";
import OwnedEventLive from "./pages/Owned/OwnedEventLive";
import OwnedEventSDL from "./pages/Owned/OwnedEventSDL";
import OwnedEventCredentials from "./pages/Owned/OwnedEventCredentials";

// PAYMONGO
import PaymongoSuccessRedirect from "./pages/Paymongo/PaymongoSuccessRedirect";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <div className="laptop:text-sm desktop:text-base">
        <QueryClientProvider client={queryClient}>
          <Router>
            <Routes>
              {/* GENERAL */}
              <Route index path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/view/event" element={<ViewProduct />} />
              <Route path="/buy/product" element={<BuyProduct />} />
              <Route path="/complete-info" element={<UpdateUserBeforeLoggingIn />} />
              

              {/* PAYMONGO */}
              <Route
                path="/paymongo-save"
                element={<PaymongoSuccessRedirect />}
              />

              {/* OWNED */}
              <Route path="/owned" element={<Owned />} />
              <Route path="/owned/event/live" element={<OwnedEventLive />} />
              <Route path="/owned/event/sdl" element={<OwnedEventSDL />} />
              <Route
                path="/owned/event/credentials"
                element={<OwnedEventCredentials />}
              />

              {/* EMAIL VERIFY */}
              <Route path="" element={<EmailVerifyPrivateRoute />}>
                <Route path="/email-verify" element={<EmailVerify />} />
              </Route>

              {/* LOGIN AND SIGNUP */}
              <Route path="" element={<LoginAndSignupPrivateRoute />}>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
              </Route>

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
              </Route>
            </Routes>
          </Router>
        </QueryClientProvider>
      </div>
    </>
  );
}

export default App;
