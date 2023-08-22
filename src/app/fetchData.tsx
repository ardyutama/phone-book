import { getClient } from '@/lib/client'
import { gql } from '@apollo/client'

export default async function FetchData() {
    const data = await fetch(
        "https://wpe-hiring.tokopedia.net/graphql",
        {
            method: "POST",
            body: JSON.stringify({
                query: '{ now(id: "1") }',
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }
    ).then((res) => res.json())

    return data.now
}