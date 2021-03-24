import { render, act, fireEvent, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import Index from "@pages/index"

const sampleRepository: IRepo = {
    id: 1,
    name: 'Gemography',
    description: "Lorem epsum",
    stargazers_count: 2,
    open_issues_count: 6,
    created_at: '2020-01-01',
    owner: {
        avatar_url: 'gemography',
        login: 'gemography'
    }
}

describe("Index page", () => {

    it("renders with items", async () => {
        // @ts-ignore
        fetch.mockResponseOnce(JSON.stringify({ items: [sampleRepository] }));
        await act(async () => {
            render(<Index />);
            // scroll to bottom of page
            fireEvent.scroll(window, { target: { scrollY: window.innerHeight } });
            // wait for infinite scroll interval
            await new Promise((r) => setTimeout(r, 200));
        });
    });

    it("removes duplicate entries", async () => {
        // @ts-ignore
        fetch.mockResponseOnce(JSON.stringify({ items: [sampleRepository, sampleRepository] }));
        await act(async () => {
            render(<Index />);
            // scroll to bottom of page
            fireEvent.scroll(window, { target: { scrollY: window.innerHeight } });
            // wait for infinite scroll interval
            await new Promise((r) => setTimeout(r, 200));
        });
    });

    it("renders without items", async () => {
        // @ts-ignore
        fetch.mockResponseOnce(JSON.stringify({ items: [] }));
        await act(async () => {
            render(<Index />);
            // scroll to bottom of page
            fireEvent.scroll(window, { target: { scrollY: window.innerHeight } });
            // wait for infinite scroll interval
            await new Promise((r) => setTimeout(r, 200));
        })
    });

    it("renders shows error message", async () => {
        // @ts-ignore
        fetch.mockResponseOnce(JSON.stringify({ message: 'Error message' }), { status: 429 });
        await act(async () => {
            render(<Index />);
            // scroll to bottom of page
            fireEvent.scroll(window, { target: { scrollY: window.innerHeight } });
            // wait for infinite scroll interval
            await new Promise((r) => setTimeout(r, 200));
        })
    });
})