import axios from "axios";
import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays,
} from "./public-holidays.service";
import { validateInput, shortenPublicHoliday } from "./helpers";

jest.mock("axios");

describe("public-holidays.service", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getListOfPublicHolidays", () => {
    it("should return a list of shortened public holidays", async () => {
      const mockData = [
        { name: "Holiday 1", localName: "Local Holiday 1", date: "2024-01-01" },
        { name: "Holiday 2", localName: "Local Holiday 2", date: "2024-02-01" },
      ];

      jest.spyOn(axios, "get").mockResolvedValueOnce({ data: mockData });

      const result = await getListOfPublicHolidays(2024, "FR");

      expect(axios.get).toHaveBeenCalledWith(
        "https://date.nager.at/api/v3/PublicHolidays/2024/FR"
      );
      expect(result).toEqual([
        { name: "Holiday 1", localName: "Local Holiday 1", date: "2024-01-01" },
        { name: "Holiday 2", localName: "Local Holiday 2", date: "2024-02-01" },
      ]);
    });

    it("should handle errors and return an empty array", async () => {
      jest
        .spyOn(axios, "get")
        .mockRejectedValueOnce(new Error("Failed to fetch public holidays"));

      const result = await getListOfPublicHolidays(2024, "FR");

      expect(result).toEqual([]);
    });
  });

  describe("checkIfTodayIsPublicHoliday", () => {
    it("should return true if today is a public holiday", async () => {
      const todayDate = new Date().toISOString().split("T")[0];
      const mockData = [{ date: todayDate, name: "Today's Holiday" }];

      jest
        .spyOn(axios, "get")
        .mockResolvedValueOnce({ data: mockData, status: 200 });

      const result = await checkIfTodayIsPublicHoliday("FR");

      expect(axios.get).toHaveBeenCalledWith(
        `https://date.nager.at/api/v3/IsTodayPublicHoliday/FR`
      );

      console.log("Mocked API response:", mockData);
      console.log("Actual result:", result);
    });

    it("should return false if today is not a public holiday", async () => {
      const todayDate = new Date().toISOString().split("T")[0];
      const mockData = [];

      jest
        .spyOn(axios, "get")
        .mockResolvedValueOnce({ data: mockData, status: 200 });

      const result = await checkIfTodayIsPublicHoliday("FR");

      expect(axios.get).toHaveBeenCalledWith(
        `https://date.nager.at/api/v3/IsTodayPublicHoliday/FR`
      );

      console.log("Mocked API response:", mockData);
      console.log("Actual result:", result);
    });
  });

  describe("getNextPublicHolidays", () => {
    it("should return the next public holidays", async () => {
      const todayDate = new Date().toISOString().split("T")[0];
      const mockData = [
        { date: todayDate, name: "Today's Holiday" },
        { date: "2024-01-01", name: "New Year's Day" },
      ];

      jest.spyOn(axios, "get").mockResolvedValueOnce({ data: mockData });

      const result = await getNextPublicHolidays("FR");

      expect(axios.get).toHaveBeenCalledWith(
        "https://date.nager.at/api/v3/NextPublicHolidays/FR"
      );

      expect(result).toEqual([
        { date: todayDate, name: "Today's Holiday" },
        { date: "2024-01-01", name: "New Year's Day" },
      ]);
    });

    it("should handle errors and return an empty array", async () => {
      jest
        .spyOn(axios, "get")
        .mockRejectedValueOnce(new Error("Failed to fetch public holidays"));

      const result = await getNextPublicHolidays("FR");

      expect(result).toEqual([]);
    });
  });
});
