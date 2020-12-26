import React, { Component } from 'react'
import { Container, Nav } from 'react-bootstrap'

export class MainMenu extends Component {
    render() {
        return (
            <Container>
                <Nav variant="tabs">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/">Contact</Nav.Link>
                    <Nav.Link href="/">Log in</Nav.Link>
                </Nav>
            </Container>
        )
    }
}

export default MainMenu

