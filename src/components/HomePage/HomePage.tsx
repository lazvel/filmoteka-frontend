import React from 'react';
import { Card, Container } from 'react-bootstrap';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function HomePage() {
  return (
    <Container>
        <Card>
            <Card.Body>
                <Card.Title>
                    <FontAwesomeIcon icon={ faHome } /> HomePage
                </Card.Title>
                <Card.Text>
                    Home Page content will be shown here
                </Card.Text>
            </Card.Body>
        </Card>
    </Container>
  );
}

export default HomePage;
