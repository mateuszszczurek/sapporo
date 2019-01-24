import {Button, ButtonGroup, Col, Grid, Row} from "react-bootstrap";
import * as React from "react";
import {LinkContainer} from "react-router-bootstrap";
import Logo from "./Logo";


export default () =>
    <Grid>
        <Row>
            <Col sm={8} smOffset={2}>
                <Logo/>
                <ButtonGroup justified>
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
            </Col>
        </Row>
    </Grid>