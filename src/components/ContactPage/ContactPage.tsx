import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import { Card, Container } from "react-bootstrap";

export class ContactPage extends Component {
    render() {
        return (
            <Container>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            <FontAwesomeIcon icon={ faPhone } /> Contact details
                        </Card.Title>
                        <Card.Text>
                            Contact details will be shown here
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}