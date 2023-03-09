'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="grid place-content-center gap-2 grid-cols-1 p-20">
      <h2 className="p-4 bg-red-400 rounded-xl text-slate-200">Something went wrong!</h2>
      <input
        className="bg-gray-200 p-4 rounded-xl"
        readOnly
        value={error.message}
      />
      <button
        className="p-4 rounded-xl bg-violet-500 text-slate-200"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
