import "@testing-library/jest-dom/extend-expect"
import { fetcher } from "@lib/fetcher"

describe("fetcher lib", () => {
    it("return empty array", async () => {
        // @ts-ignore
        fetch.mockResponseOnce(JSON.stringify({ items: [] }));

        const data = await fetcher("https://examlple.com")
        expect(data).toHaveLength(0)
    })

    it("through an error", async () => {
        const error = new Error('Mock error')
        // @ts-ignore
        fetch.mockResponseOnce(JSON.stringify({ message: error.message }), { status: 429 });
        try {
            await fetcher("https://examlple.com")
        } catch (e) {
            expect(e).toEqual(error)
        }
    })

    it("returns empty array when no items", async () => {
        // @ts-ignore
        fetch.mockResponseOnce(JSON.stringify({ message: 'Api rate limit' }));

        const data = await fetcher("https://examlple.com")
        expect(data).toHaveLength(0)
    })

})