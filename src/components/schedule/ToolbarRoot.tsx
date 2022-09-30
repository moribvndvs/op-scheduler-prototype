import React from "react";
import Toolbar from "@mui/material/Toolbar";
import ToggleButton from "@mui/material/ToggleButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SettingsIcon from "@mui/icons-material/Settings";

import { useSchedule } from "./ScheduleProvider";

export default ({ children }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const {
    state: { loading }
  } = useSchedule();

  return (
    <div>
      <Toolbar variant="regular">
        {children}
        <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1.5 }} />
        <ToggleButton
          size="small"
          key="settings"
          value="settings"
          onClick={handleClick}
          aria-label="Schedule settings"
          aria-controls={open ? "schedule-settings" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <SettingsIcon />
          <ArrowDropDownIcon />
        </ToggleButton>
        <Menu
          anchorEl={anchorEl}
          id="schedule-settings"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
        >
          <MenuItem>Test</MenuItem>
        </Menu>
      </Toolbar>
      {loading && <LinearProgress />}
      {!loading && <Divider sx={{ height: 3 }} />}
    </div>
  );
};
