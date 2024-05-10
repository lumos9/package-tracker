'use client'

import { useSearchParams } from 'next/navigation'

export default function ResultsPage() {
    const searchParams = useSearchParams()

    const query = searchParams.get('query')

    // URL -> `/search?query=my-project`
    // `search` -> 'my-project'
    return <>query: {query}</>
}