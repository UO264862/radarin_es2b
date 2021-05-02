// import React from 'react';

// External dependences
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function About(props) {
    return (
        <Container fluid="md">
            <Row>
                <Col>
                    <Jumbotron className="mt-4">
                        <h1>¿Qué es Radarin?</h1>
                        <p>
                            Radarin será un sistema para facilitar encuentros entre amigos utilizando nuevas tecnologías. La aplicación podrá acceder a la información de localización del teléfono móvil de los usuarios que voluntariamente la tengan activada y permitirá que otros usuarios que sean sus amigos puedan conocer cuándo están cerca.
                        </p>
                    </Jumbotron>
                </Col>
            </Row>
        </Container>);
}

export default About;