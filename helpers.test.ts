import { validateInput, shortenPublicHoliday } from "./helpers";
import axios from "axios";
jest.mock("axios");

describe("public-holidays.service", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("validateInput function", () => {
    test("valid country and year", () => {
      const input = { year: new Date().getFullYear(), country: "FR" };
      expect(validateInput(input)).toBe(true);
    });

    test("invalid country", () => {
      const input = {
        year: new Date().getFullYear(),
        country: "US",
      };
      expect(() => validateInput(input)).toThrow(
        "Country provided is not supported"
      );
    });

    test("invalid year", () => {
      const input = { year: new Date().getFullYear() - 1, country: "FR" };
      expect(() => validateInput(input)).toThrow(
        "Year provided not the current"
      );
    });
  });

  describe("shortenPublicHoliday function", () => {
    test("shorten public holiday", () => {
      const holiday = {
        name: "New Year",
        localName: "New Year Local",
        date: "2024-01-01",
        countryCode: "FR",
        fixed: true,
        global: true,
        counties: ["County A", "County B"],
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
