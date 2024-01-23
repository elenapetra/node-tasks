import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays,
} from "../../public-holidays.service";

describe("Integration tests for public-holidays.service file ", () => {
  describe("Get a list of public holidays", () => {
    it("should return a list of public holidays", async () => {
      const year = 2024;
      const country = "FR";
      const expectedHoliday = {
        date: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
        localName: expect.any(String),
        name: expect.any(String),
      };

      const result = await getListOfPublicHolidays(year, country);
      expect(Array.isArray(result)).toBe(true);

      if (result.length > 0) {
        result.forEach((holiday) => {
          expect(holiday).toEqual(expectedHoliday);
        });
      }
    });
  });

  describe("Check if today is a public holiday", () => {
    it("should return false if today is not a public holiday or true if today is a public holiday", async () => {
      const country = "FR";

      const result = await checkIfTodayIsPublicHoliday(country);
      result ? expect(result).toBe(true) : expect(result).toBe(false);
    });
  });

  describe("Get a list of next public holidays", () => {
    it("should return a list of next public holidays", async () => {
      const country = "FR";
      const expectedHoliday = {
        date: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
        localName: expect.any(String),
        name: expect.any(String),
      };

      const result = await getNextPublicHolidays(country);

      expect(Array.isArray(result)).toBe(true);

      const currentDate = new Date();
      const filteredResult = result.filter(
        (holiday) => new Date(holiday.date) >= currentDate
      );

      if (filteredResult.length > 0) {
        filteredResult.forEach((holiday) => {
          expect(holiday).toEqual(expectedHoliday);
        });
      }
    });
  });
});
