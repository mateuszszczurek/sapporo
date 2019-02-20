import PropTypes from 'prop-types';

import {Col} from "react-bootstrap";
import Form from "react-bootstrap/es/Form";
import React from "react";

function MissingPoints() {
    return <Form.Control.Feedback type="invalid">
        Wprowadź liczbę punktów
    </Form.Control.Feedback>;
}

function CannotHaveDraw() {
    return <Form.Control.Feedback type="invalid">
        Remis niedozwolony
    </Form.Control.Feedback>;
}

class Set extends React.Component {

    constructor(props) {
        super(props);

        this.onSetChange = this.onSetChange.bind(this);
    }

    onSetChange() {
        this.setState(
            {
                isDraw: this.props.firstTeamResult === this.props.secondTeamResult
            }
        )
    }

    render() {

        const {validationResults, setNumber, firstTeamResult, secondTeamResult, onSetChange} = this.props;

        const firstTeamMissingPoints = validationResults === 'firstTeamResultMissing';
        const secondTeamMissingPoints = validationResults === 'secondTeamResultMissing';

        return <div>
            <Form>
                <Form.Row key={setNumber} className='mb-1'>
                    <Form.Group as={Col} md={1}>
                        <h4 key={setNumber}>{setNumber} set</h4>
                    </Form.Group>
                    <Form.Group as={Col} md={{span: 2, offset: 1}}>
                        <Form.Control as='input'
                                      type='text'
                                      value={zeroOrNumberOrEmpty(firstTeamResult)}
                                      onChange={e => allowEmptyOrNumber(e, onSetChange(setNumber, 'first-team'))}
                                      isValid={!firstTeamMissingPoints}
                        />
                        {firstTeamMissingPoints && <MissingPoints/>}
                    </Form.Group>
                    <Form.Group as={Col}
                                md={{span: 2, offset: 1}}>
                        <h5 className='text-center'>:</h5>
                    </Form.Group>
                    <Form.Group as={Col} md={{span: 2, offset: 1}}>
                        <Form.Control as='input'
                                      type='text'
                                      value={zeroOrNumberOrEmpty(secondTeamResult)}
                                      onChange={e => allowEmptyOrNumber(e, onSetChange(setNumber, 'second-team'))}
                                      isValid={!secondTeamMissingPoints}
                        />
                        {secondTeamMissingPoints && <MissingPoints/>}
                    </Form.Group>
                </Form.Row>
            </Form>
        </div>

    }

}

function allowEmptyOrNumber(e, callback) {
    const number = /^[0-9\b]+$/;

    const value = e.target.value;
    e.target.value === '' ? callback(null) : number.test(value) && callback(parseInt(value));
}

function zeroOrNumberOrEmpty(firstTeamResult) {
    return firstTeamResult === 0 ? firstTeamResult : firstTeamResult || '';
}


Set.propTypes = {

    creationAttempted : PropTypes.bool,
    firstTeam: PropTypes.string,
    secondTeam: PropTypes.string,
    setNumber: PropTypes.number,
    firstTeamResult: PropTypes.number,
    secondTeamResult: PropTypes.number,
    onSetChange: PropTypes.func,
    validationResults : PropTypes.string

};

Set.defaultProps = {

    firstTeamResult : null,
    secondTeamResult : null

};

export default Set;