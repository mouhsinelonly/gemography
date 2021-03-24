import { render } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import { Loading } from "@components/Loading"

const loadingText = 'Loading...'

describe("Loading component", () => {
    it("renders", () => {
        const { getByTestId } = render(<Loading />);
        expect(getByTestId("loading-message")).toBeInTheDocument();
    });

    it("shows Loading text", () => {
        const { getByText } = render(<Loading />);
        expect(getByText(loadingText)).toBeInTheDocument();
    });

    it("has green background", () => {
        const { getByText } = render(<Loading />);
        expect(getByText(loadingText)).toHaveClass("bg-green-500");
    });

})