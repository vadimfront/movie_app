import { useRef, useEffect } from "react";
import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import { Input } from "../ui/input";

interface ISearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchInput({ value, onChange }: ISearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { ref, focused, focusSelf } = useFocusable({
    onArrowPress: () => true,
    focusKey: "search-input",
  });

  useEffect(() => {
    if (focused && inputRef.current) {
      inputRef.current.focus();
    } else if (!focused && inputRef.current) {
      inputRef.current.blur();
    }
  }, [focused]);

  return (
    <div
      ref={ref}
      onClick={() => {
        focusSelf();
      }}
    >
      <Input
        ref={inputRef}
        type="text"
        placeholder="Search movies..."
        value={value}
        onChange={onChange}
        className={focused ? "focused" : ""}
      />
    </div>
  );
}
