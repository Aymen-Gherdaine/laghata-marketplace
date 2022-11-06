import GlobalStyle from "./GlobalStyle";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Modal from "./components/styleComponents/Modal";
import LoadingSpinner from "./components/styleComponents/LoadingSpinner";

import Header from "./components/header/Header";
import Home from "./components/pages/Home";
import SignUp from "./components/auth/SignUp";
import LogIn from "./components/auth/LogIn";
import Footer from "./components/footer/Footer";

// implementing lazy loading to some route
const Categories = React.lazy(() => import("./components/pages/Categories"));
const Category = React.lazy(() => import("./components/pages/Category"));
const SubCategory = React.lazy(() => import("./components/pages/SubCategory"));
const Profile = React.lazy(() => import("./components/pages/Profile"));
const AddListingForm = React.lazy(() =>
  import("./components/Listing/addListing/AddListingForm")
);
const UserListing = React.lazy(() => import("./components/pages/UserListing"));
const EditListing = React.lazy(() =>
  import("./components/Listing/editListing/EditListing")
);
const Listing = React.lazy(() => import("./components/pages/Listing"));
const Renter = React.lazy(() => import("./components/pages/Renter"));
const BookingPage = React.lazy(() => import("./components/pages/BookingPage"));
const AdminPage = React.lazy(() => import("./components/chatSystem/AdminPage"));
const ForgotPassword = React.lazy(() =>
  import("./components/auth/ForgotPassword")
);
const ResetPassword = React.lazy(() =>
  import("./components/auth/ResetPassword")
);
const EmailVerificationPage = React.lazy(() =>
  import("./components/pages/EmailVerificationPage")
);

const App = () => {
  return (
    <>
      <GlobalStyle />

      {/* <Modal /> */}
      <Header />

      <Suspense
        fallback={
          <>
            <LoadingSpinner />
          </>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/category/:category/:id" element={<SubCategory />} />
          <Route path="/listing/:id" element={<Listing />} />
          <Route path="/renter/:id" element={<Renter />} />
          <Route path="listing/:id/booking" element={<BookingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/reset-password/:passwordResetCode"
            element={<ResetPassword />}
          />
          <Route
            path="/verify-email/:verificationString"
            element={<EmailVerificationPage />}
          />
          <Route path="/add-listing" element={<AddListingForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/userlisting" element={<UserListing />} />
          <Route path="/userinbox" element={<AdminPage />} />
          <Route path="/userlisting/edit/:id" element={<EditListing />} />
        </Routes>
      </Suspense>

      <Footer />
    </>
  );
};

export default App;
