import React from "react";

interface TableInputProps {
  value: string[][];
  onChange: (value: string[][]) => void;
}

const TableInput: React.FC<TableInputProps> = ({ value, onChange }) => {
  // Ensure at least one header row and two data rows exist
  React.useEffect(() => {
    if (value.length < 2) {
      const defaultRows = [
        value[0] || ["Heading 1", "Heading 2"], // Default heading row
        value[1] || ["", ""], // First data row
      ];
      onChange(defaultRows);
    }
  }, [value, onChange]);

  // Add a new column to each row
  const addColumn = () => {
    const updatedTable = value.map((row) => [...row, ""]);
    onChange(updatedTable);
  };

  // Add a new row
  const addRow = () => {
    const newRow = new Array(value[0]?.length || 2).fill("");
    onChange([...value, newRow]);
  };

  // Remove a row (but ensure at least 2 data rows)
  const removeRow = (rowIndex: number) => {
    if (value.length > 2) { // Ensure at least 1 header + 2 data rows
      const updatedTable = value.filter((_, rIdx) => rIdx !== rowIndex);
      onChange(updatedTable);
    }
  };

  // Remove a column (ensure at least one column remains)
  const removeColumn = (colIndex: number) => {
    if (value[0]?.length > 1) {
      const updatedTable = value.map((row) => row.filter((_, cIdx) => cIdx !== colIndex));
      onChange(updatedTable);
    }
  };

  // FIXED: Handle input changes correctly
  const handleCellChange = (rowIndex: number, colIndex: number, newValue: string) => {
    const updatedTable = value.map((row, rIdx) =>
      rIdx === rowIndex ? row.map((cell, cIdx) => (cIdx === colIndex ? newValue : cell)) : [...row]
    );
    onChange(updatedTable);
  };

  return (
    <div className="flex flex-col gap-2">
    <div className="flex gap-4">

    <div className="rounded-md p-2 group/wrapper overflow-x-auto max-w-[730px] scrollbar-hidden border border-zinc-400">
      <table className="w-full">
        <thead>
          <tr>
            {value[0]?.map((cell, colIndex) => (
              <th key={colIndex} className="p-2 font-bold">
                <input
                  type="text"
                  value={cell}
                  onChange={(e) => 
                    {
                      handleCellChange(0, colIndex, e.target.value)
                    }}
                  className="w-[140px] p-1 rounded bg-purple-400 dark:text-zinc-50 text-zinc-50 dark:bg-purple-900 font-bold text-center focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-700focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-700"
                  />
              </th>
            ))}
            
          </tr>
        </thead>
        <tbody>
          {value.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex + 1}>
              {row.map((cell, colIndex) => (
                <td key={colIndex} className=" rounded p-2">
                  <input
                    type="text"
                    value={cell}
                    onChange={(e) => handleCellChange(rowIndex + 1, colIndex, e.target.value)}
                    className="w-[140px] py-1 px-4 rounded bg-zinc-300 dark:text-zinc-50 text-zinc-600 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-700"
                    />
                </td>
              ))}
              {/* Remove Row Button (only if more than 2 data rows exist) */}
              {value.length > 2 && (
                <td className="p-2">
                  <button onClick={() => removeRow(rowIndex + 1)} className="p-1 opacity-0 w-[50px] group-hover/wrapper:opacity-100 duration-300 w-full hover:bg-red-300 duration-200 bg-red-200 text-white rounded">❌</button>
                </td>
              )}
            </tr>
          ))}
          {/* Remove Column Buttons at the bottom */}
          <tr>
            {value[0]?.map((_, colIndex) => (
              <td key={colIndex} className="p-2 text-center opacity-0 group-hover/wrapper:opacity-100 duration-300 w-[30%]">
                <button onClick={() => removeColumn(colIndex)} className="p-1 w-[50px] hover:bg-red-300 duration-200 bg-red-200 text-white rounded">❌</button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      {/* Add and Remove Column Buttons */}
    </div>
      <button onClick={addColumn} className="p-1 bg-green-300 hover:bg-green-400 duration-200 text-white h-[35px] w-[50px] rounded mx-1">➕</button>
      </div>
      <button onClick={addRow} className="mt-2 p-1 bg-green-300 hover:bg-green-400 duration-200 w-[50px] text-white rounded">
        ➕ 
      </button>
            </div>
  );
};

export default TableInput;
