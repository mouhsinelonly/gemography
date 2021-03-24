// jest.setup.ts
import '@testing-library/jest-dom'; import "@testing-library/jest-dom/extend-expect";
import { cache } from "swr";
import fetchMock from "jest-fetch-mock";

beforeEach(() => {
    /* @ts-ignore */
    fetch.resetMocks();
});

afterEach(() => {
    cache.clear();
});

fetchMock.enableMocks();