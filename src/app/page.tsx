import Search from "@/components/search"
import DynamicTable from "./table"
import { PrimaryButton } from "@/components/Button"
export default function Home() {
    return (
        <>
            <div className="HomeContainer">
                <div className="SearchContainer">
                    <Search />
                    <PrimaryButton className="AddButton" href="/contact/add">Add Contact</PrimaryButton>
                </div>
                <DynamicTable />
            </div>
        </>
    )
}