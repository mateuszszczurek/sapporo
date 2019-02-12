import 'rc-collapse/assets/index.css';
import React from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import Dropdown from "react-bootstrap/es/Dropdown";
import Row from "react-bootstrap/es/Row";
import {Col} from "react-bootstrap";
import Button from "react-bootstrap/es/Button";

const divStyle = {width: '100%'};

function team(teamName) {
    return <Dropdown.Item key={teamName} eventKey={teamName}>{teamName}</Dropdown.Item>
}

const teams = ["Team A", "Team B", "Team C"];

class EditMatches extends React.Component {


    constructor(props) {
        super(props);

        this.state = {};

        this.firstTeamSelected = this.firstTeamSelected.bind(this);
        this.secondTeamSelected = this.secondTeamSelected.bind(this);
    }

    firstTeamSelected(eventKey) {
        this.setState({firstTeamSelected: eventKey});
    }

    secondTeamSelected(eventKey) {
        this.setState({secondTeamSelected: eventKey});
    }


    // TODO - remove duplication for dropdowns
    // TODO - shouldn't be able to select same team
    // TODO refactor and numbers only

    render() {
        return <div>
            <Row className={'mb-2'}>
                <Col md={{span: 4, offset: 1}}>
                    <Dropdown
                        onSelect={this.firstTeamSelected}>
                        <Dropdown.Toggle
                            className='w-100'
                            id="first-team">
                            {this.state.firstTeamSelected ? this.state.firstTeamSelected : 'Wybierz drużynę'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu
                            style={divStyle}>
                            {teams.map(teamName => team(teamName))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col md={2}>
                    <h3 className='text-center'>vs</h3>
                </Col>
                <Col md={4}>
                    <Dropdown
                        onSelect={this.secondTeamSelected}>
                        <Dropdown.Toggle
                            className='w-100'
                            id="first-team">
                            {this.state.secondTeamSelected ? this.state.secondTeamSelected : 'Wybierz drużynę'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu
                            style={divStyle}>
                            {teams.map(teamName => team(teamName))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            {Array.from(new Array(5), (val, index) => index + 1).map(num => setRow(num))}
            <Row className={'mt-3'}>
                <Col>
                    <Button className='float-right' type="submit">Zatwierdź mecz</Button>
                </Col>
            </Row>
        </div>
    }

}

function setRow(setNumber) {
    return <Row className='mb-1'>
        <Col md={1}>
            <h4 key={setNumber}>{setNumber} set</h4>
        </Col>
        <Col md={{span: 2, offset : 1}}>
            <input className={'form-control'} type='text'/>
        </Col>
        <Col md={{span: 2, offset: 1}}>
            <h5 className='text-center'>:</h5>
        </Col>
        <Col md={{span: 2, offset: 1}}>
            <input className={'form-control'} type='text'/>
        </Col>
    </Row>
}

export default EditMatches;