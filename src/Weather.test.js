import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { ToggleMeasurements, TempConverter, WindSpeedConverter, WindDirection, WeatherIcon, GetWeather, Location, Weather, Forecast } from './Weather.js';
// Config
import config from './config.json';
const apikey = config.apikey; // api key, set in config.json
// For more information on the functions tested, read Weather.js in this directory.

// These tests do not use Jest-DOM, but rather Jest, as we have nothing to test with the React stuff itself, just functions.
// Jest-DOM may be utilized down the line to ensure functions related to getting weather works, however we do have error handlers in those
// functions that will output an error to the screen, but of course it should also be caught in testing the program.
// Additionally, there are tests here that should expect it to handle errors by throwing.
    test('Wind Speed Conversion Test', () =>
    {
        if (config.measurement !== 'I')
        {
            ToggleMeasurements();
        }
        it("should expect 99 to be 221 mph", () =>
        {
            const imperialtest = WindSpeedConverter(99);
            expect(imperialtest).toBe("221 miles per hour");
        });
        ToggleMeasurements();
        it("should expect 99 to be 356 kmh", () =>
        {
            const metrictest = WindSpeedConverter(99);
            expect(metrictest).toBe("356 kilometers per hour");
        });
        ToggleMeasurements();
    });
    test('Temperature Conversion Test', () =>
    {
        it("should expect 99K to be -281F", () =>
        {
            const imperialtest = TempConverter(99);
            expect(imperialtest).toBe("-281F");
        });
        ToggleMeasurements();
        it("should expect 99K to be -313C", () =>
        {
            const metrictest = TempConverter(99);
            expect(metrictest).toBe("-313C");
        });
        ToggleMeasurements();
    });
    test('Wind Direction Test', () =>
    {
        it("should expect 99 to be roughly East", () =>
        {
            expect(WindDirection(99)).toBe("East");
        });
        it("should expect 0 to be roughly North", () =>
        {
            expect(WindDirection(0)).toBe("North");
        });
    });
    test('Weather Icon Test', () =>
    {
        const r = global.Date
        beforeAll(() =>
        {
            const d = new Date("October 13, 2014 19:13:00");
            global.Date = jest.fn(() => d);
            global.Date.now = jest.fn(() => d.getTime());
            global.Date.UTC = r.UTC;
            global.Date.parse = r.parse;
            global.Date.prototype = r.prototype;
        });

        afterAll(() =>
        {
            global.Date = r; 
        });

        it("should expect gibberish to be unknown", () =>
        {
            expect(WeatherIcon("asdasda")).toBe("❓");
        });
        it("should expect Fog to be fog emoji", () =>
        {
            expect(WeatherIcon("Fog")).toBe("🌫️");
        });
        it("should expect clear to be moon if hour is 19", () =>
        {
            expect(WeatherIcon("Clear")).toBe("🌙");
        });
        it("should expect clear to be sun even if hour is 19 if its caller is forecast", () =>
        {
            expect(WeatherIcon("Clear", "forecast")).toBe("☀️");
        });
    });
    test('Location Test', () =>
    {
        beforeAll(() => // create a mockup of the getcurrentposition function that simply returns coordinates.
        {
            global.navigator.geolocation = {
                getCurrentPosition: jest.fn((success, error, option) =>
                {
                    success({
                        coords: { latitude: 51.5074, longitude: -0.1278 } 
                    });
                }),
            };
        });

        afterEach(() => // clear mockups after each test
        {
            jest.clearAllMocks(); 
        });

        it('should get the location successfully', async () =>
        {
            await Location();

            expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
        });

        it('should handle geolocation errors', async () =>
        {
            navigator.geolocation.getCurrentPosition.mockImplementationOnce((success, error, option) => {
                error({ code: 1 }); 
            });

            await expect(Location()).rejects.toThrow();
        });

        it('should throw an error if Geolocation is not supported', async () =>
        {
            delete navigator.geolocation;

            await expect(Location()).rejects.toThrow();
        });
    });
    test("GetWeather Test", () =>
    {
        it("should call Weather when type is weather while location is set and lon and lat is set", async () =>
        {
            await GetWeather("weather", "51.5074", "-0.1278", true);
            expect(Weather).toHaveBeenCalled();
            expect(Forecast).not.toHaveBeenCalled();
        });

        it('should call Forecast when type is forecast while location is set and lon and lat is set', async () =>
        {
            await GetWeather("forecast", "51.5074", "-0.1278", true);
            expect(Forecast).toHaveBeenCalled();
            expect(Weather).not.toHaveBeenCalled();
        });

        it('should call Location when location is unset', async () => {
            await GetWeather("weather", "", "", false);
            expect(Location).toHaveBeenCalled(); 
            expect(Weather).toHaveBeenCalled(); 
        });
    });