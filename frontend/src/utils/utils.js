window.Buffer = window.Buffer || require("buffer").Buffer;

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

// Get Payload From Token
export const getPayloadFromToken = (token) => {
  const encodedPayload = token?.split(".")[1];

  const user = JSON.parse(Buffer.from(encodedPayload, "base64"));
  return user?.data;
};
