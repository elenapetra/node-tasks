const request = require("supertest");

const PublicHoliday_API = "https://date.nager.at/api/v3";

describe("E2E tests for API endpoints", () => {
  describe("E2E test for endpoint /api/v3/NextPublicHolidaysWorldwide", () => {
    it("should return status code 200 and an array of objects", async () => {
      const response = await request(PublicHoliday_API).get(
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
      const countryCode = "FR";
      const year = "2024";
      const response = await request(PublicHoliday_API).get(
        `/PublicHolidays/${year}/${countryCode}`
      );
      const { status, body } = response;

      expect(status).toEqual(200);
      body.forEach((holiday) => {
        expect(holiday).toEqual({
          date: expect.any(String),
          localName: expect.any(String),
          name: expect.any(String),
          countryCode: countryCode,
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
