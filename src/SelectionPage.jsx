import {Button, Col, Grid, PageHeader, Row} from "react-bootstrap";
import * as React from "react";
import {Link} from "react-router-dom";


export default () =>
    <Grid>
        <PageHeader>Volleyball Tournament App</PageHeader>
        <Row>
            <Col md={5}>
                <Link to='/tourney/new'>
                    <Button bsStyle="primary btn-block">
                        Swtórz nowy turniej
                    </Button>
                </Link>
            </Col>
            <Col mdOffset={2} md={5}>
                <Link to='/tourney/load'>
                    <Button bsStyle="primary btn-block">
                        Wczytaj turniej
                    </Button>
                </Link>
            </Col>
        </Row>
    </Grid>