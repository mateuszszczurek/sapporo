import * as React from "react";
import {ControlLabel, FormControl, FormGroup, HelpBlock} from "react-bootstrap";

// https://getbootstrap.com/docs/4.1/components/forms/

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
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
        return null;
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    render() {
        return <form className='form-group'>
            <FormGroup
                controlId="formBasicText"
                validationState={this.getValidationState()}
            >
                <ControlLabel>Working example with validation</ControlLabel>
                <FormControl
                    type="text"
                    value={this.state.value}
                    placeholder="Enter text"
                    onChange={this.handleChange}
                />
                <FormControl.Feedback/>
                <HelpBlock>Validation is based on string length.</HelpBlock>
            </FormGroup>
        </form>
    }
}

export default NewToruney;