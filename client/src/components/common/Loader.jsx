const Loader = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      <div className="h-14 w-14 rounded-full border-4 border-orange-500 border-t-transparent animate-spin"></div>

      <h2 className="mt-4 text-lg font-semibold text-orange-500">Loading...</h2>
    </div>
  );
};

export default Loader;
