import { fa1, faDroplet } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Tune } from "@material-ui/icons"
import { Dropdown,DropdownMenu,DropdownTrigger,DropdownItem } from "@nextui-org/dropdown"
import { useState } from "react"
import TransactionHistoryTable from "./TransactionHistoryTable"


type Props = {
    transactions: any[]
}

const TransactionHistory = (props: Props) => {
    const [sortBy, setSortBy] = useState<String>("");
  return (
    <div className="w-full flex flex-col p-6 rounded-lg bg-white">
        <div className="flex flex-row pt-2 pb-4 w-full justify-between px-2">
            <h3 className="text-2xl  font-semibold text-dimgray">Transaction History</h3>
            <div className="flex flex-row mr-2 space-x-1 items-start cursor-pointer">
                <Tune className="text-dimgray" />
                <Dropdown className="bg-white text-secondary rounded-lg text-sm">
                    <DropdownTrigger>
                        <div className="flex flex-row items-center">
                            <label className="text-dimgray text-sm mr-3"> Sort By : {sortBy}</label>
                        </div>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions" onAction={(key:any)=>{
                        setSortBy(key.toString());
                    }}>
                        <DropdownItem key={"Category"}>Category</DropdownItem>
                        <DropdownItem key={"Name"} >Name</DropdownItem>
                        <DropdownItem key={"Date"}>Date</DropdownItem>
                        <DropdownItem key={"Amount"}>Amount</DropdownItem>
                        <DropdownItem key={"Type"}>Type</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            
        </div>
        <TransactionHistoryTable data={props.transactions} />
    </div>
  )
}

export default TransactionHistory