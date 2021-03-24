import { render } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import { ErrorMessage } from "@components/ErrorMessage"

const message = 'Error Message'

describe("ErrorMessage component", () => {
    it("renders", () => {
        const { getByTestId } = render(<ErrorMessage message={message} />);
        expect(getByTestId("error-message")).toBeInTheDocument();
    });

    it("shows error message", () => {
        const { getByText } = render(<ErrorMessage message={message} />);
        expect(getByText(message)).toBeInTheDocument();
    });

    it("has red background", () => {
        const { getByText } = render(<ErrorMessage message={message} />);
        expect(getByText(message)).toHaveClass("bg-red-500");
    });

})