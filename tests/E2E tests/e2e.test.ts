const request = require("supertest");
import { mockCountry, mockYear } from "../../mockData";
import { PUBLIC_HOLIDAYS_API_URL } from "../../config";

describe("E2E tests for API endpoints", () => {
  describe("E2E test for endpoint /api/v3/NextPublicHolidaysWorldwide", () => {
    it("should return status code 200 and an array of objects", async () => {
      const response = await request(PUBLIC_HOLIDAYS_API_URL).get(
        "/NextPublicHolidaysWorldwide"
      );
      const { status, body } = response;
      expect(status).toEqual(200);

      body.forEach((holiday) => {
        expect(holiday).toEqual({
          date: expect.any(String),
          localName: expect.any(String),
          name: expect.any(String),
          countryCode: expect.any(String),
          fixed: expect.any(Boolean),
          global: expect.any(Boolean),
          counties: holiday.counties !== null ? expect.any(Array) : null,
          launchYear: holiday.launchYear !== null ? expect.any(Number) : null,
          types: expect.any(Array),
        });
      });
    });
  });

  describe("E2E test for endpoint /api/v3/PublicHolidays/{year}/{countryCode}", () => {
    it("should return status code 200 and an array of objects for given year and country", async () => {
      const response = await request(PUBLIC_HOLIDAYS_API_URL).get(
        `/PublicHolidays/${mockYear}/${mockCountry}`
      );
      const { status, body } = response;

      expect(status).toEqual(200);
      body.forEach((holiday) => {
        expect(holiday).toEqual({
          date: expect.any(String),
          localName: expect.any(String),
          name: expect.any(String),
          countryCode: mockCountry,
          fixed: expect.any(Boolean),
          global: expect.any(Boolean),
          counties: holiday.counties !== null ? expect.any(Array) : null,
          launchYear: holiday.launchYear !== null ? expect.any(Number) : null,
          types: expect.any(Array),
        });
      });
    });
  });
});
