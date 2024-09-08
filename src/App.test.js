import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from './App';
import { ToggleMeasurements, TempConverter, WindSpeedConverter, WindDirection, WeatherIcon, GetWeather, Location, Weather, Forecast } from './Weather.js';
// Config
import config from './config.json';
const apikey = config.apikey; // api key, set in config.json
// For more information on the functions tested, read Weather.js in this directory.
    /*test('renders learn react link', () =>
    {
        render(<App />);
        const linkElement = screen.getByText(/learn react/i);
        expect(linkElement).toBeInTheDocument();
    });*/

// These tests do not use Jest-DOM per say, but rather Jest, as we have nothing to test with the React stuff itself, just functions.
// Jest-DOM may be utilized down the line to ensure functions related to getting weather works, however we do have error handlers in those
// functions to ensure if there is a fault it's reported due to their nature.
    test('Dummy Test', () =>
    {
        expect(2 + 2).toBe(4);
    });
    test('Wind Speed Conversion Test', () =>
    {
        if (config.measurement != 'I')
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
        it("should expect gibberish to be unknown", () =>
        {
            expect(WeatherIcon("asdasda")).toBe("❓");
        });
        it("should expect Fog to be fog emoji", () =>
        {
            expect(WeatherIcon("Fog")).toBe("🌫️");
        });
    });
    test('Location Test', () =>
    {
        beforeAll(() =>
        {
            global.navigator.geolocation = {
                getCurrentPosition: jest.fn((successCallback) =>
                {
                    // Simulate a successful location retrieval
                    successCallback({
                        coords: { latitude: 51.5074, longitude: -0.1278 } // Example coordinates for London
                    });
                }),
            };
        });

        afterEach(() =>
        {
            jest.clearAllMocks(); // Clear mocks after each test to avoid interference
        });

        it('should get the location successfully', async () =>
        {
            await Location();

            // You can then assert that the navigator.geolocation.getCurrentPosition has been called
            expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
        });

        it('should handle geolocation errors', async () =>
        {
            // Simulate a geolocation error
            navigator.geolocation.getCurrentPosition.mockImplementationOnce((successCallback, errorCallback) => {
                errorCallback({ code: 1 }); // Position unavailable error
            });

            await expect(Location()).rejects.toThrow('Network Error. 1');
        });

        it('should throw an error if Geolocation is not supported', async () =>
        {
            // Simulate Geolocation not being available
            delete navigator.geolocation;

            await expect(Location()).rejects.toThrow('Geolocation API blocked / not supported.');
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
        });
    });
    });