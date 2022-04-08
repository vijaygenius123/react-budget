import {SyntheticEvent, useRef} from "react";
import {Button, Form, FormGroup, Modal} from "react-bootstrap";
import {useBudgets} from "../contexts/BudgetContext";

type AddBudgetModal = {
    show: boolean,
    handleClose: () => void
}

const AddBudgetModal: React.FunctionComponent<AddBudgetModal> = ({show, handleClose}) => {
    const nameRef = useRef<HTMLInputElement | null>(null)
    const maxRef = useRef<HTMLInputElement | null>(null)

    const {addBudget} = useBudgets()

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        if (addBudget && nameRef.current?.value && maxRef.current?.value) {
            addBudget({
                name: nameRef.current?.value,
                max: parseFloat(maxRef.current?.value)
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
                    <Form.Label>Name</Form.Label>
                    <Form.Control ref={nameRef} type={"text"} required/>
                </FormGroup>
                <FormGroup className={"mb-3"} controlId={"max"}>
                    <Form.Label>Maximum Spending</Form.Label>
                    <Form.Control ref={maxRef} type={"number"} required/>
                </FormGroup>
                <div className={"d-flex justify-content-end"}>
                    <Button variant={"primary"} type={"submit"}>Add</Button>
                </div>
            </Modal.Body>
        </Form>
    </Modal>;
}

export default AddBudgetModal
