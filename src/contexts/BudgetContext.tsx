import React, {createContext, FunctionComponent, ReactElement, useState} from "react";
import {v4 as uuidV4} from 'uuid'

const BudgetContext = createContext({})

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

export const BudgetProvider: FunctionComponent<ContextProps> = ({children}) => {
    const [budgets, setBudgets] = useState<Budget[]>([]),
        [expenses, setExpenses] = useState<Expense[]>([]),
        getBudgetExpenses = (budgetId: string) => {
            return expenses?.filter(expense => expense.budgetId === budgetId)
        },
        addExpense = (newExpense: Omit<Expense, 'id'>) => {
            setExpenses(prevState => {
                return [...prevState, {id: uuidV4(), ...newExpense}]
            })
        },
        addBudget = (newBudget: Omit<Budget, 'id'>) => {
            setBudgets(prevState => {
                if (prevState.find(budget => budget.name === newBudget.name))
                    return prevState
                else
                    return [...prevState, {id: uuidV4(), ...newBudget}]
            })
        },
        deleteBudget = (budgetId: string) => {
            //TODO: Deal with expenses
            setBudgets(prevState => prevState.filter(budget => budget.id !== budgetId))
        },
        deleteExpense = (expenseId: string) => {
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
