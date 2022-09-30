import {
  endOfDay,
  startOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth
} from "date-fns";

interface DateRange {
  start: Date;
  end: Date;
}

const getDateRangeForView = (currentDate: Date, view: String): DateRange => {
  console.debug(`Getting start and end of ${view} for ${currentDate}`);
  switch (view) {
    case "Day":
      return { start: startOfDay(currentDate), end: endOfDay(currentDate) };
    case "Week":
      return { start: startOfWeek(currentDate), end: endOfWeek(currentDate) };
    case "Month":
      return { start: startOfMonth(currentDate), end: endOfMonth(currentDate) };
    default:
      throw new Error(`Unsupported view ${view}`);
  }
};

export { getDateRangeForView };
