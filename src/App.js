import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import VerifyEmail from './Pages/VerifyEmail';
import ChangePassword from './Pages/ChangePassword';
import BuildProfilePersonal from './Pages/BuildProfilePersonal';
import VerifyAccount from './Pages/VerifyAccount';
import DashboardPage from './Pages/DashboardPage';
import AvailableTrips from './Pages/AvailableTrips';
import MyShipments from './Pages/MyShipments';
import CreateRequest from './Pages/CreateRequest';
import Dashboard from './components/dashboard/Dashboard';
import OfferDetails from './Pages/ShipmentOfferDetails';
import MyProfile from './Pages/MyProfile';
import VehiclesList from './Pages/VehiclesList';
import MyTrips from './Pages/MyTrips';
import MyOffers from './Pages/MyOffers';
import TripDetails from './Pages/TripDetails';
import EditProfile from './Pages/EditProfile';
import CarrierOfferDetails from './Pages/CarrierOfferDetails';
import VehicleDetails from './Pages/VehicleDetails'
import CheckEmail from './Pages/CheckEmail'
import DirectToHomePage1 from './Pages/DirectToHomePage1.jsx';
import DirectToHomePage2 from './Pages/DirectToHomePage2.jsx';
import CreateAuction from './Pages/CreateAuction.jsx';
import AvailableAuctions from './Pages/AvailableAuctions.jsx';
import CarrierAuctionDetails from './Pages/CarrierAuctionDetails.jsx';
import ShipperAuctionDetails from './Pages/ShipperAuctionDetails.jsx';
import MyAuction from './Pages/MyAuction.jsx'
import CurrentShipments from './Pages/CurrentShipments.jsx'
import Chat from './Pages/Chat'
import TermsAndConditions from './Pages/TermsAndConditions';
import ContactUs from './Pages/ContactUs';
// import NewsletterFoot from './components/Footer/NewsletterFoot.jsx';

function App() {

  var AccountType =  localStorage.getItem('accountType');
  var user=localStorage.getItem('user');
  return (
    <div className="App">
      {
        user === null ? (
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/buildIndividualAccount/:id' element={<BuildProfilePersonal />}  />
            <Route path='/verify/:id' element={<VerifyAccount />} />
            <Route path='/forget-password' element={<VerifyEmail />} />
            <Route path='/reset-password/:id' element={<ChangePassword />} />
            <Route path='/check-email' element={<CheckEmail />} />
            <Route path='/contact-us' element={<ContactUs />} />
            <Route path='/termsandconditions' element={<TermsAndConditions />} />
          </Routes>
          ) : (
           
               <Dashboard user={AccountType} >
            <Routes>
            <Route path='/' element={<DirectToHomePage1 />} />
            <Route path='/:params' element={<DirectToHomePage2 />} />
            <Route path='/dashboard/:id' element={<DashboardPage />} />
            <Route path='/my-shipments/:id' element={<MyShipments />} />
            <Route path='/available-trips' element={<AvailableTrips />} />
            <Route path='/create-request/:id' element={<CreateRequest />} />
            <Route path='/shipment-offer/:id' element={<OfferDetails />} />
            <Route path='/my-trips/:id' element={<MyTrips />} />
            <Route path='/my-offers/:id' element={<MyOffers />} />
            <Route path='/my-vehicles/:id' element={<VehiclesList />} />
            <Route path='/profile/:id' element={<MyProfile />} />
            <Route path='/trip-detail/:id' element={<TripDetails />} />
            <Route path='/edit-profile/:id' element={<EditProfile />} />
            <Route path='/offer-details/:id' element={<CarrierOfferDetails />} />
            <Route path='/vehicle-details/:id' element={<VehicleDetails />} />
            <Route path='/create-auction/:id' element={<CreateAuction />} />
            <Route path='/available-auction' element={<AvailableAuctions />} />
            <Route path='/my-auctions/:id' element={<MyAuction />} />
            <Route path='/auction-details/:id' element={<CarrierAuctionDetails />} />
            <Route path='/myauction-details/:id' element={<ShipperAuctionDetails />} />
            <Route path='/current-shipments/:id' element={<CurrentShipments />} />
            <Route path='/chat/:id' element={<Chat />} />
          </Routes>
          {/* <NewsletterFoot /> */}
            </Dashboard>
          
          )  
          
      }

    </div>
  );
}

export default App;

