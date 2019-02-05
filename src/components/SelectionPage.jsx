import {Button, ButtonGroup} from "react-bootstrap";
import * as React from "react";
import {LinkContainer} from "react-router-bootstrap";


export default () => <ButtonGroup className='d-flex'>
    <LinkContainer to='/tourney/new'>
        <Button variant="primary">
            Swtórz nowy turniej
        </Button>
    </LinkContainer>
    <LinkContainer to='/tourney/load'>
        <Button variant="primary">
            Wczytaj turniej
        </Button>
    </LinkContainer>
</ButtonGroup>