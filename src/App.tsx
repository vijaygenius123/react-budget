import React from 'react';
import {Button, Container, Stack} from "react-bootstrap";
import BudgetCard from "./components/BudgetCard";

function App() {
    return (
        <Container className={"my-4"}>
            <Stack direction={"horizontal"} className={"mb-4"} gap={2}>
                <h1 className={"me-auto"}>Budgets</h1>
                <Button variant={"primary"}>Add Budget</Button>
                <Button variant={"outline-primary"}>Add Expense</Button>
            </Stack>
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
                gap: "1rem",
                alignItems: "flex-start"
            }}>
                <BudgetCard name="Entertainment" amount={4} max={10} />
            </div>
        </Container>
    );
}

export default App;
