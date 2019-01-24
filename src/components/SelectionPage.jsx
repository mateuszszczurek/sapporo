import {Button, ButtonGroup, Col, Grid, PageHeader, Row} from "react-bootstrap";
import * as React from "react";
import {LinkContainer} from "react-router-bootstrap";


export default () =>
    <Grid>
        <Row>
            <Col sm={8} smOffset={2}>
                <PageHeader>Volleyball Tournament App</PageHeader>
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

const borderSpace = {
    margin: '20px',
    padding: '20px'
};
