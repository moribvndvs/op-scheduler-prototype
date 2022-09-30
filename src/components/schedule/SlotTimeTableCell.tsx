import * as React from "react";
import { DayView, WeekView } from "@devexpress/dx-react-scheduler-material-ui";
import { alpha } from "@mui/material/styles";
import { useSchedule } from "./ScheduleProvider";

const SlotTimeTableCell = ({
  timeTableCellComponent: TimeTableCellComponent, // must be DayView.TimeTableCell or WeekView.TimeTableCell
  startDate,
  endDate,
  groupingInfo,
  ...restProps
}) => {
  const {
    state: { slots }
  } = useSchedule();
  const staff = groupingInfo.find((g) => g.fieldName === "staff");
  const location = groupingInfo.find((g) => g.fieldName === "locationId");
  const slot = slots.find(
    (s) =>
      s.startDate <= startDate &&
      s.endDate >= endDate &&
      s.staff === staff.id &&
      s.location === location.id
  );

  const handleDoubleClick = () => {
    if (!slot) {
      alert(
        `TODO: create new appointment for ${staff.text} at ${location.text}`
      );
    } else {
      alert(
        `TODO: create new ${slot.text} appointment for ${staff.text} at ${location.text}`
      );
    }
  };

  return (
    <TimeTableCellComponent
      {...restProps}
      startDate={startDate}
      endDate={endDate}
      groupingInfo={groupingInfo}
      className="appointment-slot-time-cell"
      sx={{
        ...(slot ? { backgroundColor: alpha(slot.color, 0.2) } : {})
      }}
      onDoubleClick={handleDoubleClick}
    />
  );
};

SlotTimeTableCell.Day = (props) => (
  <SlotTimeTableCell
    timeTableCellComponent={DayView.TimeTableCell}
    {...props}
  />
);
SlotTimeTableCell.Week = (props) => (
  <SlotTimeTableCell
    timeTableCellComponent={WeekView.TimeTableCell}
    {...props}
  />
);

export default SlotTimeTableCell;
