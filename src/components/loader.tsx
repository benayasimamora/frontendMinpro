export default function Loader({ message }: { message?: string }) {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="loader mr-2">
        {" "}
        {/* CSS spinner */}
        <span>{message || "Loading..."}</span>
      </div>
    </div>
  );
}
