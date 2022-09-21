import { useState } from "react";
import { createContext } from "react";

export const CurrentUserListingContext = createContext();

const CurrentUserListingProvider = ({ children }) => {
  const [userListing, setUserListing] = useState([]);
  const [loading, setLoading] = useState(false);

  // delete listing
  const deleteHandler = async (id) => {
    // create a copy of our listing
    let userListingCopy = [...userListing];

    try {
      const deleteListingFromDb = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/listing/${id}`,
        {
          method: "DELETE",
        }
      );

      if (deleteListingFromDb.ok) {
        // filter the listing copy to remove the listing
        userListingCopy = userListingCopy.filter(
          (listing) => listing._id !== id
        );

        // update the state
        setUserListing(userListingCopy);

        console.log("we deleted this listing");
      } else {
        console.log("we couldn't delete this listing");
      }
    } catch (error) {
      console.log(error.stack);
    }
  };

  return (
    <CurrentUserListingContext.Provider
      value={{
        userListing,
        setUserListing,
        deleteHandler,
        setLoading,
        loading,
      }}
    >
      {children}
    </CurrentUserListingContext.Provider>
  );
};

export default CurrentUserListingProvider;
