const initialState = {
    beers: [],
  };
  
  const beerReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_BEERS':
        return {
          ...state,
          beers: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default beerReducer;
  