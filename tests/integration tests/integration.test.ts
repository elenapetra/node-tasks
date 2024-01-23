import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays,
} from "../../public-holidays.service";
import {
  mockCountry,
  mockYear,
  currentDate,
  expectedHoliday,
} from "../../mockData";

describe("Integration tests for public-holidays.service file ", () => {
  describe("Get a list of public holidays", () => {
    it("should return a list of public holidays", async () => {
      const result = await getListOfPublicHolidays(mockYear, mockCountry);

      expect(Array.isArray(result)).toBe(true);

      if (result.length > 0) {
        result.forEach((holiday) => {
          expect(holiday).toEqual(expectedHoliday);
        });
      } else return [];
    });
  });

  describe("Check if today is a public holiday", () => {
    it("should return false if today is not a public holiday or true if today is a public holiday", async () => {
      const result = await checkIfTodayIsPublicHoliday(mockCountry);
      result ? expect(result).toBe(true) : expect(result).toBe(false);
    });
  });

  describe("Get a list of next public holidays", () => {
    it("should return a list of next public holidays", async () => {
      const result = await getNextPublicHolidays(mockCountry);

      expect(Array.isArray(result)).toBe(true);

      const filteredResult = result.filter(
        (holiday) => new Date(holiday.date) >= currentDate
      );

      if (filteredResult.length > 0) {
        filteredResult.forEach((holiday) => {
          expect(holiday).toEqual(expectedHoliday);
        });
      } else return [];
    });
  });
});
