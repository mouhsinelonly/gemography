import { render } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import { RepoRow } from "@components/RepoRow"

const sampleRepository: IRepo = {
    id: 1,
    name: 'Gemography',
    description: "lorem epsum",
    stargazers_count: 2,
    open_issues_count: 6,
    created_at: '2020-01-01',
    owner: {
        avatar_url: 'gemography',
        login: 'gemography'
    }
}

describe("RepoRow component", () => {
    it("renders", () => {
        const { getByTestId } = render(<RepoRow repo={sampleRepository} />)
        expect(getByTestId("repo-row")).toBeInTheDocument()
    })

    it("renders an image with alt text of owner login", () => {
        const { getByAltText } = render(<RepoRow repo={sampleRepository} />)
        expect(getByAltText(sampleRepository.owner.login)).toBeInTheDocument()
    })

    it("renders an h1 tag with repo name", () => {
        const { getByText } = render(<RepoRow repo={sampleRepository} />)
        expect(getByText(sampleRepository.name)).toBeInTheDocument()
    })
})