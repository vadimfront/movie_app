import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import type { Category } from "../../types/movie";
import { Button } from "../ui/button";

interface ICategoryButtonProps {
  category: Category;
  currentCategory: Category;
  onCategoryChange: (cat: Category) => void;
  onFocusCategory?: (cat: Category | null) => void;
  children: React.ReactNode;
}

export default function CategoryButton({
  category,
  currentCategory,
  onCategoryChange,
  onFocusCategory,
  children,
}: ICategoryButtonProps) {
  const { ref, focused, focusSelf } = useFocusable({
    onEnterPress: () => onCategoryChange(category),
    onFocus: () => onFocusCategory?.(category),
    onBlur: () => onFocusCategory?.(null),
    focusKey: `category-${category}`,
  });

  const handleClick = () => {
    focusSelf();
    onCategoryChange(category);
  };

  return (
    <Button
      ref={ref}
      onClick={handleClick}
      className={`${currentCategory === category ? "bg-blue-500 text-white" : ""} ${focused ? "button-focused" : ""}`}
    >
      {children}
    </Button>
  );
}
