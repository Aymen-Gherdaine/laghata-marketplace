// function to get all days between two dates
export const getDatesInRange = (startDate, endDate) => {
  const date = new Date(startDate.getTime());

  // Exclude start date
  date.setDate(date.getDate() + 1);

  const dates = [];

  // Exclude end date
  while (date <= endDate) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
};

// function to scroll to top each time we change the page
export const scrollToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
};
