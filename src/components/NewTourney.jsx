import * as React from "react";
import {Button, Col, ControlLabel, FormControl, FormGroup, Grid, Row} from "react-bootstrap";
import Logo from "./Logo";

class NewToruney extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            value: ''
        };
    }

    getValidationState() {
        const length = this.state.value.length;
        if (length > 0) return 'success';
        return null;
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    render() {
        return <Grid>
            <Row>
                <Col sm={8} smOffset={2}>
                    <Logo/>
                    <form
                        style={formStyle}
                        onSubmit={e => {
                            alert('Nie-dupa');
                            e.preventDefault()
                        }}>
                        <h2>Stwórz nowy turniej</h2>
                        <FormGroup
                            controlId='formBasicText'
                            validationState={this.getValidationState()}
                        >
                            <ControlLabel>Podaj nazwę turnieju</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.value}
                                placeholder="Małopolski turniej siatkówki amatorskiej "
                                onChange={this.handleChange}
                            />
                            <FormControl.Feedback/>
                        </FormGroup>
                        <Button type="submit">Stwórz</Button>
                    </form>
                </Col>
            </Row>
        </Grid>
    }
}

const formStyle = {
    border: 'thin black solid',
    padding: '20px'
};

export default NewToruney;