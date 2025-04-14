export default function DynamicTable({ data }) {
  if (!data || data.length === 0)
    return <p>I couldn't find what you were looking for</p>;

  const columns = Object.keys(data[0]);

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full text-sm text-left border border-dark_display">
        <thead className="bg-dark_display">
          <tr>
            {columns.map((col) => (
              <th key={col} className="px-4 py-2 border-b border-gray-300">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              className="hover:bg-light_display text-sm bg-white transition-colors duration-100"
            >
              {columns.map((col) => (
                <td
                  key={col}
                  className="px-4 py-2 border-b border-light_display"
                >
                  {row[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
