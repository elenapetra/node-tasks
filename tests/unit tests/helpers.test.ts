import { validateInput, shortenPublicHoliday } from "../../helpers";

describe("Unit tests for helpers.ts file", () => {
  describe("Validate input function", () => {
    it("valid country and year", () => {
      const input = { year: new Date().getFullYear(), country: "FR" };
      expect(validateInput(input)).toBe(true);
    });

    it("invalid country", () => {
      const input = {
        year: new Date().getFullYear(),
        country: "US",
      };
      expect(() => validateInput(input)).toThrow(
        "Country provided is not supported"
      );
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
      const holiday = {
        name: "New Year",
        localName: "New Year Local",
        date: "2024-01-01",
        countryCode: "FR",
        fixed: true,
        global: true,
        counties: ["France", "Italy"],
        launchYear: 2000,
        types: ["Type A", "Type B"],
      };
      const result = shortenPublicHoliday(holiday);
      expect(result).toEqual({
        name: "New Year",
        localName: "New Year Local",
        date: "2024-01-01",
      });
    });
  });
});
