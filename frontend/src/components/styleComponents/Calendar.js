import React, { useState, useContext } from "react";
import styled from "styled-components";
import { DateRange } from "react-date-range";
import format from "date-fns/format";
import { getDatesInRange } from "../../utils/utils";
import useClickOutside from "../hooks/useClickOutside";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { BookingContext } from "../context/BookingContext";

const Calendar = ({ reservations }) => {
  const { dateRange, setDateRange } = useContext(BookingContext);

  // open and close the calander
  const [open, setOpen] = useState(false);

  // custom hook to check and close if we click outside the calender
  let ref = useClickOutside(() => {
    setOpen(false);
  });

  // looping over the reservations array to get all days to disable
  const allDisabledDates = reservations
    .map((reservation) => {
      const d1 = reservation.bookingDate[0].startDate.slice(0, 10);
      const d2 = reservation.bookingDate[0].endDate.slice(0, 10);

      const startDate = new Date(d1);
      const endDate = new Date(d2);

      let dates = getDatesInRange(startDate, endDate);

      return dates;
    })
    .flat(1);

  return (
    <div>
      <Input
        value={`${format(dateRange[0].startDate, "MM/dd/yyyy")} to ${format(
          dateRange[0].endDate,
          "MM/dd/yyyy"
        )}`}
        readOnly
        onClick={() => setOpen(!open)}
      />

      <CalenderWrapper ref={ref}>
        {open && (
          <DateRange
            onChange={(date) => setDateRange([date.selection])}
            ranges={dateRange}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            months={1}
            minDate={new Date()}
            disabledDates={[...allDisabledDates]}
            direction="horizontal"
            className="calender"
          />
        )}
      </CalenderWrapper>
    </div>
  );
};

// Calander style
const Input = styled.input`
  padding: 7px;
  width: 90%;
  font-size: 17px;
  border-radius: 5px;
  border: 1px solid;
  outline: none;
  color: #242526;
`;

const CalenderWrapper = styled.div`
  .calender {
    width: 90%;
  }
`;
export default Calendar;
