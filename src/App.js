import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import "aos/dist/aos.css";
import AOS from "aos";
import HomePage from "./pages/HomePage/HomePage";
import About from "./pages/About/About";
import Login from "./Admin/pages/Login/Login";
import ManageUsers from "./Admin/pages/ManageUser/ManageUsers";
import { useSelector } from "react-redux";
import Career from "./pages/Career/Career";
import SteelScrap from "./pages/MarketNews/SteelScrap";
import IronOre from "./pages/MarketNews/IronOre";
import CoalPower from "./pages/MarketNews/CoalPower";
import Others from "./pages/MarketNews/Others";
import OpinionBox from "./pages/MetaNews/OpinionBox/OpinionBox";
import Event from "./pages/Reports/Event";
import Contact from "./pages/Contact/Contact";
import TopStories from "./pages/MetaNews/TopStories/TopStories";
import Interviews from "./pages/MetaNews/Interviews/Interviews";
import InMedia from "./pages/InMedia/InMedia";
import Consultancy from "./pages/Consultancy/Consultancy";
import Auth from "./pages/Auth/Auth";
import SignUp from "./pages/Auth/SignUp";
import { Toaster } from "react-hot-toast";
import Subscribe from "./pages/Subscribe/Subscribe";
import RenewHydrogen from "./pages/MarketNews/RenewHydrogen";
import RailLogistics from "./pages/MarketNews/RailLogistics";
import PortsCongestionWaiting from "./pages/MarketNews/PortsCongestionWaiting";
import CementConstruction from "./pages/MarketNews/CementConstruction";
import AutoMobile from "./pages/MarketNews/AutoMobile";
import Agriculture from "./pages/MarketNews/Agriculture";
import Welcome from "./Admin/pages/Welcome/Welcome";
import MarketNews from "./Admin/pages/MarketNews/MarketNews";
import ContactPageData from "./Admin/pages/ContactPageData/ContactPageData";
import MarketResearchData from "./Admin/pages/MarketResearchData/MarketResearchData";
import MetaNews from "./Admin/pages/MetaNews/MetaNews";
import IShops from "./Admin/pages/IShops/IShops";
import PortsCongestionAndWaiting from "./Admin/pages/PortsCongestionAndWaiting/PortsCongestionAndWaiting";
import EventsAndWebinar from "./Admin/pages/EventsAndWebinar/EventsAndWebinar";
import ManageEvent from "./Admin/pages/Events/ManageEvent";
import MetaWeekly from "./Admin/pages/MetaWeekly/MetaWeekly";
import InMediaAdmin from "./Admin/pages/InMediaAdmin/InMediaAdmin";
import HomePageSlider from "./Admin/pages/HomePageSlider/HomePageSlider";
import GovNotification from "./Admin/pages/GovNotification/GovNotification";
import SubscribedEmails from "./Admin/pages/SubscribedEmails/SubscribedEmails";
import IShopsProducts from "./pages/IShopsProducts/IShopsProducts";
import MetaWeeklyUser from "./pages/MetaWeeklyUser/MetaWeeklyUser";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import TermsCondition from "./pages/TermsCondition/TermsCondition";
import OpinionBoxSinglePage from "./pages/MetaNews/OpinionBox/OpinionBoxSinglePage";
import { useEffect } from "react";
import TopStoriesSinglePage from "./pages/MetaNews/TopStories/TopStoriesSinglePage";
// import InterviewSinglePage from "./pages/MetaNews/Interviews/InterviewSinglePage";
import OrderDetails from "./pages/IShopsProducts/OrderDetails";
import EventsSinglePage from "./pages/Reports/EventsSinglePage";
import InMediaSinglePage from "./pages/InMedia/InMediaSinglePage";
import Profile from "./pages/Dashboard/Profile/Profile";
import AllOrders from "./Admin/pages/AllOrders/AllOrders";
import AllUsers from "./Admin/pages/AllUsers/AllUsers";
import ManageGraphs from "./Admin/pages/ManageGraphs/ManageGraphs";
import AllGraphs from "./pages/AllGraphs/AllGraphs";

import GovNotifications from "./pages/GovNotifications/GovNotifications";
import IShopSinglePage from "./pages/IShopsProducts/IShopSinglePage";
import ManageCareer from "./Admin/pages/ManageCareer/ManageCareer";
import PaymentPolicy from "./pages/PaymentPolicy/PaymentPolicy";
import AddSubscriber from "./Admin/pages/addExistingSubscribers/AddSubscriber";

// import SocketMessages from "./socketMessages/SocketMessages";
import SendNotificationToUsers from './Admin/pages/SendNotificationToUsers/SendNotificationToUsers';
import ReportsPfdManage from "./Admin/pages/ReportsPfdManage/ReportsPfdManage";
import ReportsPdf from './pages/ReportsPdf/ReportsPdf';
import OpinionBoxMonth from "./pages/MetaNews/OpinionBox/OpinionBoxMonth";
import { Helmet, HelmetProvider } from "react-helmet-async";
import InMediaMonth from "./pages/InMedia/InMediaMonth";
import MetaWeeklyMonth from "./pages/MetaWeeklyUser/MetaWeeklyMonth";

function App() {
  useEffect(() => {
    AOS.init();
  }, []);

  const ProtectedRoute = ({ children }) => {
    const admin = useSelector((state) => state.admin);
    let location = useLocation();

    if (!admin._id) {
      return <Navigate to="/" state={{ from: location }} replace />;
    }
    return children;
  };

  const ProtectedRouteForUser = ({ children }) => {
    const user = useSelector((state) => state.user);
    let location = useLocation();

    if (!user._id) {
      return <Navigate to="/sign-in" state={{ from: location }} replace />;
    }
    return children;
  };

  return (
    <div className="App">

      <HelmetProvider>
        <Helmet>
          {/* other stuff... */}

          {/* Global site tag (gtag.js) - Google Analytics  */}
          <script async src='https://www.googletagmanager.com/gtag/js?id=G-416R6F3TZ5'></script>
          <script>
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', ${"G-416R6F3TZ5"});
          `}
          </script>
        </Helmet>

        {/* <SocketMessages> */}
        <Toaster position="top-center" reverseOrder={true} />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/career" element={<Career />} />

          {/* Subscribed Page */}
          <Route exact path="/subscribed" element={<Subscribe />} />

          {/* Meta News */}
          <Route exact path="/opinion-box" element={<OpinionBox />} />
          <Route exact path="/top-stories" element={<TopStories />} />
          <Route exact path="/latest-videos" element={<Interviews />} />

          {/* Single Page */}
          <Route
            exact
            path="/opinion-box/:updatedTitle/:id"
            element={<OpinionBoxSinglePage />}
          />
          {/* Month Page */}
          <Route
            exact
            path="/opinion-box-month/:month_year"
            element={<OpinionBoxMonth />}
          />

          {/* <Route
            exact
            path="/latest-videos/:id"
            element={<InterviewSinglePage />}
          /> */}
          <Route
            exact
            path="/top-stories/:id"
            element={<TopStoriesSinglePage />}
          />

          {/* Reports */}
          <Route exact path="/reports/events-webinar" element={<Event />} />
          <Route exact path="/reports/metaweekly" element={<MetaWeeklyUser />} />
          <Route exact path="/metaweekly-month/:month_year" element={<MetaWeeklyMonth />} />

          {/* All Graphs */}
          <Route exact path="/all-graphs" element={<AllGraphs />} />

          {/* Single Page */}
          <Route
            exact
            path="/reports/event-webinar/:id"
            element={<EventsSinglePage />}
          />

          {/* Market News */}
          <Route
            exact
            path="/market-news/steel-&-scrap"
            element={<SteelScrap />}
          />
          <Route exact path="/market-news/iron-ore" element={<IronOre />} />
          <Route exact path="/market-news/coal-power" element={<CoalPower />} />
          <Route
            exact
            path="/market-news/renew-hydrogen"
            element={<RenewHydrogen />}
          />
          <Route
            exact
            path="/market-news/rail-logistics"
            element={<RailLogistics />}
          />
          <Route
            exact
            path="/market-news/port-congestion-waiting"
            element={<PortsCongestionWaiting />}
          />
          <Route
            exact
            path="/market-news/cement-construction"
            element={<CementConstruction />}
          />
          <Route exact path="/market-news/automobile" element={<AutoMobile />} />
          <Route
            exact
            path="/market-news/agriculture"
            element={<Agriculture />}
          />
          <Route exact path="/market-news/others" element={<Others />} />

          {/* contact page */}
          <Route exact path="/contact" element={<Contact />} />

          {/*In media page  */}
          <Route exact path="/in-media" element={<InMedia />} />

          {/* In media Single Page */}
          <Route exact path="/in-media/:updatedTitle/:id" element={<InMediaSinglePage />} />

          {/* Month Page */}
          <Route exact path="/in-media-month/:month_year" element={<InMediaMonth />} />

          {/* Consultancy */}
          <Route exact path="/market-research" element={<Consultancy />} />

          {/* user Login page */}
          <Route exact path="/sign-in" element={<Auth />} />

          {/* user sign up page */}
          <Route exact path="/sign-up" element={<SignUp />} />

          {/* ishops products listing page */}
          <Route exact path="/ishop" element={<IShopsProducts />} />
          {/* <Route exact path="/ishop-single" element={<IShopSinglePage />} /> */}
          <Route exact path="/ishop-single/:updatedHeading/:id" element={<IShopSinglePage />} />

          <Route
            exact
            path="/order-summary/:id"
            element={
              <ProtectedRouteForUser>
                {" "}
                <OrderDetails />{" "}
              </ProtectedRouteForUser>
            }
          />

          {/* Privacy Policy */}
          <Route exact path="/privacy-policy" element={<PrivacyPolicy />} />

          {/* Terms and Condition */}
          <Route exact path="/terms-and-condition" element={<TermsCondition />} />

          {/* Terms and Condition */}
          <Route exact path="/payment-policy" element={<PaymentPolicy />} />

          {/* Reports PDF*/}
          <Route exact path="/reports-download" element={<ReportsPdf />} />

          {/* user dashboard routes */}
          <Route
            exact
            path="/dashboard/profile"
            element={
              <ProtectedRouteForUser>
                <Profile />
              </ProtectedRouteForUser>
            }
          />

          {/* User page Government Notifications */}
          <Route
            exact
            path="/gov-notifications"
            element={<GovNotifications></GovNotifications>}
          />

          {/* Admin Panel ROutes */}
          <Route exact path="/en/admin/login-panel" element={<Login />} />
          <Route
            exact
            path="/en/admin/welcome"
            element={
              <ProtectedRoute>
                <Welcome />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/en/admin/manage-user"
            element={
              <ProtectedRoute>
                <ManageUsers />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/en/admin/market-news"
            element={
              <ProtectedRoute>
                <MarketNews />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/en/admin/contact-page-data"
            element={
              <ProtectedRoute>
                <ContactPageData />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/en/admin/market-research-data"
            element={
              <ProtectedRoute>
                <MarketResearchData />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/en/admin/meta-news"
            element={
              <ProtectedRoute>
                <MetaNews />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/en/admin/ishops"
            element={
              <ProtectedRoute>
                <IShops />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/en/admin/ports-congestion-&-waiting"
            element={
              <ProtectedRoute>
                <PortsCongestionAndWaiting />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/en/admin/events-and-webinar"
            element={
              <ProtectedRoute>
                <EventsAndWebinar />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/en/admin/manage-events"
            element={
              <ProtectedRoute>
                <ManageEvent />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/en/admin/meta-weekly"
            element={
              <ProtectedRoute>
                <MetaWeekly />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/en/admin/in-media"
            element={
              <ProtectedRoute>
                <InMediaAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/en/admin/home-page-slider"
            element={
              <ProtectedRoute>
                <HomePageSlider />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/en/admin/gov-notification"
            element={
              <ProtectedRoute>
                <GovNotification />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/en/admin/subscribed-emails"
            element={
              <ProtectedRoute>
                <SubscribedEmails />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/en/admin/all-ishops-orders"
            element={
              <ProtectedRoute>
                <AllOrders />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/en/admin/all-users"
            element={
              <ProtectedRoute>
                <AllUsers />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/en/admin/manage-graphs"
            element={
              <ProtectedRoute>
                <ManageGraphs />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/en/admin/addExistingSubscribersFF"
            element={
              <ProtectedRoute>
                <AddSubscriber />
              </ProtectedRoute>
            }
          />

          {/* Career Page  */}
          <Route
            exact
            path="/en/admin/manage-career"
            element={
              <ProtectedRoute>
                <ManageCareer />
              </ProtectedRoute>
            }
          />

          {/* Send Notification to Users Page  */}
          <Route
            exact
            path="/en/admin/send-notification-to-all-users"
            element={
              <ProtectedRoute>
                <SendNotificationToUsers />
              </ProtectedRoute>
            }
          />

          {/* Reports Pdf Manage  */}
          <Route
            exact
            path="/en/admin/reports-Pdf-manage"
            element={
              <ProtectedRoute>
                <ReportsPfdManage />
              </ProtectedRoute>
            }
          />
        </Routes>
        {/* </SocketMessages> */}
      </HelmetProvider>
    </div>
  );
}

export default App;
