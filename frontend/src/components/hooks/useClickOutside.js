import { useEffect, useRef } from "react";

// A hook that handle the click outside the element to be able to close it
const useClickOutside = (handler) => {
  // set ref to useRef to the target element to toggle
  let ref = useRef();

  useEffect(() => {
    // function that check if user click inside the target or not
    let clickOutsideHandler = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
        return;
      }
    };

    // listen to user click
    document.addEventListener("mousedown", clickOutsideHandler);

    return () => {
      document.removeEventListener("mousedown", clickOutsideHandler);
    };
  }, [handler]);

  return ref;
};

export default useClickOutside;
