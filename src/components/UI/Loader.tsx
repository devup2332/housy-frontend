import LoaderIcon from "../Icons/LoaderIcon";

const Loader = () => {
  return (
    <div className="h-screen w-screen bg-bg-1 grid place-items-center">
      <LoaderIcon className="animate-spin text-primary stroke-current" />
    </div>
  );
};

export default Loader;
