import {
  setQuery,
  searchRequest,
  searchSuccess,
  searchFailure,
  setRateLimited,
  clearSearch,
} from "./slice";

export const SEARCH_SET_QUERY = setQuery.type;
export const SEARCH_REQUEST = searchRequest.type;
export const SEARCH_SUCCESS = searchSuccess.type;
export const SEARCH_FAILURE = searchFailure.type;
export const SEARCH_SET_RATE_LIMITED = setRateLimited.type;
export const SEARCH_CLEAR = clearSearch.type;
