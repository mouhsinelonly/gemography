import { render } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import Index from "@pages/index"

describe("ErrorMessage component", () => {
    it("renders", () => {
        const { getByTestId } = render(<Index />);
    });

})