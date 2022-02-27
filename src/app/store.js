import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice';
import movieReducer from '../features/movies/movieSlice';

const store = configureStore({
    reducer: { // make sure this is object 
        user: userReducer, 
        movie: movieReducer,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    })
})

export default store;
