import * as React from "react";
import {FormControl, Form} from "react-bootstrap";

class LoadTurney extends React.Component {

    render() {
        return <form style={formStyle}>
            <h2 className='border-bottom mb-3'>Wczytaj istniejący turniej</h2>
            <Form.Group controlId="formBasicText">
                <FieldGroup
                    id="formControlsFile"
                    type="file"
                    label="Wybierz plik z zapisanym turniejem"
                />

            </Form.Group>
        </form>
    }
}

const formStyle = {
    border: 'thin black solid',
    padding: '20px'
};


function FieldGroup({id, label, ...props}) {
    return (
        <Form.Group controlId={id}>
            <Form.Label>{label}</Form.Label>
            <FormControl {...props} />
        </Form.Group>
    );
}

export default LoadTurney;