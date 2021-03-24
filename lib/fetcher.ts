export const fetcher = async (url: string): Promise<IRepo[]> => {
    const res = await fetch(url)
    const data = await res.json()

    if (!res.ok) {
        const error = new Error(data.message)
        throw error
    }

    return data.items ? data.items : []
}