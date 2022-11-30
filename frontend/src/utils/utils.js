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

// post pictures to cloudinary
export const postPictureToCloudinary = async (pictures, setPicture) => {
  if (pictures.type === "image/jpeg" || pictures.type === "image/png") {
    const data = new FormData();
    data.append("file", pictures);
    data.append("upload_preset", "laghata-app");
    data.append("cloud_name", "laghata");

    try {
      const postPicture = await fetch(
        `${process.env.REACT_APP_CLOUDINARY_url}`,
        {
          method: "POST",
          body: data,
        }
      );
      const responseJson = await postPicture.json();

      setPicture(responseJson.secure_url.toString());
    } catch (error) {
      console.log(error.stack);
    }
  }
};
