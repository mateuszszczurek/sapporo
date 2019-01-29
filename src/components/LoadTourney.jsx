import * as React from "react";
import {ControlLabel, FormControl, FormGroup, HelpBlock} from "react-bootstrap";

class LoadTurney extends React.Component {

    render() {
        return <form style={formStyle}>
            <h2>Wczytaj istniejący turniej</h2>
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


function FieldGroup({id, label, help, ...props}) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

export default LoadTurney;