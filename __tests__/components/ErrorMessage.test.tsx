import { render } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import { ErrorMessage } from "@components/ErrorMessage"

describe("search form", () => {
    test("has form element", () => {
        const { getByTestId } = render(<ErrorMessage message='hello' />);

        expect(getByTestId("error-message")).toBeInTheDocument();
    });

})