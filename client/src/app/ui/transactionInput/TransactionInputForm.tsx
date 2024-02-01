import {
    faAlignLeft,
    faCalendar,
    faClose,
    faCreditCard,
    faDollar,
    faPlus,
    faTags,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@nextui-org/dropdown";

import * as Yup from "yup";

interface TransactionFormProps {
    onSubmit: (formData: FormData) => void;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormData {
    amount: number;
    description: string;
    date: string;
    category: string;
    type: string;
    paymentMethod: string;
}
const validationSchema = Yup.object().shape({
    amount: Yup.number()
        .required("Amount is required")
        .positive("Amount must be positive"),
    description: Yup.string().required("Description is required"),
    date: Yup.string().required("Date is required"),
    category: Yup.string().required("Category is required"),
    type: Yup.string().required("Type is required"),
    paymentMethod: Yup.string().required("Payment Method is required"),
});

const TransactionForm: React.FC<TransactionFormProps> = ({
    onSubmit,
    setIsOpen,
}) => {
    const [formData, setFormData] = useState<FormData>({
        amount: 0,
        description: "",
        date: "",
        category: "",
        type: "expense",
        paymentMethod: "",
    });

    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    console.log(formData);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await validationSchema.validate(formData, { abortEarly: false });
            onSubmit(formData);
            // Reset form after successful submission if needed
            setFormData({
                amount: 0,
                description: "",
                date: "",
                category: "",
                type: "",
                paymentMethod: "",
            });
        } catch (error: any) {
            if (error instanceof Yup.ValidationError) {
                const errors: Record<string, string> = {};
                error.inner.forEach((e) => {
                    errors[e.path || ""] = e.message;
                });
                setFormErrors(errors);
            }
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full h-full items-center space-y-1 px-12 pt-8 pb-12 text-white"
        >
            <div className="flex flex-row justify-between items-center w-full py-2 px-2">
                <h1 className="text-2xl font-medium text-cyan-300">Add Transaction</h1>
                <FontAwesomeIcon
                    icon={faClose}
                    className="text-xl text-cyan-300 cursor-pointer"
                    onClick={() => setIsOpen(false)}
                />
            </div>
            <div className="flex flex-row justify-between text-sm items-center divide-x-2  pt-2 pb-6 w-full">
                <div
                    className={`${formData.type === "expense" ? "bg-accent" : "bg-slategray"
                        } w-1/3 text-white text-center rounded-l-lg py-2 px-4 cursor-pointer`}
                    onClick={() => {
                        setFormData((prevData) => ({ ...prevData, type: "expense" }));
                    }}
                >
                    Expense
                </div>
                <div
                    className={`${formData.type === "income" ? "bg-accent" : "bg-gray"
                        } w-1/3 text-white text-center py-2 px-4 cursor-pointer`}
                    onClick={() => {
                        setFormData((prevData) => ({ ...prevData, type: "income" }));
                    }}
                >
                    Income
                </div>
                <div
                    className={`${formData.type === "transfer" ? "bg-accent" : "bg-gray"
                        }  w-1/3 text-white text-center py-2 px-4 rounded-r-lg cursor-pointer`}
                    onClick={() => {
                        setFormData((prevData) => ({ ...prevData, type: "transfer" }));
                    }}
                >
                    Transfer
                </div>
            </div>
            <div className="py-2 flex flex-col space-y-1 w-full">
                <label className="text-xs pl-8 font-light" htmlFor="amount">
                    Amount
                </label>
                <div className="flex flex-row items-end space-x-4">
                    <FontAwesomeIcon icon={faDollar} className="text-2xl" />
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        className="border-b-2 border-slategray text-slategray w-48 text-lg font-light bg-transparent outline-none"
                    />
                </div>
                {formErrors.amount && (
                    <p className="text-red-500 text-sm pl-8">{formErrors.amount}</p>
                )}
            </div>
            <div className="py-2 flex flex-col space-y-1 w-full">
                <label className="text-xs pl-8 font-light" htmlFor="description">
                    Description
                </label>
                <div className="flex flex-row items-end space-x-4">
                    <FontAwesomeIcon icon={faAlignLeft} className="text-xl" />
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="border-b-2 border-slategray text-slategray w-48 text-base font-light bg-transparent outline-none resize-none focus:text-white transition-all ease-in-out duration-300"
                    />
                </div>
                {formErrors.description && (
                    <p className="text-red-500 text-sm pl-8">{formErrors.description}</p>
                )}
            </div>

            <div className="py-4 flex flex-col space-y-1 w-full">
                <label className="text-xs pl-8 font-light" htmlFor="date">
                    Date
                </label>
                <div className="flex flex-row items-end space-x-4">
                    <FontAwesomeIcon icon={faCalendar} className="text-xl" />
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="border-b-2 border-slategray text-slategray w-32 text-sm font-light bg-transparent outline-none"
                    />
                </div>
                {formErrors.date && (
                    <p className="text-red-500 text-sm pl-8">{formErrors.date}</p>
                )}
            </div>
            <div className="flex flex-row justify-between w-full pb-10 items-center">
                <div className="py-4 flex flex-col space-y-2 w-full">
                    <label className="text-xs pl-8 font-light" htmlFor="category">
                        Category
                    </label>
                    <div className="flex flex-row items-end space-x-3">
                        <FontAwesomeIcon icon={faTags} className="text-xl" />
                        <Dropdown className="bg-gray text-white">
                            <DropdownTrigger>
                                <input
                                    type="text"
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="border-b-2 border-slategray text-slategray w-32 text-left text-sm font-light bg-transparent outline-none"
                                />
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Static Actions"
                                onAction={(key) => {
                                    setFormData((prevData) => ({
                                        ...prevData,
                                        category: key.toString(),
                                    }));
                                }}
                            >
                                <DropdownItem key="Salary">Salary</DropdownItem>
                                <DropdownItem key="Food">Food</DropdownItem>
                                <DropdownItem key="Entertainment">Entertainment</DropdownItem>
                                <DropdownItem key="Shopping">Shopping</DropdownItem>
                                <DropdownItem key="Travelling">Travelling</DropdownItem>
                                <DropdownItem key="Medical">Medical</DropdownItem>
                                <DropdownItem key="Education">Education</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    {formErrors.category && (
                        <p className="text-red-500 text-sm pl-8">{formErrors.category}</p>
                    )}
                </div>

                <div className="py-4 flex flex-col space-y-1 w-full">
                    <label className="text-xs pl-8 font-light" htmlFor="category">
                        Payment Method
                    </label>
                    <div className="flex flex-row items-end space-x-3">
                        <FontAwesomeIcon icon={faCreditCard} className="text-xl" />
                        <Dropdown className="bg-gray text-white">
                            <DropdownTrigger>
                                <input
                                    type="text"
                                    id="paymentMethod"
                                    name="paymentMethod"
                                    value={formData.paymentMethod}
                                    onChange={handleChange}
                                    className="border-b-2 border-slategray text-slategray w-32 text-left text-sm font-light bg-transparent outline-none"
                                />
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Static Actions"
                                onAction={(key) => {
                                    setFormData((prevData) => ({
                                        ...prevData,
                                        paymentMethod: key.toString(),
                                    }));
                                }}
                            >
                                <DropdownItem key="Cash">Cash</DropdownItem>
                                <DropdownItem key="UPI">UPI</DropdownItem>
                                <DropdownItem key="Credit Card">Credit Card</DropdownItem>
                                <DropdownItem key="Debit Card">Debit Card</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        {formErrors.paymentMethod && (
                            <p className="text-red-500 text-sm pl-8">
                                {formErrors.paymentMethod}
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <button
                className="bg-accent p-4 rounded-xl w-full self-center"
                type="submit"
            >
                Add new transaction
            </button>
        </form>
    );
};

export default TransactionForm;
