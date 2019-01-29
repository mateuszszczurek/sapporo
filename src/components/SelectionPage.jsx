import {Button, ButtonGroup} from "react-bootstrap";
import * as React from "react";
import {LinkContainer} from "react-router-bootstrap";


export default () => <ButtonGroup justified>
    <LinkContainer to='/tourney/new'>
        <Button bsStyle="primary">
            Swtórz nowy turniej
        </Button>
    </LinkContainer>
    <LinkContainer to='/tourney/load'>
        <Button bsStyle="primary">
            Wczytaj turniej
        </Button>
    </LinkContainer>
</ButtonGroup>