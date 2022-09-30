import * as React from "react";
import { fetchData } from "../../utils/fetchData";
import { getDateRangeForView } from "../../utils/helpers";

interface ScheduleSlot {}

interface ScheduleStaff {}

interface ScheduleLocation {}

interface ScheduleState {
  loading: boolean;
  error?: String;
  currentDate: Date;
  currentView: String;
  appointments: any;
  slots: ScheduleSlot[];
  staff: ScheduleStaff[];
  locations: ScheduleLocation[];
  startDayHour?: number;
  endDayHour?: number;
}

enum ScheduleActionType {
  Loading,
  Loaded,
  ChangeAppointmentSlots,
  ChangeStaff,
  ChangeLocations,
  ChangeDate,
  ChangeView,
  Error,
  Data,
  Reload
}

interface ScheduleAction {
  type: ScheduleActionType;
  payload?: any;
}

interface ScheduleDispatcherContext {
  state: ScheduleState;
  dispatch: (type?: ScheduleActionType, payload?: any) => void;
}

const DefaultScheduleState = {
  loading: false,
  currentDate: new Date(),
  currentView: "Day",
  appointments: [],
  slots: [],
  staff: [],
  locations: []
};

const ScheduleContext = React.createContext<ScheduleDispatcherContext>({
  state: DefaultScheduleState,
  dispatch: () => {}
});
ScheduleContext.displayName = "ScheduleContext";

function scheduleReducer(state: ScheduleState, action: ScheduleAction) {
  switch (action.type) {
    case ScheduleActionType.Reload:
      return state;
    case ScheduleActionType.Loading: {
      return {
        ...state,
        error: undefined,
        loading: true
      };
    }
    case ScheduleActionType.Loaded:
      return { ...state, loading: false };
    case ScheduleActionType.Error: {
      return {
        ...state,
        error: action.payload as String,
        slots: [],
        appointments: []
      };
    }
    case ScheduleActionType.ChangeDate:
      console.log(action.payload);
      return { ...state, currentDate: action.payload };
    case ScheduleActionType.ChangeAppointmentSlots: {
      return { ...state, slots: action.payload as ScheduleSlot[] };
    }
    case ScheduleActionType.ChangeStaff: {
      return { ...state, staff: action.payload as ScheduleStaff[] };
    }
    case ScheduleActionType.ChangeLocations: {
      return { ...state, locations: action.payload as ScheduleLocation[] };
    }
    case ScheduleActionType.ChangeView: {
      return { ...state, currentView: action.payload as String };
    }
    case ScheduleActionType.Data: {
      console.log(action.payload);
      return {
        ...state,
        appointments: action.payload.appointments,
        slots: action.payload.slots
      };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

interface ScheduleProviderProps {
  children: React.ReactNode;
  initial: Partial<ScheduleState>;
}

const ScheduleProvider = ({ children, initial }: ScheduleProviderProps) => {
  const [state, dispatch] = React.useReducer(scheduleReducer, {
    ...DefaultScheduleState,
    ...initial
  });

  const asyncDispatch = async (type: ScheduleActionType, payload?: any) => {
    // first dispatch the action to ensure state is updated to the desired
    dispatch({ type, payload });
    // now, let's load the data to ensure the appointments and slots match the config in the state

    // first show loading progress
    dispatch({ type: ScheduleActionType.Loading });

    // get the appropriate date range for the view
    const { start, end } = getDateRangeForView(
      state.currentDate,
      state.currentView
    );

    try {
      // try to fetch the data
      const result = await fetchData({
        startDate: start,
        endDate: end,
        locationIds: state.locations.map((l) => l.id),
        staffIds: state.staff.map((s) => s.id)
      });

      if (result.success) {
        // perform a dispatch with the results
        dispatch({ type: ScheduleActionType.Data, payload: result });
      }
    } catch (ex) {
      // dispatch about the error
      dispatch({ type: ScheduleActionType.Error, payload: ex.message });
    } finally {
      // ensure the loading state is cleared no matter what
      dispatch({ type: ScheduleActionType.Loaded });
    }
  };

  const val = { state, dispatch: asyncDispatch };
  return (
    <ScheduleContext.Provider value={val}>{children}</ScheduleContext.Provider>
  );
};

function useSchedule() {
  const context = React.useContext(ScheduleContext);
  if (context === undefined) {
    throw new Error("useSchedule must be defined within a ScheduleProvider");
  }
  return context;
}

export { ScheduleProvider, useSchedule, ScheduleActionType };
