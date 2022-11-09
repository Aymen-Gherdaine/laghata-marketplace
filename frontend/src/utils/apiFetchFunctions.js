// fetch all listing
export const fetchAllListing = async () => {
  // fetch data
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/api/get-all-listings`
  );

  // parse the response
  const responseJson = await response.json();

  return responseJson.data;
};

// fetch all renters
export const fetchAllRenters = async () => {
  // fetch data
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/api/users`
  );

  // parse the response
  const responseJson = await response.json();

  return responseJson.data;
};

// fetch user email data
export const fetchUserEmail = async (id) => {
  // fetch data
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/api/user/${id}`
  );

  const responseJson = await response.json();

  return responseJson.data.email;
};

// fetching listing data by listing id
export const fetchListingById = async (id) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/api/listings/listing/${id}`
  );

  // parse the response
  const responseJson = await response.json();

  return responseJson.data;
};

// fetch renter information by renter id
export const fetchRenter = async (renterId) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/api/user/${renterId}`
  );

  // parse the response
  const responseJson = await response.json();

  return responseJson.data;
};

// fetch Reservations information by renter id
export const fetchReservations = async (id) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/api/reservations/listing/${id}`
  );

  // parse the response
  const responseJson = await response.json();

  return responseJson.data;
};

// fetching listing data by listing id
export const fetchAllSubCategoryListing = async (id) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/api/listings/category/${id}`
  );

  // parse the response
  const responseJson = await response.json();

  return responseJson.data;
};

// fetching listing data by listing id
export const fetchAllCategoryListing = async (id) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/api/listings/${id}`
  );

  // parse the response
  const responseJson = await response.json();

  return responseJson.data;
};
