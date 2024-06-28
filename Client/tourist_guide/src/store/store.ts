import { createStore, AnyAction } from 'redux';

interface FavoritePoint {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

interface UserLocation {
  latitude: number;
  longitude: number;
}

export interface RootState {
  favorites: FavoritePoint[];
  userLocation: UserLocation;
}

const initialState: RootState = {
  favorites: [],
  userLocation: {
    latitude: 0,
    longitude: 0,
  },
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

interface SetUserLocationAction extends AnyAction {
  type: 'SET_USER_LOCATION';
  payload: UserLocation;
}

type FavoriteActions = AddToFavoritesAction | DeleteFromFavoritesAction | GetFavoritesAction | SetUserLocationAction;

function favoriteReducer(state: RootState = initialState, action: FavoriteActions): RootState {
  switch (action.type) {
    case 'ADD_TO_FAVORITES':
      return { ...state, favorites: [...state.favorites, action.payload] };
    case 'DELETE_FROM_FAVORITES':
      return { ...state, favorites: state.favorites.filter(point => point.id !== action.payload) };
    case 'GET_FAVORITES':
      return { ...state, favorites: action.payload };
    case 'SET_USER_LOCATION':
      return { ...state, userLocation: action.payload };
    default:
      return state;
  }
}

const store = createStore(favoriteReducer);

export type AppDispatch = typeof store.dispatch;
export default store;