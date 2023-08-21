/** @jsxImportSource @emotion/react */
import Search from "@/components/search"
import dynamic from 'next/dynamic'

const DynamicTable = dynamic(()=> import('./table'), {ssr: false})

export default function Home() {
    return (
        <>
            <div style={{ padding: '0px 24px', display: "flex", flexDirection: 'column', gap:'16px', minHeight: '90vh' }}>
                <Search />
                <DynamicTable />
            </div> 
        </>
    )
}