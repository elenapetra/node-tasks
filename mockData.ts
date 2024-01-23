export const mockHolidayListShort = [
  { name: "Holiday 1", localName: "Local Holiday 1", date: "2024-01-01" },
  { name: "Holiday 2", localName: "Local Holiday 2", date: "2024-02-01" },
];

export const mockHolidayListLong = [
  {
    name: "Holiday 1",
    localName: "Local Holiday 1",
    date: "2024-01-01",
    countryCode: "Code 1",
    fixed: true,
    global: true,
    counties: ["Country 1", "Country 2"],
    launchYear: 2000,
    types: ["Type A", "Type B"],
  },
  {
    name: "Holiday 2",
    localName: "Local Holiday 2",
    date: "2024-02-01",
    countryCode: "Code 2",
    fixed: true,
    global: true,
    counties: ["Country 3", "Country 4"],
    launchYear: 2000,
    types: ["Type C", "Type D"],
  },
];

export const expectedHoliday = {
  date: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
  localName: expect.any(String),
  name: expect.any(String),
};

export const mockCountry = "FR";
export const mockYear = 2024;
export const currentDate = new Date();
