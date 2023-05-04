let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

// event start-end format: 2023-05-04T12:00:00 - ISO 8601

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: "All-day event",
    start: todayStr,
    client: "Mike",
    phone: "15679475465",
    email: "mike@mail.com",
    insuarance: "34165461",
  },
  {
    id: createEventId(),
    title: "Barber event",
    start: todayStr + "T12:00:00",
    end: todayStr + "T13:15:00",
    client: "Pete Johnes",
    phone: "156234465",
    email: "petejohnes@mail.com",
    insuarance: "3423465461",
  },
  {
    id: createEventId(),
    title: "Workout event",
    start: todayStr + "T16:00:00",
    end: todayStr + "T16:30:00",
    client: "Bony West",
    phone: "1898775465",
    email: "bonywest@mail.com",
    insuarance: "3421342461",
  },
];

export function createEventId() {
  return String(eventGuid++);
}
