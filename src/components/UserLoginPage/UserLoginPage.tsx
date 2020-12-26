import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import { Card, Container } from "react-bootstrap";

export class UserLoginPage extends Component {
    render() {
        return (
            <Container>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            <FontAwesomeIcon icon={ faSignInAlt } /> User login
                        </Card.Title>
                        <Card.Text>
                            ... the form will be shown here
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}