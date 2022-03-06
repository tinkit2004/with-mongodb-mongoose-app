const topVariant = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 1,
      when: "beforeChildren",
      staggerChildren: 0.5,
    },
  },
};
const leftFadeInVariant = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 1 } },
};
const rightFadeInVariant = {
  hidden: { x: 20, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 1 } },
};
export { topVariant, leftFadeInVariant, rightFadeInVariant };
