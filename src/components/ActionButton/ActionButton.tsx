import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

interface IActionButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  focusKey?: string;
}

export default function ActionButton({
  onClick,
  disabled,
  children,
  focusKey,
}: IActionButtonProps) {
  const { ref, focused, focusSelf } = useFocusable({
    focusable: !disabled,
    onEnterPress: onClick,
    focusKey,
  });

  const handleClick = () => {
    focusSelf();
    onClick();
  };

  return (
    <Button
      ref={ref}
      onClick={handleClick}
      disabled={disabled}
      className={`bg-black text-white ${cn(focused && "button-focused")} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {children}
    </Button>
  );
}
