import React, { useEffect } from "react";
import Schedule from "./Schedule";
import { useSchedule, ScheduleActionType } from "./ScheduleProvider";

export default () => {
  const {
    state: {
      appointments,
      staff,
      locations,
      currentDate,
      currentView,
      startDayHour,
      endDayHour
    },
    dispatch
  } = useSchedule();

  console.log(`Container: ${appointments}`);

  // handlers
  const handleOnCurrentViewNameChange = (name: String) => {
    dispatch(ScheduleActionType.ChangeView, name);
  };

  const handleOnCurrentDateChange = (date: Date) => {
    // console.debug(`Requesting date change to ${date}`);
    dispatch(ScheduleActionType.ChangeDate, date);
  };

  // force loading of data on load
  useEffect(() => {
    function fetchData() {
      dispatch(ScheduleActionType.Reload);
    }
    // fetchData();
  }, []);

  return (
    <Schedule
      currentDate={currentDate}
      currentView={currentView}
      appointments={appointments}
      staff={staff}
      locations={locations}
      startDayHour={startDayHour}
      endDayHour={endDayHour}
      onCurrentViewNameChange={handleOnCurrentViewNameChange}
      onCurrentDateChange={handleOnCurrentDateChange}
    />
  );
};
