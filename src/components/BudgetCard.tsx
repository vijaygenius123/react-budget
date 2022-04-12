import React, {FunctionComponent} from "react";
import {Button, Card, ProgressBar, Stack} from "react-bootstrap";
import {currencyFormatter, getProgressBarVariant} from "../utils";

type CardProps = {
    name: string,
    amount: number,
    max?: number,
    onAddExpenseClick?: () => void
}

const BudgetCard: FunctionComponent<CardProps> = ({name, amount, max, onAddExpenseClick}) => {
    return (
        <Card>
            <Card.Body>
                <Card.Title className={"d-flex justify-content-between align-items-baseline fw-normal mb-3"}>
                    <div>{name}</div>
                    <div className={"d-flex align-items-baseline"}>
                        {currencyFormatter.format(amount)} { max &&  <span
                        className={"text-muted fs-6"}> / {currencyFormatter.format(max)}</span>}</div>

                </Card.Title>
                {max && <ProgressBar
                    className={"rounded-pill"}
                    min={0}
                    max={max}
                    now={amount}
                    variant={getProgressBarVariant(amount, max)}
                />}
                <Stack direction={"horizontal"} gap={2} className={"mt-4"}>
                    <Button variant={"outline-primary ms-auto"} onClick={onAddExpenseClick}>Add Expense</Button>
                    <Button variant={"outline-secondary"}>View Expenses</Button>
                </Stack>
            </Card.Body>
        </Card>
    )

}

export default BudgetCard
