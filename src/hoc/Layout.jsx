import React from 'react'
import {Col, Grid, Row} from "react-bootstrap";
import Logo from "../components/Logo";

function Layout(components) {

    const {Content} = components;

    class Component extends React.Component {

        render() {
            return <Grid>
                <Row>
                    <Col sm={8} smOffset={2}>
                        <Logo/>
                        <Content {...this.props}/>
                    </Col>
                </Row>
            </Grid>
        }
    }

    return Component;

}

export default Layout;