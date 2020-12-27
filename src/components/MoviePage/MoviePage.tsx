import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Card, Container } from "react-bootstrap";
import MovieType from "../../types/MovieType";


interface MoviePageProperties {
    match: {
        params: {
            mId: number;
        }
    }
}

interface MoviePageState {
    movie?: MovieType;
}

export default class MoviePage extends Component<MoviePageProperties> {
    state: MoviePageState;
    
    constructor(props: MoviePageProperties | Readonly<MoviePageProperties>) {
        super(props);

        this.state = { };
    }

    render() {
        return (
            <Container>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            <FontAwesomeIcon icon={ faVideo } /> { this.state.movie?.name }
                        </Card.Title>
                        <Card.Text>
                            Movies will be shown here
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        );
    }

    componentWillMount() {
        this.getMovieData()
    }

    componentWillReceiveProps(newProps: MoviePageProperties) {
        if (newProps.match.params.mId === this.props.match.params.mId) {
            return;
        }

        this.getMovieData();
    }

    private getMovieData() {
        setTimeout(() => {
            const data: MovieType = {
                name: 'Movie: ' + this.props.match.params.mId,
                movieId: this.props.match.params.mId,
            };

            this.setState({
                movie: data,
            })
        }, 250)
    }
}