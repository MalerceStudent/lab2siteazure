import { useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Обробка кліку на кнопку
  async function handlerClick() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/get-data');
      const result = await response.json();

      if (response.ok) {
        setData(result);
      } else {
        setError(result.error || "Something went wrong");
      }
    } catch (error) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8 text-center font-sans">
      <h1 className="text-2xl font-semibold mb-6">Try this:</h1>
      <button
        onClick={handlerClick}
        className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Click
      </button>

      {loading && <p className="mt-4 text-lg">Loading...</p>}
      {error && <p className="mt-4 text-lg text-red-500 font-bold">{error}</p>}
      {data && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl mb-4">Data from Database:</h2>
          <pre className="bg-white p-4 rounded-lg text-sm">{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
