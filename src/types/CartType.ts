export default interface CartType {
    cartId: number;
    userId: number;
    createdAt: string;
    cartMovies: {
        cartMovieId: number;
        movieId: number;
        quantity: number;
        movie: {
            movieId: number;
            name: string;
            genre: string;
            moviePrices: {
                moviePriceId: number;
                price: number;
            }[];
        }
    }[];
}