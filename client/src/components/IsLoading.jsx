const IsLoading = () => {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-[#f3f2ef]">
      <div className="h-12 w-12 rounded-full border-4 border-gray-300 border-t-blue-600 animate-spin" />

      <p className="mt-4 text-gray-600 text-sm font-medium">
        Loading...
      </p>
    </div>
  );
};

export default IsLoading;
