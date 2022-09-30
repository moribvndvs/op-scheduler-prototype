import * as React from "react";
import ScheduleContainer from "./components/schedule/ScheduleContainer";
import { ScheduleProvider } from "./components/schedule/ScheduleProvider";

export default () => {
  // fetch current schedule config: providers, staff, day hours, etc.
  const locations = [
    { id: 1, text: "Main Street Peds" },
    { id: 2, text: "Alpha Peds" }
  ];

  const staff = [
    {
      id: 1,
      text: "Roscoe Barbar",
      photo: "https://ca.slack-edge.com/T030ELR4C-U0347KQ73A9-56b386bd5114-512"
    },
    {
      id: 2,
      text: "John Doe",
      photo: "https://ca.slack-edge.com/T030ELR4C-U4V28PR3N-f1982b28c2a4-512"
    }
  ];

  // now build initial state
  const initialState = {
    currentDate: new Date("2017-05-28T00:00:00-05:00"),
    currentView: "Day",
    staff: staff,
    locations: locations,
    startDayHour: 8,
    endDayHour: 17
  };

  return (
    <ScheduleProvider initial={initialState}>
      <ScheduleContainer />
    </ScheduleProvider>
  );
};
