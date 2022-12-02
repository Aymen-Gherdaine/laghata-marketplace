import React, { useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Testimotials title
const testimonialTitle = "What are our customers saying?";

// Animation Variants
const container = {
  show: {
    transition: {
      staggerChildren: 0.85,
    },
  },
};

const title = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.2,
      staggerChildren: 0.08,
    },
  },
};

const letterAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 200,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 1.6,
    },
  },
  exit: {
    opacity: 0,
    y: -200,
    transition: {
      ease: "easeInOut",
      duration: 0.8,
    },
  },
};

// Testimonials
const testimonials = [
  {
    id: 1,
    review: `The kayak was amazing. I use it for fishing as well as racing.
    There are so many different features and adjustments that I
    never get bored.`,
    img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    username: "Jessica Welk",
  },
  {
    id: 2,
    review: ` I was actually very impressed with the rental process and the
    overall quality of the bike I rented. I got a comfortable bike
    with a great set of lights`,
    img: "https://images.unsplash.com/photo-1520466809213-7b9a56adcd45?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODF8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    username: "Mary Thomas",
  },
  {
    id: 3,
    review: ` The gears are easy to use, and it's easy to turn the pedals by
    using my feet instead of my hands. It's easy`,
    img: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    username: "Nick Smith",
  },
];

const Testimonials = () => {
  // using useInView hook to trigger when the elements is in view
  const { ref, inView } = useInView({
    threshold: 0.2,
  });

  // hook from framer-motion to configure the animation
  const animation = useAnimation();

  // start animation when section is in view
  useEffect(() => {
    inView
      ? animation.start("show") &&
        animation.start("visible") &&
        animation.stop("exit")
      : animation.set("hidden");
  }, [inView]);

  return (
    <section ref={ref}>
      <TestimonialsTitle>
        <motion.h2 variants={title} animate={animation}>
          {[...testimonialTitle].map((letter, index) => {
            return (
              <motion.span
                key={letter + "-" + index}
                variants={letterAnimation}
              >
                {letter}
              </motion.span>
            );
          })}
        </motion.h2>
      </TestimonialsTitle>

      <motion.div variants={container} animate={animation}>
        <TestimonialsSection>
          {testimonials.map(({ id, review, img, username }) => {
            return (
              <motion.div
                variants={item}
                className="testimonialsWrapper"
                key={id}
              >
                <Review>{review}</Review>
                <ReviewBottom>
                  <img src={img} alt={`picture of ${username}`} />
                  <span>{username}</span>
                </ReviewBottom>
              </motion.div>
            );
          })}
        </TestimonialsSection>
      </motion.div>
    </section>
  );
};

// Testimonials Styles
const TestimonialsTitle = styled.div`
  text-align: center;
  margin-bottom: 40px;

  @media screen and (max-width: 700px) {
    font-size: 25px;
    width: 80%;
    margin: 3rem auto;
  }
`;

const TestimonialsSection = styled.section`
  max-width: 1300px;
  display: flex;
  gap: 20px;
  width: 80%;
  margin: 0 auto;

  .testimonialsWrapper {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    width: 30%;
    height: 300px;
    border-radius: 25px;
    padding: 15px;
    position: relative;
    cursor: pointer;
    transition: all 0.5s ease-out;

    :hover {
      scale: 1.05;
    }

    &:before,
    &:after {
      font-family: Revalia;
      color: #f5f0ed;
      font-size: 100px;
      position: absolute;
    }

    &:before {
      content: "“";
      top: -5px;
      left: 10px;
    }

    &:after {
      content: "”";
      bottom: -52px;
      right: 10px;
    }

    @media screen and (max-width: 700px) {
      width: 90%;
    }
  }

  @media screen and (max-width: 700px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Review = styled.p`
  text-align: center;
  font-weight: 500;
  padding-top: 50px;
`;

const ReviewBottom = styled.div`
  position: absolute;
  bottom: 17px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 9px;

  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
`;

export default Testimonials;
