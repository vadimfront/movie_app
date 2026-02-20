import { useEffect, type RefObject } from "react";

interface ScrollOptions {
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
  inline?: ScrollLogicalPosition;
}

export const useScrollIntoView = (
  focused: boolean,
  ref: RefObject<HTMLElement>,
  options: ScrollOptions = {
    behavior: "smooth",
    block: "center",
    inline: "nearest",
  },
) => {
  useEffect(() => {
    if (focused && ref.current) {
      ref.current.scrollIntoView(options);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focused, ref, options.behavior, options.block, options.inline]);
};
