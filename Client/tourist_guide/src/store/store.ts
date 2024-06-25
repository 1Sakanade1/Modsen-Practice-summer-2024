import { createStore, combineReducers, AnyAction } from 'redux';

interface FavoritePoint {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}


interface RootState {
  favorites: FavoritePoint[];
}


const initialState: RootState = {
  favorites: [],
};


interface AddToFavoritesAction extends AnyAction {
  type: 'ADD_TO_FAVORITES';
  payload: FavoritePoint;
}

interface DeleteFromFavoritesAction extends AnyAction {
  type: 'DELETE_FROM_FAVORITES';
  payload: string; // ID точки
}

interface GetFavoritesAction extends AnyAction {
  type: 'GET_FAVORITES';
  payload: FavoritePoint[]; 
}

type FavoriteActions = AddToFavoritesAction | DeleteFromFavoritesAction | GetFavoritesAction;

function favoriteReducer(state: RootState = initialState, action: FavoriteActions): RootState {
  switch (action.type) {
    case 'ADD_TO_FAVORITES':
      return { ...state, favorites: [...state.favorites, action.payload] };
    case 'DELETE_FROM_FAVORITES':
      return { ...state, favorites: state.favorites.filter(point => point.id !== action.payload) };
    case 'GET_FAVORITES':
      return { ...state, favorites: action.payload };
    default:
      return state;
  }
}

const store = createStore(favoriteReducer);

export type AppDispatch = typeof store.dispatch;
export default store;