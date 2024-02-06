import { validateInput, shortenPublicHoliday } from "../../helpers";
import {
  mockHolidayListLong,
  mockHolidayListShort,
  mockCountry,
  mockYear,
} from "../../mockData";

describe("Unit tests for helpers.ts file", () => {
  describe("Validate input function", () => {
    it("valid country and year", () => {
      const input = { year: new Date().getFullYear(), country: mockCountry };
      expect(validateInput(input)).toBe(true);
    });

    it("invalid country", () => {
      const input = {
        year: new Date().getFullYear(),
        country: "US",
      };
      try {
        validateInput(input);
        fail();
      } catch (err) {
        expect(err.message).toContain("Country provided is not supported");
      }
    });

    it("invalid year", () => {
      const input = { year: new Date().getFullYear() - 1, country: "FR" };
      expect(() => validateInput(input)).toThrow(
        "Year provided not the current"
      );
    });
  });

  describe("Shorten public holiday function", () => {
    it("shorten public holiday", () => {
      const result = shortenPublicHoliday(mockHolidayListLong[0]);
      expect(result).toEqual(mockHolidayListShort[0]);
    });
  });
});
