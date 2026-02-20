import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import type { Movie } from "../../types/movie";
import { IMAGE_BASE_URL, PLACEHOLDER_IMAGE } from "../../constants";
import { Card, CardContent, CardTitle } from "../ui/card";
import { useScrollIntoView } from "../../hooks/useScrollIntoView";

interface IMovieProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
}
export const MovieCard = ({ movie, onSelect }: IMovieProps) => {
  const { ref, focused, focusSelf } = useFocusable({
    onEnterPress: () => onSelect(movie),
    focusKey: `movie-${movie.id}`,
  });

  useScrollIntoView(focused, ref, {
    behavior: "smooth",
    block: "center",
    inline: "center",
  });

  return (
    <Card
      ref={ref}
      className={`cursor-pointer ${focused ? "focused" : ""}`}
      onClick={() => {
        focusSelf();
        onSelect(movie);
      }}
    >
      <CardContent className="p-4">
        <img
          src={
            movie.poster_path
              ? `${IMAGE_BASE_URL}/w200${movie.poster_path}`
              : PLACEHOLDER_IMAGE
          }
          alt={movie.title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_IMAGE;
          }}
        />
        <CardTitle className="mt-2">{movie.title}</CardTitle>
      </CardContent>
    </Card>
  );
};
