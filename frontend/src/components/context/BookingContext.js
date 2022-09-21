import { useState } from "react";
import { createContext } from "react";
import { addDays } from "date-fns";

export const BookingContext = createContext();

const BookingContextProvider = ({ children }) => {
  const [bookingLoading, setBookingLoading] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);

  return (
    <BookingContext.Provider
      value={{
        dateRange,
        setDateRange,
        setBookingLoading,
        bookingLoading,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContextProvider;
