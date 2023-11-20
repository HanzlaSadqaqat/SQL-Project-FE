export default function SpinningLoader() {
  return (
    <div>
      <div className="flex justify-center flex-row pt-20 h-screen">
        <div className="spinner border-4 border-t-4 border-gray-200 rounded-full h-12 w-12"></div>
        <div>Loading ...</div>
      </div>
    </div>
  );
}
