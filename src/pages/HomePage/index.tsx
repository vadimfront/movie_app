import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../store";
import {
  selectMoviesError,
  selectMoviesIsLoading,
  selectMoviesItems,
  selectMoviesPage,
  selectMoviesTotalPages,
} from "../../store/movies/selectors";
import {
  selectSearchIsLoading,
  selectSearchQuery,
  selectSearchResults,
  selectSearchError,
  selectIsRateLimited,
} from "../../store/search/selectors";
import {
  MOVIES_FETCH_POPULAR_REQUEST,
  MOVIES_FETCH_NOW_PLAYING_REQUEST,
} from "../../store/movies/actionTypes";
import { SEARCH_SET_QUERY } from "../../store/search/actionTypes";
import { selectFavorites } from "../../store/favorites/selectors";
import { CATEGORY_TYPES, type Category } from "../../types/movie";
import {
  FocusContext,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";
import { MovieCard } from "../../components/MovieCard/MovieCard";
import SearchInput from "../../components/SearchInput/SearchInput";
import CategoryButton from "../../components/CategoryButton/CategoryButton";
import PaginationControls from "../../components/PaginationControls/PaginationControls";
import { SpinnerCustom } from "../../components/Spinner/SpinnerCustom";
import { toast } from "sonner";
import { MovieCardSkeleton } from "../../components/MovieCard/MovieCardSkeleton";

export default function HomePage() {
  const [category, setCategory] = useState<Category>("popular");
  const [focusedCategory, setFocusedCategory] = useState<Category | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    ref: pageRef,
    focusKey: pageFocusKey,
    focusSelf,
  } = useFocusable({
    focusable: true,
    saveLastFocusedChild: true,
    trackChildren: true,
    isFocusBoundary: false,
  });

  const movies = useSelector(selectMoviesItems);
  const isLoading = useSelector(selectMoviesIsLoading);
  const error = useSelector(selectMoviesError);
  const page = useSelector(selectMoviesPage);
  const totalPages = useSelector(selectMoviesTotalPages);
  const searchResults = useSelector(selectSearchResults);
  const searchLoading = useSelector(selectSearchIsLoading);
  const favorites = useSelector(selectFavorites);
  const searchQuery = useSelector(selectSearchQuery);
  const searchError = useSelector(selectSearchError);
  const isRateLimited = useSelector(selectIsRateLimited);

  const loadMovies = useCallback(
    (cat: Category, p: number = 1) => {
      if (cat === CATEGORY_TYPES.popular) {
        dispatch({
          type: MOVIES_FETCH_POPULAR_REQUEST,
          payload: { page: p },
        });
      } else if (cat === CATEGORY_TYPES.now_playing) {
        dispatch({
          type: MOVIES_FETCH_NOW_PLAYING_REQUEST,
          payload: { page: p },
        });
      }
    },
    [dispatch],
  );

  useEffect(() => {
    focusSelf();
  }, [focusSelf]);

  useEffect(() => {
    if (!searchQuery && category !== CATEGORY_TYPES.favorites) {
      loadMovies(category);
    }
  }, [category, loadMovies, searchQuery]);

  useEffect(() => {
    dispatch({ type: MOVIES_FETCH_POPULAR_REQUEST, payload: { page: 1 } });
  }, [dispatch]);

  useEffect(() => {
    if (
      !focusedCategory ||
      focusedCategory === CATEGORY_TYPES.favorites ||
      category === focusedCategory
    )
      return;

    const timer = setTimeout(() => {
      loadMovies(focusedCategory);
      setCategory(focusedCategory);
    }, 2000);

    return () => clearTimeout(timer);
  }, [focusedCategory, loadMovies, category]);

  useEffect(() => {
    if (searchError) {
      toast.error("Search failed. Please try again.");
    }
  }, [searchError]);

  useEffect(() => {
    if (isRateLimited) {
      toast.warning(
        "Search rate limit reached. Please wait before searching again.",
      );
    }
  }, [isRateLimited]);

  const handleCategoryChange = (cat: Category) => {
    dispatch({ type: SEARCH_SET_QUERY, payload: "" });
    setCategory(cat);
    if (cat !== CATEGORY_TYPES.favorites) {
      loadMovies(cat);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: SEARCH_SET_QUERY, payload: e.target.value });
  };

  const handlePageChange = (newPage: number) => {
    if (category !== CATEGORY_TYPES.favorites) {
      loadMovies(category, newPage);
    }
  };

  const displayedMovies = searchQuery
    ? searchResults
    : category === CATEGORY_TYPES.favorites
      ? favorites
      : movies;

  return (
    <FocusContext.Provider value={pageFocusKey}>
      <div ref={pageRef}>
        <div className="mb-4 flex gap-4">
          <CategoryButton
            category={CATEGORY_TYPES.popular}
            currentCategory={category}
            onCategoryChange={handleCategoryChange}
            onFocusCategory={setFocusedCategory}
          >
            Popular
          </CategoryButton>
          <CategoryButton
            category={CATEGORY_TYPES.now_playing}
            currentCategory={category}
            onCategoryChange={handleCategoryChange}
            onFocusCategory={setFocusedCategory}
          >
            Airing Now
          </CategoryButton>
          <CategoryButton
            category={CATEGORY_TYPES.favorites}
            currentCategory={category}
            onCategoryChange={handleCategoryChange}
            onFocusCategory={setFocusedCategory}
          >
            My Favorites
          </CategoryButton>
          <SearchInput value={searchQuery} onChange={handleSearchChange} />
        </div>
        {searchLoading && <SpinnerCustom />}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {isLoading &&
            Array.from({ length: 12 }).map((_, idx) => (
              <MovieCardSkeleton key={idx} />
            ))}
          {!isLoading &&
            displayedMovies?.length > 0 &&
            displayedMovies?.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onSelect={(m) => navigate(`/movie/${m.id}`)}
              />
            ))}
        </div>
        {!searchQuery && category !== "favorites" && totalPages > 1 && (
          <PaginationControls
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
      {error && <p className="text-red-500">Oops, something went wrong.</p>}
    </FocusContext.Provider>
  );
}
