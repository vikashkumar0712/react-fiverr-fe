import constants from "../../common/constants";

const INITIAL_STATE = {
  title: "",
  cat: constants.CATEGORIES.AI_ARTISTS,
  cover: "",
  images: [],
  desc: "",
  shortTitle: "",
  shortDesc: "",
  deliveryTime: 3,
  revisionNumber: 1,
  features: [],
  price: 1000,
};

const addReducer = (state, action) => {
  switch (action.type) {
    case constants.REDUCERS.ADD_GIG.ACTION_TYPES.CHANGE_INPUT: {
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    }
    case constants.REDUCERS.ADD_GIG.ACTION_TYPES.ADD_IMAGES: {
      return {
        ...state,
        cover: action.payload.cover,
        images: action.payload.images,
      };
    }
    case constants.REDUCERS.ADD_GIG.ACTION_TYPES.ADD_FEATURE: {
      return {
        ...state,
        features: [...state.features, action.payload],
      };
    }
    case constants.REDUCERS.ADD_GIG.ACTION_TYPES.REMOVE_FEATURE: {
      return {
        ...state,
        features: state.features.filter(
          (feature) => feature !== action.payload
        ),
      };
    }
    default: {
      return state;
    }
  }
};

export { INITIAL_STATE, addReducer };
