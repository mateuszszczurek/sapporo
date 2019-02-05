import React from 'react'
import {Col, Container, Row} from "react-bootstrap";
import Logo from "../components/Logo";

function SingleColumnLayout(inputs, componentSpan = 8, componentOffset = 2) {

    const {Content} = inputs;

    class Component extends React.Component {

        render() {
            return <Container>
                <Row>
                    <Col md={{span: 8, offset: 2}}>
                        <Logo/>
                    </Col>
                </Row>
                <Row>
                    <Col md={{span: componentSpan, offset: componentOffset}}>
                        <Content {...this.props}/>
                    </Col>
                </Row>
            </Container>
        }
    }

    return Component;

}

export default SingleColumnLayout;