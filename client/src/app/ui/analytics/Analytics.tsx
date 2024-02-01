'use client';


import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import Card from "../card/Card";
import { useEffect, useState } from "react";
import PieChart from "./AnalyticsPieChart";
import { getExpensesByCategory } from "@/lib/transactionController";

type Props = {
    balance: number,
    income: number,
    expense: number,
}

type PieChartOption = "This week" | "This Month" | "This Year";

const Analytics = (props: Props) => {

    const [pieChartOption, setPieChartOption] = useState<String>("This week");

    const [groupedExpenses, setGroupedExpenses] = useState<any[]>([]);

    useEffect(() => {
        const getExpenses = async () => {
            const expenses = await getExpensesByCategory();
            setGroupedExpenses(expenses);
        }
        getExpenses();
    }, [])
    return (
        <>
            <div className="flex flex-row h-full items-start space-x-6 w-full">
                <div className="w-[75%] rounded-lg">
                    <div className="flex flex-col space-y-6 pt-2">
                        <div className="flex flex-row space-x-6 items-center justify-between">
                            <Card title="Balance" information={`₹ ${props.balance}`} additionalInformation="+ 2.5% " />
                            <Card title="Income" information={`₹ ${props.income}`} additionalInformation="+ 2.5% " />
                            <Card title="Expense" information={`₹ ${props.expense}`} additionalInformation="+ 2.5% " />
                        </div>
                        <div className="flex flex-col w-full h-72 bg-white rounded-xl">
                            {/* Bar Graph for Analytics */}
                        </div>
                        <div className="bg-white w-full py-4 px-6 rounded-lg">
                            <h3 className="text-xl font-semibold text-dimgray">Recent Transactions</h3>

                            <table className="w-full h-72">
                                <thead className="text-dimgray text-center font-semibold">
                                    <tr>
                                        <th className="py-4 px-6">Transaction</th>
                                        <th className="py-4 px-6">Amount</th>
                                        <th className="py-4 px-6">Date</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="w-[25%] flex flex-col space-y-4 py-2 items-center">
                    <div className="w-full h-36 bg-white rounded-xl">
                        {/* Daily Goals*/}
                    </div>
                    <div className="w-full bg-white rounded-xl flex flex-col space-y-4 items-center p-6">
                        <div className="flex flex-row justify-between w-full items-center">
                            <h3 className="text-lg font-semibold text-dimgray">Analytics</h3>
                            <Dropdown className="bg-white text-secondary rounded-lg text-sm">
                                <DropdownTrigger>
                                    <div className="flex flex-row items-center space-x-2">
                                        <label className="text-dimgray text-sm">{pieChartOption}</label>
                                        <button className="focus:outline-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-dimgray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                    </div>
                                </DropdownTrigger> 
                                <DropdownMenu onAction={(key)=>setPieChartOption(key.toString())}>
                                    <DropdownItem key={"This week"}>This week</DropdownItem>
                                    <DropdownItem key={"This Month"}>This month</DropdownItem>
                                    <DropdownItem key={"This Year"}>This year</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        <PieChart data={groupedExpenses} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Analytics