import axios from "axios";
import {
  mockHolidayListLong,
  mockHolidayListShort,
  mockCountry,
  mockYear,
  currentDate,
} from "../../mockData";
import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays,
} from "../../public-holidays.service";

jest.mock("axios");

describe("Unit tests for public-holidays.service.ts file ", () => {
  describe("Get a list of public holidays", () => {
    it("should return a list of shortened public holidays", async () => {
      jest
        .spyOn(axios, "get")
        .mockResolvedValueOnce({ data: mockHolidayListLong });

      const result = await getListOfPublicHolidays(mockYear, mockCountry);

      expect(axios.get).toHaveBeenCalledWith(
        `https://date.nager.at/api/v3/PublicHolidays/${mockYear}/${mockCountry}`
      );
      expect(result).toEqual(mockHolidayListShort);
    });

    it("should handle errors and return an empty array", async () => {
      jest
        .spyOn(axios, "get")
        .mockRejectedValueOnce(new Error("Failed to fetch public holidays"));

      const result = await getListOfPublicHolidays(mockYear, mockCountry);

      expect(result).toEqual([]);
    });
  });

  describe("Check if today is a public holiday", () => {
    it("should return true if today is a public holiday", async () => {
      const todayDate = new Date().toISOString().split("T")[0];
      const mockIsPublicHoliday = [
        { date: todayDate, name: "Today's Holiday" },
      ];

      jest
        .spyOn(axios, "get")
        .mockResolvedValueOnce({ data: mockIsPublicHoliday, status: 200 });

      const result = await checkIfTodayIsPublicHoliday(mockCountry);

      expect(axios.get).toHaveBeenCalledWith(
        `https://date.nager.at/api/v3/IsTodayPublicHoliday/${mockCountry}`
      );

      expect(result).toBe(true);
    });

    it("should return false if today is not a public holiday", async () => {
      const mockIsNotPublicHoliday = [];

      jest
        .spyOn(axios, "get")
        .mockResolvedValueOnce({ data: mockIsNotPublicHoliday, status: 200 });

      const result = await checkIfTodayIsPublicHoliday(mockCountry);

      expect(axios.get).toHaveBeenCalledWith(
        `https://date.nager.at/api/v3/IsTodayPublicHoliday/${mockCountry}`
      );
      expect(result).toBe(false);
    });
  });

  describe("Get a list of next public holidays", () => {
    it("should return a list of next public holidays", async () => {
      const expectedHoliday = {
        date: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
        localName: expect.any(String),
        name: expect.any(String),
      };

      jest.spyOn(axios, "get").mockResolvedValueOnce({ data: expectedHoliday });

      const result = await getNextPublicHolidays(mockCountry);

      expect(axios.get).toHaveBeenCalledWith(
        `https://date.nager.at/api/v3/NextPublicHolidays/${mockCountry}`
      );

      const filteredResult = result.filter(
        (holiday) => new Date(holiday.date) >= currentDate
      );

      if (filteredResult.length > 0) {
        filteredResult.forEach((holiday) => {
          expect(holiday).toEqual(expectedHoliday);
        });
      } else return [];

      expect(result).toEqual(expectedHoliday);
    });

    it("should handle errors and return an empty array", async () => {
      jest
        .spyOn(axios, "get")
        .mockRejectedValueOnce(new Error("Failed to fetch public holidays"));

      const result = await getNextPublicHolidays(mockCountry);

      expect(result).toEqual([]);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
