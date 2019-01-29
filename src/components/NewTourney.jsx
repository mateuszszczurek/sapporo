import PropTypes from 'prop-types';

import * as React from "react";
import {Button, ControlLabel, FormControl, FormGroup} from "react-bootstrap";

class NewToruney extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this);
        this.handleTourneyCreation = this.handleTourneyCreation.bind(this);

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

    handleTourneyCreation() {
        return e => {
            e.preventDefault();
            this.props.createNewTourney(this.state.value);
        }
    }

    render() {
        return <form
            style={formStyle}
            onSubmit={this.handleTourneyCreation()}>
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
    }
}

const formStyle = {
    border: 'thin black solid',
    padding: '20px'
};

NewToruney.propTypes = {
    createNewTourney : PropTypes.func
};

export default NewToruney;