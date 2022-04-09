import React, {useState} from 'react';
import {Button, Container, Stack} from "react-bootstrap";
import BudgetCard from "./components/BudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import {UNCATEGORIZED_BUDGET_ID, useBudgets} from "./contexts/BudgetContext";
import AddExpenseModal from "./components/AddExpenseModal";


function App() {
    const [showAddBudgetModal, setShowAddBudgetModal] = useState<boolean>(false)
    const [showAddExpenseModal, setShowAddExpenseModal] = useState<boolean>(false)
    const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState<string>('')
    const {budgets, getBudgetExpenses} = useBudgets();

    const openAddExpenseModal = (budgetId: string) => {
        setShowAddExpenseModal(true)
        setAddExpenseModalBudgetId(budgetId)
    }

    return (
        <Container className={"my-4"}>
            <Stack direction={"horizontal"} className={"mb-4"} gap={2}>
                <h1 className={"me-auto"}>Budgets</h1>
                <Button variant={"primary"} onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
                <Button variant={"outline-primary"} onClick={() => openAddExpenseModal(UNCATEGORIZED_BUDGET_ID)}>Add
                    Expense</Button>
            </Stack>
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
                gap: "1rem",
                alignItems: "flex-start"
            }}>
                {budgets && budgets.map(budget => <BudgetCard key={budget.id} name={budget.name}
                                                              amount={getBudgetExpenses ? getBudgetExpenses(budget.id).reduce((prev, curr) => {
                                                                  return prev + curr.amount
                                                              }, 0) : 0}
                                                              max={budget.max}
                                                              onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                />)}

            </div>
            <AddBudgetModal show={showAddBudgetModal} handleClose={() => {
                setShowAddBudgetModal(false)
            }}/>
            <AddExpenseModal show={showAddExpenseModal} handleClose={() => {
                setShowAddExpenseModal(false)
            }}
                             defaultBudgetId={addExpenseModalBudgetId}
            />
        </Container>
    );
}

export default App;
