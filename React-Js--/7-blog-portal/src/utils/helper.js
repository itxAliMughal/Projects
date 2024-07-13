import moment from "moment";

const convertDateToOurFormat = (date) => {
  if (!date) {
    return null;
  }
  return moment(date).format("MMMM D, [at] YYYY h:mm a");
};

export const helperService = {
  convertDateToOurFormat,
};
