import Search from "@/components/search"
import DynamicTable from "./table"

export default function Home() {
    return (
        <>
            <div className="HomeContainer">
                <Search />
                <DynamicTable />
            </div> 
        </>
    )
}