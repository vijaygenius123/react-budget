import {SyntheticEvent, useRef} from "react";
import {Button, Form, FormGroup, Modal} from "react-bootstrap";
import {useBudgets, UNCATEGORIZED_BUDGET_ID} from "../contexts/BudgetContext";

type AddBudgetModal = {
    show: boolean,
    handleClose: () => void,
    defaultBudgetId?: string
}

const AddExpenseModal: React.FunctionComponent<AddBudgetModal> = ({
                                                                      show,
                                                                      handleClose,
                                                                      defaultBudgetId = UNCATEGORIZED_BUDGET_ID
                                                                  }) => {
    const descriptionRef = useRef<HTMLInputElement | null>(null)
    const amountRef = useRef<HTMLInputElement | null>(null)
    const budgetIdRef = useRef<HTMLSelectElement | null>(null)

    const {addExpense, budgets} = useBudgets()

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        if (addExpense && descriptionRef.current?.value && amountRef.current?.value) {
            addExpense({
                description: descriptionRef.current?.value,
                amount: parseFloat(amountRef.current?.value),
                budgetId: budgetIdRef.current?.value || UNCATEGORIZED_BUDGET_ID
            })
        }
        handleClose()
    }

    return <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>New Budget</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormGroup className={"mb-3"} controlId={"name"}>
                    <Form.Label>Description</Form.Label>
                    <Form.Control ref={descriptionRef} type={"text"} required/>
                </FormGroup>
                <FormGroup className={"mb-3"} controlId={"max"}>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control ref={amountRef} type={"number"} required/>
                </FormGroup>
                <FormGroup className={"mb-3"} controlId={"max"}>
                    <Form.Label>Budget</Form.Label>
                    <Form.Select defaultValue={defaultBudgetId} ref={budgetIdRef}>
                        <option value={UNCATEGORIZED_BUDGET_ID}>{UNCATEGORIZED_BUDGET_ID}</option>
                        {budgets.map(budget => <option key={budget.id} value={budget.id}>{budget.name}</option>)}
                    </Form.Select>
                </FormGroup>
                <div className={"d-flex justify-content-end"}>
                    <Button variant={"primary"} type={"submit"}>Add</Button>
                </div>
            </Modal.Body>
        </Form>
    </Modal>;
}

export default AddExpenseModal
