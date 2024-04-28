import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from './App';
import config from './config.json';
import { ToggleMeasurements, TempConverter, WindSpeedConverter, WindDirection, WeatherIcon } from './Weather.js';

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
        const imperialtest = WindSpeedConverter(99);
        expect(imperialtest).toBe("221 miles per hour");
        ToggleMeasurements();
        const metrictest = WindSpeedConverter(99);
        expect(metrictest).toBe("356 kilometers per hour");
        ToggleMeasurements();
    });
    test('Temperature Conversion Test', () =>
    {
        const imperialtest = TempConverter(99);
        expect(imperialtest).toBe("-281F");
        ToggleMeasurements();
        const metrictest = TempConverter(99);
        expect(metrictest).toBe("-313C");
        ToggleMeasurements();
    });
    test('Wind Direction Test', () =>
    {
        expect(WindDirection(99)).toBe("East");
    });
    test('Weather Icon Test', () =>
    {
        expect(WeatherIcon("asdasda")).toBe("❓");
        expect(WeatherIcon("Fog")).toBe("🌫️");
    });
