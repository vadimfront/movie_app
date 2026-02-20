import { Spinner } from "../ui/spinner";

export const SpinnerCustom = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-10">
      <Spinner className="size-24" />
    </div>
  );
};
