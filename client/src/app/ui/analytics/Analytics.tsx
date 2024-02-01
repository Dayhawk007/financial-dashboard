'use client';


import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import Card from "../card/Card";
import { useEffect, useState } from "react";
import PieChart from "./AnalyticsPieChart";
import { getExpensesByCategory, getTransactionsPaginated } from "@/lib/transactionController";
import BarGraph from "./AnalyticsBarGraph";
import TransactionHistory from "../transactionHistory/TransactionHistory";

type Props = {
    balance: number,
    income: number,
    expense: number,
}

type PieChartOption = "This week" | "This Month" | "This Year";

const Analytics = (props: Props) => {

    const [pieChartOption, setPieChartOption] = useState<String>("This week");

    const [groupedExpenses, setGroupedExpenses] = useState<any[]>([]);

    const [transactions, setTransactions] = useState<any[]>([]);


    useEffect(() => {
        const getExpenses = async () => {
            const expenses = await getExpensesByCategory();
            setGroupedExpenses(expenses);
        }
        getExpenses();
    }, [])

    useEffect(() => {
        const getTransactions = async () => {
            const transactions = await getTransactionsPaginated({page:1, limit:10});
            setTransactions(transactions.paginatedData);
        }
        getTransactions();
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
                        <TransactionHistory transactions={transactions} />
                    </div>
                </div>
                <div className="w-[25%] flex flex-col space-y-4 py-2 items-center">
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
                        <BarGraph data={[
                                [
                                    {
                                        "total": 25000,
                                        "count": 1,
                                        "year": 2024,
                                        "month": 4,
                                        "week": 16,
                                        "income": 25000,
                                        "expense": 0
                                    },
                                    {
                                        "total": 18000,
                                        "count": 1,
                                        "year": 2024,
                                        "month": 4,
                                        "week": 14,
                                        "income": 0,
                                        "expense": 18000
                                    },
                                    {
                                        "total": 8000.5,
                                        "count": 1,
                                        "year": 2024,
                                        "month": 3,
                                        "week": 11,
                                        "income": 0,
                                        "expense": 8000.5
                                    },
                                    {
                                        "total": 5000,
                                        "count": 1,
                                        "year": 2024,
                                        "month": 3,
                                        "week": 10,
                                        "income": 0,
                                        "expense": 0
                                    },
                                    {
                                        "total": 1500.25,
                                        "count": 1,
                                        "year": 2024,
                                        "month": 3,
                                        "week": 9,
                                        "income": 0,
                                        "expense": 1500.25
                                    },
                                    {
                                        "total": 30000,
                                        "count": 1,
                                        "year": 2024,
                                        "month": 2,
                                        "week": 8,
                                        "income": 30000,
                                        "expense": 0
                                    },
                                    {
                                        "total": 1250.75,
                                        "count": 1,
                                        "year": 2024,
                                        "month": 2,
                                        "week": 6,
                                        "income": 0,
                                        "expense": 1250.75
                                    },
                                    {
                                        "total": 800,
                                        "count": 1,
                                        "year": 2024,
                                        "month": 2,
                                        "week": 6,
                                        "income": 0,
                                        "expense": 800
                                    },
                                    {
                                        "total": 1500,
                                        "count": 1,
                                        "year": 2024,
                                        "month": 1,
                                        "week": 5,
                                        "income": 0,
                                        "expense": 1500
                                    },
                                    {
                                        "total": 40000,
                                        "count": 1,
                                        "year": 2024,
                                        "month": 1,
                                        "week": 3,
                                        "income": 40000,
                                        "expense": 0
                                    }
                                ]
                            ]} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Analytics