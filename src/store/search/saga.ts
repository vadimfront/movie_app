import { call, debounce, delay, put, select } from "redux-saga/effects";
import { selectSearchQuery } from "./selectors";
import type { Movie, PaginatedResponse } from "../../types/movie";
import { searchMovies } from "../../api/tmdb";
import {
  SEARCH_SET_QUERY,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  SEARCH_SET_RATE_LIMITED,
} from "./actionTypes";
import { MAX_REQUESTS, MS } from "../../constants";

let requestCount = 0;
let windowStart = Date.now();

function* executeSearch() {
  const query: string = yield select(selectSearchQuery);

  if (query.trim()?.length < 2) {
    yield put({ type: SEARCH_SET_RATE_LIMITED, payload: false });
    return;
  }
  // Reset rate limit if time window has passed
  const now = Date.now();
  if (now - windowStart >= MS) {
    requestCount = 0;
    windowStart = now;
  }

  while (true) {
    // Check if we are currently rate limited
    const currentTime = Date.now();
    if (currentTime - windowStart >= MS) {
      requestCount = 0;
      windowStart = currentTime;
    }

    // If we've hit the max requests, set rate limited and wait until the window resets
    if (requestCount >= MAX_REQUESTS) {
      yield put({ type: SEARCH_SET_RATE_LIMITED, payload: true });
      const waitTime = MS - (Date.now() - windowStart);
      yield delay(waitTime);
      requestCount = 0;
      windowStart = Date.now();
      continue;
    }

    requestCount++;
    yield put({ type: SEARCH_REQUEST, payload: query });
    yield put({ type: SEARCH_SET_RATE_LIMITED, payload: false });

    try {
      const data: PaginatedResponse<Movie> = yield call(searchMovies, query);
      yield put({ type: SEARCH_SUCCESS, payload: data.results ?? [] });
      break;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Search failed";
      yield put({ type: SEARCH_FAILURE, payload: message });
      break;
    }
  }
}

export function* searchSaga() {
  yield debounce(500, SEARCH_SET_QUERY, executeSearch);
}
