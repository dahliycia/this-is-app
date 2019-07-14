import { combineReducers } from 'redux'


export const PHOTOS_FETCHED = 'PHOTOS_FETCHED';

// action creators
export function fetchInfo () {
  const info = ['TEST']
  return {
    type: PHOTOS_FETCHED,
    info: info
  }
}

// reducers

const infoFetchedReducer = (state = {}, action) => {
    if (action.type === PHOTOS_FETCHED) {
        return action.info;
    }
    return state;
}

const reducers = {photos: combineReducers({
  photos: infoFetchedReducer
})};

export default reducers;