import { useEffect, useState } from "react";
import styled from "styled-components";
import { VscClose } from "react-icons/vsc";
import useClickOutside from "../hooks/useClickOutside";
import useInput from "../hooks/useInput";
import phoneCode from "../../assets/regEx";
import { useUser } from "../hooks/useUser";

const Modal = () => {
  // get user info from useUser hook
  const user = useUser();

  const [modal, setModal] = useState(false);
  const [subscribe, setSubscribe] = useState(false);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.trim() !== 0 && value.includes("@"));

  const {
    value: enteredPhoneNumber,
    isValid: enteredPhoneNumberIsValid,
    hasError: phoneNumberHasError,
    valueChangeHandler: phoneNumberHandler,
    inputBlurHandler: phoneNumberBlurHandler,
    reset: resetPhoneNumber,
  } = useInput((value) => value.length === 0 || value.match(phoneCode));

  // Form submission Validation
  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (enteredEmailIsValid && enteredPhoneNumberIsValid) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: enteredEmail,
          phoneNumber: enteredPhoneNumber,
        }),
      };
      // function that handle the email subscription to our db
      const emailSubscribtion = async () => {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/email-subscription`,
          requestOptions
        );
        const responseJson = await response.json();

        if (responseJson.status === 201) {
          setSubscribe(true);
        } else {
          setAlreadySubscribed(true);
        }
      };

      emailSubscribtion();

      return;
    }
    resetEmailInput();
    resetPhoneNumber();
  };

  // function to toggle the state of the modal
  const toggleModal = () => {
    setModal(!modal);
  };

  // set a timeOut to show the modal
  useEffect(() => {
    const timeToShowModal = setTimeout(() => {
      setModal(true);
      setSubscribe(false);
      resetEmailInput();
      resetPhoneNumber();
    }, 15000);

    // window.clearTimeout(timeToShowModal);
    return () => clearTimeout(timeToShowModal);
  }, []);

  // custom hook to check and close if we click outside the modal
  let ref = useClickOutside(() => {
    setModal(!modal);
  });

  return (
    <>
      {modal && !user && !sessionStorage.getItem("showModalOnce") && (
        <Overlay>
          <ModalEl ref={ref}>
            <ModalContent>
              <h2>LAGHATA LIST</h2>
              <p>GET 10% OFF ON YOUR FIRST RENTAL</p>
              <p>
                Be the first to know about new collections and exclusive offers.
              </p>
              {!subscribe ? (
                <>
                  <Form onSubmit={formSubmissionHandler}>
                    <input
                      type="email"
                      placeholder="Email"
                      className={emailInputHasError ? "error" : "input"}
                      value={enteredEmail}
                      onChange={emailChangeHandler}
                      onBlur={emailBlurHandler}
                      autoComplete="email"
                      required
                    />
                    {emailInputHasError && (
                      <Span>Please enter a valid email address</Span>
                    )}
                    <input
                      type="tel"
                      placeholder="Phone Number (Optional)"
                      className={phoneNumberHasError ? "error" : "input"}
                      value={enteredPhoneNumber}
                      onChange={phoneNumberHandler}
                      onBlur={phoneNumberBlurHandler}
                    />
                    {phoneNumberHasError && (
                      <Span>Please enter a valid Phone Number</Span>
                    )}
                    <Button type="submit">SIGN UP TO THE LAGHATA LIST</Button>
                  </Form>
                  {alreadySubscribed && (
                    <Span>
                      This email address is already subscribed to our list.
                    </Span>
                  )}
                </>
              ) : (
                <>
                  <h2>Thanks for signing up!</h2>

                  <p>
                    Check your email for a confirmation message and your
                    discount code.
                  </p>
                </>
              )}
              <CloseModalBtn onClick={toggleModal}>
                <VscClose />
              </CloseModalBtn>
            </ModalContent>
          </ModalEl>
        </Overlay>
      )}
    </>
  );
};

// Styled Component
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(49, 49, 49, 0.8);
  z-index: 1;
`;

const ModalEl = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #000100;
  border-radius: 10px;
  max-width: 800px;
  min-width: 300px;
  padding: 2.5rem;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;

const ModalContent = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  margin-top: 2.5rem;

  h2 {
    text-align: center;
    font-size: 2.4rem;
  }
  p {
    font-size: 1rem;
    text-align: center;
    margin-bottom: 1rem;
    font-weight: 200;
  }
`;

const CloseModalBtn = styled.div`
  color: white;
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.7rem;
  font-size: 1.7rem;
  cursor: pointer;
  transition: all 1s ease;

  &:hover {
    transform: rotate(90deg);
  }
`;

const Form = styled.form`
  width: 85%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .input {
    background: transparent;
    padding: 0.8rem 0.7rem;
    border: 1px solid white;
    outline: none;
    border-radius: 5px;
    color: white;
    font-size: 1rem;

    &:hover {
      border: 1px solid #a78398;
    }
  }

  .error {
    background: transparent;
    padding: 0.8rem 0.7rem;
    outline: none;
    border-radius: 5px;
    color: white;
    font-size: 1rem;
    border: 1px solid #cc0000;
  }
`;

const Button = styled.button`
  background: none;
  color: white;
  border: 1px solid white;
  padding: 0.9rem 2rem;
  cursor: pointer;
  border-radius: 5px;

  transition: all 1s ease-in-out;

  &:hover {
    background: white;
    color: black;
  }
`;

const Span = styled.span`
  color: #cc0000;
`;
export default Modal;
