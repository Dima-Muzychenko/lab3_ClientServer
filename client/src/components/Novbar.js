import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";

const NovBar = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Nav className="me-auto">
                    <Nav.Link href="/examination">Examinations</Nav.Link>
                    <Nav.Link href="/test">Tests</Nav.Link>
                    <Nav.Link href="/practice">Practices</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NovBar;