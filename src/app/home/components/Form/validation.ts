const MIN_REVIEW_LENGTH = 3;
const MAX_REVIEW_LENGTH = 100;

export const validateReview = (value: string) => {
  if (value.length < MIN_REVIEW_LENGTH) {
    return `Review must be at least ${MIN_REVIEW_LENGTH} characters long`;
  }
  if (value.length > MAX_REVIEW_LENGTH) {
    return `Review must be at most ${MAX_REVIEW_LENGTH} characters long`;
  }
  return true;
};

export const validateSelected = (value: string) => {
  if (!value) {
    return "Please select a movie";
  }
  return true;
};
