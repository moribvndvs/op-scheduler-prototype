import { faker } from "@faker-js/faker";
import {
  differenceInDays,
  addDays,
  startOfDay,
  endOfDay,
  addHours,
  subHours,
  addMinutes
} from "date-fns";

interface FetchParameters {
  startDate: Date;
  endDate: Date;
  locationIds: number[];
  staffIds: number[];
}

interface FetchResult {
  success: boolean;
  error?: String;
  appointments: any;
  slots: any;
}

interface FakeDataCache {
  [key: string]: { slots: any; appointments: any };
}

const fakeDataCache: FakeDataCache = {};

function idGenerator() {
  let id = 0;

  return () => {
    return ++id;
  };
}

function pickRandomStaff(staffIds: number[]): number[] {
  const numberOfStaff = Math.floor(Math.random() * staffIds.length);
  return staffIds.reduce<number[]>((prev, current) => {
    if (prev.length >= numberOfStaff || prev.includes(current)) return prev;
    prev.push(current);
    return prev;
  }, []);
}

function pickRandomLocation(locationIds: number[]): number {
  return locationIds[Math.floor(Math.random() * locationIds.length)];
}

const apptTypes = [
  { id: 1, name: "SICK VISIT", color: "red" },
  { id: 2, name: "WELL VISIT", color: "blue" },
  { id: 3, name: "CONSULTATION", color: "yellow" }
];

function pickRandomApptType() {
  return apptTypes[Math.floor(Math.random() * apptTypes.length)];
}

function generateFakeData(query: FetchParameters) {
  const days = differenceInDays(query.startDate, query.endDate) + 1;
  console.debug(
    `Generating ${days} days worth of appointments between ${query.startDate} and ${query.endDate}`
  );

  return [...Array(days)]
    .map((_, i) => {
      const today = startOfDay(addDays(query.startDate, i));
      console.debug(`Generating for day ${i}, ${today}`);
      const numberOfAppts = Math.floor(Math.random() * 15);
      const startDates = faker.date.betweens(
        addHours(startOfDay(today), 6), // no earlier than 6 AM
        subHours(endOfDay(today), 6), // no later than 8 PM
        numberOfAppts
      );

      return startDates.map((start) => {
        const apptType = pickRandomApptType();
        return {
          id: idGenerator()(),
          startDate: start,
          endDate: addMinutes(start, Math.floor(Math.random() * 24) * 5),
          staff: pickRandomStaff(query.staffIds),
          locationId: pickRandomLocation(query.locationIds),
          appointmentType: apptType,
          color: apptType.color
        };
      });
    })
    .reduce((prev, current) => [...prev, ...current], []);
}

const appointmentSlots = [
  {
    id: 1,
    text: "SICK VISIT",
    staff: 1,
    location: 1,
    color: "#FF0000",
    startDate: new Date(2017, 4, 28, 9, 0),
    endDate: new Date(2017, 4, 28, 12, 0)
  },
  {
    id: 2,
    text: "SICK VISIT",
    staff: 1,
    location: 2,
    color: "#FF0000",
    startDate: new Date(2017, 4, 28, 9, 0),
    endDate: new Date(2017, 4, 28, 12, 0)
  },
  {
    id: 3,
    text: "SICK VISIT",
    staff: 2,
    location: 1,
    color: "#FF0000",
    startDate: new Date(2017, 4, 28, 9, 0),
    endDate: new Date(2017, 4, 28, 12, 0)
  },
  {
    id: 4,
    text: "SICK VISIT",
    staff: 2,
    location: 2,
    color: "#FF0000",
    startDate: new Date(2017, 4, 28, 9, 0),
    endDate: new Date(2017, 4, 28, 12, 0)
  },
  {
    id: 5,
    text: "WELL VISIT",
    staff: 1,
    location: 1,
    color: "#000000",
    startDate: new Date(2017, 4, 28, 12, 0),
    endDate: new Date(2017, 4, 28, 15, 0)
  },
  {
    id: 6,
    text: "WELL VISIT",
    staff: 1,
    location: 2,
    color: "#000000",
    startDate: new Date(2017, 4, 28, 12, 0),
    endDate: new Date(2017, 4, 28, 15, 0)
  },
  {
    id: 7,
    text: "WELL VISIT",
    staff: 2,
    location: 1,
    color: "#000000",
    startDate: new Date(2017, 4, 28, 9, 0),
    endDate: new Date(2017, 4, 28, 12, 0)
  },
  {
    id: 8,
    text: "WELL VISIT",
    staff: 2,
    location: 2,
    color: "#000000",
    startDate: new Date(2017, 4, 28, 9, 0),
    endDate: new Date(2017, 4, 28, 12, 0)
  },
  {
    id: 9,
    text: "SOME OTHER VISIT",
    staff: 2,
    location: 1,
    color: "#00FF00",
    startDate: new Date(2017, 4, 28, 12, 0),
    endDate: new Date(2017, 4, 28, 12, 45)
  },
  {
    id: 9,
    text: "SOME OTHER VISIT",
    staff: 2,
    location: 2,
    color: "#00FF00",
    startDate: new Date(2017, 4, 28, 12, 0),
    endDate: new Date(2017, 4, 28, 12, 45)
  },
  {
    id: 10,
    text: "SOME OTHER VISIT 2",
    staff: 2,
    location: 1,
    color: "#0000FF",
    startDate: new Date(2017, 4, 28, 13, 0),
    endDate: new Date(2017, 4, 28, 14, 0)
  },
  {
    id: 11,
    text: "SOME OTHER VISIT 2",
    staff: 2,
    location: 2,
    color: "#0000FF",
    startDate: new Date(2017, 4, 28, 13, 0),
    endDate: new Date(2017, 4, 28, 14, 0)
  }
];

const fetchData = (query: FetchParameters) => {
  return new Promise<FetchResult>((resolve, reject) => {
    setTimeout(() => {
      const key = JSON.stringify(query);

      if (fakeDataCache[key]) {
        resolve({ success: true, ...fakeDataCache[key] });
      } else {
        const fakeData = {
          appointments: generateFakeData(query),
          slots: appointmentSlots
        };
        console.log(fakeData);
        fakeDataCache[key] = fakeData;
        resolve({ success: true, ...fakeData });
      }
      // TODO: generate fake appts/slots
      // const appointments = [
      //   {
      //     id: 1,
      //     title: "Baron, Red: SICK VISIT",
      //     staff: [1, 2],
      //     locationId: 1,
      //     startDate: new Date(2017, 4, 28, 9, 30),
      //     endDate: new Date(2017, 4, 28, 10, 0),
      //     color: "red"
      //   },
      //   {
      //     id: 2,
      //     title: "Lenin, V.I.: WELL VISIT",
      //     staff: [1],
      //     locationId: 2,
      //     startDate: new Date(2017, 4, 28, 13, 30),
      //     endDate: new Date(2017, 4, 28, 13, 40),
      //     color: "green"
      //   },
      //   {
      //     id: 10,
      //     title: "Lunch",
      //     staff: [1],
      //     locationId: 2,
      //     startDate: new Date(2017, 4, 28, 12, 0),
      //     endDate: new Date(2017, 4, 28, 13, 0),
      //     outOfOffice: true
      //   },
      //   {
      //     id: 11,
      //     title: "Lunch",
      //     staff: [1],
      //     locationId: 1,
      //     startDate: new Date(2017, 4, 28, 12, 0),
      //     endDate: new Date(2017, 4, 28, 13, 0),
      //     outOfOffice: true
      //   },
      //   {
      //     id: 12,
      //     title: "Lunch",
      //     staff: [2],
      //     locationId: 1,
      //     startDate: new Date(2017, 4, 28, 12, 30),
      //     endDate: new Date(2017, 4, 28, 13, 0),
      //     outOfOffice: true
      //   },
      //   {
      //     id: 13,
      //     title: "Lunch",
      //     staff: [2],
      //     locationId: 2,
      //     startDate: new Date(2017, 4, 28, 12, 30),
      //     endDate: new Date(2017, 4, 28, 13, 0),
      //     outOfOffice: true
      //   },
      //   {
      //     id: 3,
      //     title: "Pilot, Baby: WELL VISIT",
      //     staff: [1, 2],
      //     locationId: 1,
      //     startDate: new Date(2017, 4, 28, 13, 5),
      //     endDate: new Date(2017, 4, 28, 13, 15),
      //     color: "black"
      //   },
      //   {
      //     id: 4,
      //     title: "Philapeno: SICK VISIT",
      //     staff: [1, 2],
      //     locationId: 2,
      //     startDate: new Date(2017, 4, 28, 9, 30),
      //     endDate: new Date(2017, 4, 28, 12, 0),
      //     color: "blue"
      //   }
      // ];

      // resolve({ success: true, appointments, slots: appointmentSlots });
    }, 2000);
  });
};

export { fetchData };
