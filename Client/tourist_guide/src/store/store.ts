import { createStore, combineReducers, AnyAction } from 'redux';

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

interface FavoriteState {
  favorites: FavoritePoint[];
}

interface LocationState {
  userLocation: UserLocation;
}

const initialFavoriteState: FavoriteState = {
  favorites: [],
};

const initialLocationState: LocationState = {
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

interface GetUserLocationAction extends AnyAction {
  type: 'GET_USER_LOCATION';
}

type FavoriteActions = AddToFavoritesAction | DeleteFromFavoritesAction | GetFavoritesAction;
type LocationActions = SetUserLocationAction | GetUserLocationAction;

function favoriteReducer(state: FavoriteState = initialFavoriteState, action: FavoriteActions): FavoriteState {
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

function locationReducer(state: LocationState = initialLocationState, action: LocationActions): LocationState {
  switch (action.type) {
    case 'SET_USER_LOCATION':
      return { ...state, userLocation: action.payload };
    case 'GET_USER_LOCATION':
      return state;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  favorite: favoriteReducer,
  location: locationReducer,
});

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;