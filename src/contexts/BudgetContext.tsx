import React, {createContext, FunctionComponent, ReactElement, useContext, useState} from "react";
import {v4 as uuidV4} from 'uuid'


type ContextProps = {
    children: ReactElement
}

type Budget = {
    id: string,
    name: string,
    max: number
}

type Expense = {
    id: string,
    budgetId: string,
    amount: number,
    description: string
}

type IBudgetContext = {
    budgets: Budget[]
    expenses: Expense[],
    getBudgetExpenses?: (budgetId: string) => Expense[],
    addExpense?: (newExpense: Omit<Expense, "id">) => void,
    addBudget?: (newBudget: Omit<Budget, "id">) => void,
    deleteBudget?: (budgetId: string) => void,
    deleteExpense?: (expenseId: string) => void
}

const BudgetContext = createContext<IBudgetContext>({
    budgets: [],
    expenses: [],
})

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"

export const useBudgets = () => {
    return useContext(BudgetContext)
}

export const BudgetProvider: FunctionComponent<ContextProps> = ({children}) => {
    const [budgets, setBudgets] = useState<Budget[]>([]),
        [expenses, setExpenses] = useState<Expense[]>([])

    function getBudgetExpenses(budgetId: string): Expense[] {
        return expenses?.filter(expense => expense.budgetId === budgetId)
    }

    function addExpense(newExpense: Omit<Expense, "id">) {
        setExpenses(prevState => {
            return [...prevState, {id: uuidV4(), ...newExpense}]
        })
    }


    function addBudget(newBudget: Omit<Budget, 'id'>) {
        setBudgets(prevState => {
            if (prevState.find(budget => budget.name === newBudget.name))
                return prevState
            else
                return [...prevState, {id: uuidV4(), ...newBudget}]
        })
    }

    function deleteBudget(budgetId: string) {
        //TODO: Deal with expenses
        setBudgets(prevState => prevState.filter(budget => budget.id !== budgetId))
    }

    function deleteExpense(expenseId: string) {
        setExpenses(prevState => prevState.filter(expense => expense.id !== expenseId))
    }


    return <BudgetContext.Provider value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense
    }}>
        {children}
    </BudgetContext.Provider>
}
