import React, { Component } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import api, { ApiResponse } from '../../api/api';
import MovieType from '../../types/MovieType'

interface SingleMoviePreviewProperties {
    movie: MovieType,
}

interface SingleArticlePreviewState {
    quantity: number;
}

export default class SingleMoviePreview extends Component<SingleMoviePreviewProperties> {
    state: SingleArticlePreviewState;
    
    constructor(props: SingleMoviePreviewProperties | Readonly<SingleMoviePreviewProperties>) {
        super(props)
    
        this.state = {  
            quantity: 1,
        }
    }

    private quantityChaned(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            quantity: Number(event.target.value),
        });
    }

    private addToCart() {
        const data = {
            movieId: this.props.movie.movieId,
            quantity: this.state.quantity,
        };

        api('api/user/cart/addToCart', 'post', data)
        .then((res: ApiResponse) => {
            if (res.status === 'error' || res.status === 'login') {
                return;
            }

            window.dispatchEvent(new CustomEvent('cart.update'));
        });
    }
    
    render() {
        return (
            <Col lg="4" md="6" sm="6" xs="12">
                <Card className="mb-3">
                    <Card.Img>

                    </Card.Img>
                    <Card.Body>
                        <Card.Title as="p">
                            { this.props.movie.name }
                        </Card.Title>
                        <Card.Text as="p">
                            { this.props.movie.description }
                        </Card.Text>
                        <Card.Text>
                           Price: { Number(this.props.movie.price).toFixed(2) } EUR
                        </Card.Text>
                        <Form.Group>
                            <Row>
                                <Col sm="7">
                                    <Form.Control type="number" min="1" step="1" value={ this.state.quantity} 
                                        onChange={(e) => this.quantityChaned(e as any)}/>
                                </Col>
                                <Col sm="5">
                                    <Button block variant="secondary"
                                        onClick={ () => this.addToCart() }>Buy</Button>
                                </Col>
                            </Row>
                        </Form.Group>
                        <Link to={ `/movie/${ this.props.movie.movieId}`} className="btn btn-primary btn-block btn-sm">
                            Open movie page
                        </Link>
                    </Card.Body>
                </Card>
            </Col>
        )
    }
}

