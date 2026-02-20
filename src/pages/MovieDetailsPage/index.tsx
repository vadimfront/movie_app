import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import {
  selectMovieDetails,
  selectMovieDetailsLoading,
  selectMovieDetailsError,
} from "../../store/movies/selectors";
import { selectIsFavorite } from "../../store/favorites/selectors";
import { Card, CardContent, CardTitle } from "../../components/ui/card";
import { MOVIES_FETCH_DETAILS_REQUEST } from "../../store/movies/actionTypes";
import {
  FAVORITES_ADD,
  FAVORITES_REMOVE,
} from "../../store/favorites/actionTypes";
import { IMAGE_BASE_URL } from "../../constants";
import {
  FocusContext,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";
import ActionButton from "../../components/ActionButton/ActionButton";
import { MovieDetailsSkeleton } from "./MovieDetailsSkeleton";

export default function MovieDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const details = useSelector(selectMovieDetails);
  const isLoading = useSelector(selectMovieDetailsLoading);
  const error = useSelector(selectMovieDetailsError);
  const isFavorite = useSelector((state: RootState) =>
    selectIsFavorite(state, Number(id)),
  );

  const { ref, focusKey, focusSelf } = useFocusable({
    isFocusBoundary: true,
    focusBoundaryDirections: ["up", "down"],
  });

  useEffect(() => {
    focusSelf();
  }, [focusSelf]);

  const handleFavoriteToggle = () => {
    if (details) {
      if (isFavorite) {
        dispatch({ type: FAVORITES_REMOVE, payload: details.id });
      } else {
        dispatch({ type: FAVORITES_ADD, payload: details });
      }
    }
  };

  useEffect(() => {
    if (id) {
      dispatch({ type: MOVIES_FETCH_DETAILS_REQUEST, payload: Number(id) });
    }
  }, [id, dispatch]);

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref}>
        <div className="flex gap-4 mb-4">
          <ActionButton onClick={() => navigate("/")} focusKey="back-button">
            Back to Home
          </ActionButton>
          <ActionButton
            onClick={handleFavoriteToggle}
            focusKey="favorite-button"
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </ActionButton>
        </div>
        {isLoading && <MovieDetailsSkeleton />}
        {!isLoading && !error && details && (
          <Card>
            <CardContent className="p-4">
              <img
                src={`${IMAGE_BASE_URL}/w500${details.backdrop_path}`}
                alt={details.title}
                className="w-full h-64 object-cover"
              />
              <CardTitle className="mt-4">{details.title}</CardTitle>
              <p className="mt-2">{details.overview}</p>
              <p>Release: {details.release_date}</p>
              <p>Rating: {details.vote_average}</p>
              <div className="mt-4"></div>
            </CardContent>
          </Card>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </FocusContext.Provider>
  );
}
