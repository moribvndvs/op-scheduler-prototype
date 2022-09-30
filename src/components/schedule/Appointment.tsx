import * as React from "react";
import { Appointments } from "@devexpress/dx-react-scheduler-material-ui";

type AppointmentProps = Appointments.AppointmentProps & {
  style?: React.CSSProperties;
};

const Appointment = ({
  children,
  style,
  data,
  ...restProps
}: AppointmentProps) => (
  <Appointments.Appointment
    {...restProps}
    data={data}
    style={{
      ...style,
      borderLeft: `solid 5px ${data.color}`,
      ...(data.outOfOffice
        ? {
            background:
              "repeating-linear-gradient(-45deg, #F0F0F0, #F0F0F0 5px, white 5px, white 10px)"
          }
        : { background: "rgb(100, 181, 246)" })
    }}
  >
    {children}
  </Appointments.Appointment>
);

Appointment.Content = ({
  children,
  data,
  ...restProps
}: Appointments.AppointmentContentProps) => (
  <Appointments.AppointmentContent
    {...restProps}
    style={data.outOfOffice ? { color: "black" } : {}}
    data={data}
  >
    {children}
  </Appointments.AppointmentContent>
);

export default Appointment;
