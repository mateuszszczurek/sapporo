import * as React from "react";
import {ControlLabel, FormControl, FormGroup, HelpBlock} from "react-bootstrap";
import Grid from "react-bootstrap/es/Grid";
import Row from "react-bootstrap/es/Row";
import Col from "react-bootstrap/es/Col";

class LoadTurney extends React.Component {

    render() {
        return <Grid>
            <Row>
                <Col sm={6} smOffset={3}>
                    <form style={formStyle}>
                        <h2>Wczytaj istniejący turniej</h2>
                        <FormGroup controlId="formBasicText">
                            <FieldGroup
                                id="formControlsFile"
                                type="file"
                                label="Wybierz plik z zapisanym turniejem"
                            />

                        </FormGroup>
                    </form>
                </Col>
            </Row>
        </Grid>
    }
}

const formStyle = {
    border: 'thin black solid',
    margin: '20px',
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