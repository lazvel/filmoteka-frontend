import React from 'react';
import { Alert, Button, Card, Container, Form, Modal, Table} from 'react-bootstrap';
import { faEdit, faList, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Redirect } from 'react-router-dom';
import api, { ApiResponse } from '../../api/api';
import RoledMainMenu from '../RoledMainMenu/RoledMainMenu';
import MovieType from '../../types/MovieType';


interface AdministratorDashboardCategoryState {
    isAdministratorLoggedIn: boolean;
    movies: MovieType[];

    addModal: {
        visible: boolean;
        name: string;
        genre: string;
        year: string;
        rating: number;
        message: string;
    };

    editModal: {
        visible: boolean;
        movieId: number;
        name: string;
        genre: string;
        year: string;
        rating: number;
        message: string;
    }
}

class AdministratorDashboardCategory extends React.Component {
    state: AdministratorDashboardCategoryState;

    constructor(props: {} | Readonly<{}>) {
        super(props)
    
        this.state = {
            isAdministratorLoggedIn: true,
            movies: [],

            addModal: {
                visible: false,
                name: '',
                genre: '',
                year: '',
                rating: 0.01,
                message: '',
            },

            editModal: {
                visible: false,
                movieId: 0,
                name: '',
                genre: '',
                year: '',
                rating: 0.01,
                message: '',
            }
        };

    }

    private setAddModalVisibleState(newState: boolean) {
        this.setState(Object.assign(this.state, 
            Object.assign(this.state.addModal, {
                visible: newState
            })
        ));
    }

    private setAddModalStringFieldState(fieldName: string, newValue: string) {
        this.setState(Object.assign(this.state, 
            Object.assign(this.state.addModal, {
                [ fieldName ]: newValue,
            })
        ));
    }

    private setAddModalNumberFieldState(fieldName: string, newValue: any) {
        this.setState(Object.assign(this.state, 
            Object.assign(this.state.addModal, {
                [ fieldName ]: (newValue === 'null') ? null : Number(newValue),
            })
        ));
    }

    private setEditModalVisibleState(newState: boolean) {
        this.setState(Object.assign(this.state, 
            Object.assign(this.state.addModal, {
                visible: newState
            })
        ));
    }

    private setEditModalStringFieldState(fieldName: string, newValue: string) {
        this.setState(Object.assign(this.state, 
            Object.assign(this.state.addModal, {
                [ fieldName ]: newValue,
            })
        ));
    }

    private setEditModalNumberFieldState(fieldName: string, newValue: any) {
        this.setState(Object.assign(this.state, 
            Object.assign(this.state.addModal, {
                [ fieldName ]: (newValue === 'null') ? null : Number(newValue),
            })
        ));
    }

    componentWillMount() {
        this.getMovies();
    }

    // componentWillUpdate() {
    //     this.getMovies();
    // }

    private getMovies() {
        // const username = getIdentity('administrator'); // ovo
        api('api/movie/', 'get', {}, 'administrator')
        .then((res: ApiResponse) => {
            if (res.status === 'error' || res.status === 'login') {
                this.setLogginState(false);
                return;
            }

            this.putMoviesInState(res.data);
        });
    }

    private putMoviesInState(data?: MovieType[]) {

    }

    private setLogginState(isLoggedIn: boolean) {
        this.setState(Object.assign(this.state, {
            isAdministratorLoggedIn: isLoggedIn,
        }));
    }
    
    render () {
        if (this.state.isAdministratorLoggedIn === false) {
            return (
                <Redirect to="/administrator/login" /> 
            );
        }

        return (
            <Container>
                <RoledMainMenu role="administrator" />
                <Card>
                    <Card.Body>
                        <Card.Title>
                            <FontAwesomeIcon icon={ faList } /> AdministratorDashboardCategory
                        </Card.Title>
                        
                        <Table hover size="sm" bordered>
                            <thead>
                                <tr>
                                    <th colSpan= { 3 }></th>
                                    <th className="text-center">
                                        <Button variant="primary" size="sm"
                                            onClick={() => this.showAddModal()}>
                                            <FontAwesomeIcon icon={ faPlus } /> Add
                                        </Button>
                                    </th>
                                </tr>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Genre</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.movies.map(movie => (
                                    <tr>
                                        <td className="text-right">{movie.movieId}</td>
                                        <td>{movie.name}</td>
                                        <td>{movie.genre}</td>
                                        <td>
                                            <Button variant="primary" size="sm"
                                                onClick={ () => this.showEditModal(movie) }>
                                                <FontAwesomeIcon icon={ faEdit } /> Edit
                                            </Button>
                                        </td>
                                    </tr>
                                ), this)}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>

                <Modal size="lg" centered show={ this.state.addModal.visible }
                    onHide={ () => this.setAddModalVisibleState(false) }>
                    <Modal.Header closeButton>
                        <Modal.Title>Addd new movie</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group>
                                <Form.Label htmlFor="name">Name</Form.Label>
                                <Form.Control id="name" type="text" value={ this.state.addModal.name } 
                                    onChange={ (e) => this.setAddModalStringFieldState('name', e.target.value)}/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label htmlFor="genre">Genre</Form.Label>
                                <Form.Control id="genre" type="text" value={ this.state.addModal.genre } 
                                    onChange={ (e) => this.setAddModalStringFieldState('genre', e.target.value)}/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label htmlFor="year">Year</Form.Label>
                                <Form.Control id="year" type="text" value={ this.state.addModal.year } 
                                    onChange={ (e) => this.setAddModalStringFieldState('year', e.target.value)}/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label htmlFor="rating">Rating</Form.Label>
                                <Form.Control id="rating" type="number" value={ this.state.addModal.rating } 
                                    onChange={ (e) => this.setAddModalNumberFieldState('rating', e.target.value)}/>
                            </Form.Group>
                            <Form.Group>
                                <Button variant="primary" onClick={() => this.doAddMovie()}>
                                    <FontAwesomeIcon icon={ faPlus} /> Add new movie
                                </Button>
                            </Form.Group>
                            { this.state.addModal.message ? (
                                <Alert variant="danger" value={ this.state.addModal.message } />
                            ) : ''}
                        </Modal.Body>
                </Modal>

                <Modal size="lg" centered show={ this.state.editModal.visible }
                    onHide={ () => this.setEditModalVisibleState(false) }>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit movie</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group>
                                <Form.Label htmlFor="name">Name</Form.Label>
                                <Form.Control id="name" type="text" value={ this.state.addModal.name } 
                                    onChange={ (e) => this.setEditModalStringFieldState('name', e.target.value)}/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label htmlFor="genre">Genre</Form.Label>
                                <Form.Control id="genre" type="text" value={ this.state.addModal.genre } 
                                    onChange={ (e) => this.setEditModalStringFieldState('genre', e.target.value)}/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label htmlFor="year">Year</Form.Label>
                                <Form.Control id="year" type="text" value={ this.state.addModal.year } 
                                    onChange={ (e) => this.setEditModalStringFieldState('year', e.target.value)}/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label htmlFor="rating">Rating</Form.Label>
                                <Form.Control id="rating" type="number" value={ this.state.addModal.rating } 
                                    onChange={ (e) => this.setEditModalNumberFieldState('rating', e.target.value)}/>
                            </Form.Group>
                            <Form.Group>
                                <Button variant="primary" onClick={() => this.doEditMovie()}>
                                    <FontAwesomeIcon icon={ faEdit} /> Edit movie
                                </Button>
                            </Form.Group>
                            { this.state.editModal.message ? (
                                <Alert variant="danger" value={ this.state.editModal.message } />
                            ) : ''}
                        </Modal.Body>
                </Modal>
            </Container>
        );
    }

    private showAddModal() {
        this.setAddModalStringFieldState('name', '');
        this.setAddModalStringFieldState('genre', '');
        this.setAddModalStringFieldState('year', '');
        this.setAddModalStringFieldState('rating', '0');
        this.setAddModalStringFieldState('message', '');
        this.setAddModalVisibleState(true);
    }

    private showEditModal(movie: MovieType) {
        this.setEditModalStringFieldState('name', String(movie.name));
        this.setEditModalStringFieldState('genre', String(movie.genre));
        this.setEditModalStringFieldState('year', String(movie.year));
        this.setEditModalStringFieldState('rating', String(movie.rating));
        this.setEditModalStringFieldState('message', '');
        this.setEditModalVisibleState(true);
    }

    private doAddMovie() {
        api('api/movie/', 'post', {
            name: this.state.addModal.name,
            genre: this.state.addModal.genre,
            year: this.state.addModal.year,
            rating: this.state.addModal.rating,
        }, 'administrator')
        .then((res: ApiResponse) => {
            if (res.status === 'login') {
                this.setLogginState(false);
                return;
            }

            if (res.status === 'error') {
                this.setAddModalStringFieldState('message', JSON.stringify(res.data));
            }

            this.setAddModalVisibleState(false);
            this.getMovies();
        });
    }

    private doEditMovie() {
        api('api/movie/'  + this.state.editModal.movieId, 'post', {
            name: this.state.addModal.name,
            genre: this.state.addModal.genre,
            year: this.state.addModal.year,
            rating: this.state.addModal.rating,
        }, 'administrator')
        .then((res: ApiResponse) => {
            if (res.status === 'login') {
                this.setLogginState(false);
                return;
            }

            if (res.status === 'error') {
                this.setAddModalStringFieldState('message', JSON.stringify(res.data));
            }

            this.setEditModalVisibleState(false);
            this.getMovies();
        });
    }
}

export default AdministratorDashboardCategory;
