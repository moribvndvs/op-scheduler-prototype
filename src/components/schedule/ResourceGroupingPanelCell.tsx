import * as React from "react";
import Avatar from "@mui/material/Avatar";
import { GroupingPanel } from "@devexpress/dx-react-scheduler-material-ui";

import { useSchedule } from "./ScheduleProvider";

export default ({ group, children, ...restProps }) => {
  const {
    state: { staff }
  } = useSchedule();
  const member =
    group.fieldName === "staff" ? staff.find((s) => s.id === group.id) : null;
  return (
    <GroupingPanel.Cell
      {...restProps}
      group={group}
      sx={{
        "& .Cell-text": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }}
    >
      {group.fieldName === "staff" && (
        <Avatar
          alt={group.text}
          sx={{ width: 24, height: 24, marginRight: ".5em", order: -1 }}
          src={member.photo}
        />
      )}
    </GroupingPanel.Cell>
  );
};
