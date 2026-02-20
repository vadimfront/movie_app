import { all, fork } from "redux-saga/effects";
import { moviesSaga } from "./movies/saga";
import { searchSaga } from "./search/saga";

export function* rootSaga() {
  yield all([fork(moviesSaga), fork(searchSaga)]);
}
