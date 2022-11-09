import GlobalStyle from "./GlobalStyle";
import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import Modal from "./components/styleComponents/Modal";
import LoadingSpinner from "./components/styleComponents/LoadingSpinner";

import Header from "./components/header/Header";
import Home from "./pages/Home";
import SignUp from "./components/auth/SignUp";
import LogIn from "./components/auth/LogIn";
import Footer from "./components/footer/Footer";
import Categories from "./pages/Categories";
import SubCategory from "./pages/SubCategory";
import Category from "./pages/Category";

// implementing lazy loading to some route
const Profile = lazy(() => import("./pages/Profile"));
const AddListingForm = lazy(() =>
  import("./components/Listing/addListing/AddListingForm")
);
const UserListing = lazy(() => import("./pages/UserListing"));
const EditListing = lazy(() =>
  import("./components/Listing/editListing/EditListing")
);
const Listing = lazy(() => import("./pages/Listing"));
const Renter = lazy(() => import("./pages/Renter"));
const BookingPage = lazy(() => import("./pages/BookingPage"));
const AdminPage = lazy(() => import("./components/chatSystem/AdminPage"));
const ForgotPassword = lazy(() => import("./components/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("./components/auth/ResetPassword"));
const EmailVerificationPage = lazy(() =>
  import("./pages/EmailVerificationPage")
);

const App = () => {
  return (
    <>
      <GlobalStyle />

      <Header />

      <Modal />

      <Suspense fallback={<LoadingSpinner />}>
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
