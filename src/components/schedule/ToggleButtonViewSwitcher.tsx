import * as React from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import CalendarViewWeekIcon from "@mui/icons-material/CalendarViewWeek";
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";

export default (props) => (
  <ToggleButtonGroup
    exclusive
    aria-label="Change calendar view"
    value={props.currentView.name}
    onChange={(_, value) => props.onChange(value)}
    size="small"
    color="primary"
  >
    {props.availableViews.map((view) => (
      <ToggleButton
        key={view.name}
        value={view.name}
        aria-label={view.displayName}
      >
        {view.name === "Day" && <CalendarViewDayIcon />}
        {view.name === "Week" && <CalendarViewWeekIcon />}
        {view.name === "Month" && <CalendarViewMonthIcon />}
      </ToggleButton>
    ))}
  </ToggleButtonGroup>
);
