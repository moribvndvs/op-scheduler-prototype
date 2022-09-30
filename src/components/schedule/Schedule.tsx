import React from "react";
import Paper from "@mui/material/Paper";
import {
  ViewState,
  GroupingState,
  IntegratedGrouping
} from "@devexpress/dx-react-scheduler";
import {
  Toolbar,
  TodayButton,
  DateNavigator,
  Scheduler,
  WeekView,
  DayView,
  MonthView,
  Appointments,
  ViewSwitcher,
  Resources,
  GroupingPanel,
  AppointmentTooltip,
  CurrentTimeIndicator
} from "@devexpress/dx-react-scheduler-material-ui";
import SlotTimeTableCell from "./SlotTimeTableCell";
import Appointment from "./Appointment";
import ResourceGroupingPanelCell from "./ResourceGroupingPanelCell";
import ToggleButtonViewSwitcher from "./ToggleButtonViewSwitcher";
import ToolbarRoot from "./ToolbarRoot";

export default ({
  appointments,
  staff,
  locations,
  currentDate,
  startDayHour,
  endDayHour,
  currentView,
  onCurrentViewNameChange,
  onCurrentDateChange
}) => {
  const resources = [
    {
      fieldName: "staff",
      title: "Staff",
      instances: staff,
      allowMultiple: true
    },
    {
      fieldName: "locationId",
      title: "Location",
      instances: locations,
      allowMultiple: false
    }
  ];
  const grouping = [{ resourceName: "locationId" }, { resourceName: "staff" }];

  return (
    <Paper>
      <Scheduler data={appointments}>
        <ViewState
          currentDate={currentDate}
          currentViewName={currentView}
          onCurrentViewNameChange={onCurrentViewNameChange}
          onCurrentDateChange={onCurrentDateChange}
        />
        <GroupingState grouping={grouping} />
        <DayView
          startDayHour={startDayHour}
          endDayHour={endDayHour}
          timeTableCellComponent={SlotTimeTableCell.Day}
        />
        <WeekView
          startDayHour={startDayHour}
          endDayHour={endDayHour}
          timeTableCellComponent={SlotTimeTableCell.Week}
        />
        <MonthView />
        <Toolbar rootComponent={ToolbarRoot} />
        <ViewSwitcher switcherComponent={ToggleButtonViewSwitcher} />
        <DateNavigator />
        <TodayButton />
        <Appointments
          appointmentComponent={Appointment}
          appointmentContentComponent={Appointment.Content}
        />
        <AppointmentTooltip />
        <Resources data={resources} mainResourceName="staff" />
        <IntegratedGrouping />
        <GroupingPanel cellComponent={ResourceGroupingPanelCell} />
        <CurrentTimeIndicator />
      </Scheduler>
    </Paper>
  );
};
