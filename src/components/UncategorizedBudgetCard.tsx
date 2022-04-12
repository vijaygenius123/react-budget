import React, {FunctionComponent} from "react";
import BudgetCard from "./BudgetCard";
import {UNCATEGORIZED_BUDGET_ID, useBudgets} from "../contexts/BudgetContext";

type CardProps = {
    onAddExpenseClick?: () => void
}

const UncategorizedBudgetCard: FunctionComponent<CardProps> = ({onAddExpenseClick}) => {
    const {getBudgetExpenses} = useBudgets()

    const amount = (getBudgetExpenses && getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce((prev, curr) => {
            return prev + curr.amount
        }, 0)) || 0

    if (amount === 0) return null
    return (
        <BudgetCard name="Uncategorized" amount={amount} onAddExpenseClick={onAddExpenseClick}/>
    )

}

export default UncategorizedBudgetCard
