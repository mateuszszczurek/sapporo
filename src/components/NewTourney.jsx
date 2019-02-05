import PropTypes from 'prop-types';

import * as React from "react";
import {Button, Form} from "react-bootstrap";

class NewToruney extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this);
        this.handleTourneyCreation = this.handleTourneyCreation.bind(this);

        this.state = {
            value: ''
        };

    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    handleTourneyCreation() {
        return e => {
            e.preventDefault();
            if(!this.state.value || !this.state.value.trim()){
                //TODO make it common util for checking empty string and preventing form action (same as for group addition)
            } else {
                this.props.createNewTourney(this.state.value);
            }
        }
    }

    render() {
        return <form
            style={formStyle}
            onSubmit={this.handleTourneyCreation()}>
            <h2>Stwórz nowy turniej</h2>
            <Form.Group controlId='formBasicText'>
                <Form.Label>Podaj nazwę turniej</Form.Label>
                <Form.Control
                    type="text"
                    value={this.state.value}
                    placeholder="Małopolski turniej siatkówki amatorskiej "
                    onChange={this.handleChange}
                />
            </Form.Group>
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