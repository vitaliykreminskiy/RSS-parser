import moment from "moment";

const DATE_BEAUTIFIED_FORMAT: string = "MMMM Do YYYY, hh:mm";

/**
 * Incoming date format ISO 8601
 */
export const beautifyDate = (input: string): string =>
  moment(input).format(DATE_BEAUTIFIED_FORMAT);
