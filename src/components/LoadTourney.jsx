import * as React from "react";
import {ControlLabel, PageHeader, FormControl, FormGroup} from "react-bootstrap";

class LoadTurney extends React.Component {

    render() {
        return <form style={formStyle}>
            <PageHeader>Wczytaj istniejący turniej</PageHeader>
            <FormGroup controlId="formBasicText">
                <FieldGroup
                    id="formControlsFile"
                    type="file"
                    label="Wybierz plik z zapisanym turniejem"
                />

            </FormGroup>
        </form>
    }
}

const formStyle = {
    border: 'thin black solid',
    padding: '20px'
};


function FieldGroup({id, label, ...props}) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
        </FormGroup>
    );
}

export default LoadTurney;