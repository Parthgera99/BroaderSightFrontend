import { Textarea } from "@/components/ui/textarea";

interface TableInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TableInput({ value, onChange }: TableInputProps) {
  return (
    <Textarea
      placeholder="Enter table data..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}



// import React from "react";

// interface TableInputProps {
//   value: string[][];
//   onChange: (value: string[][]) => void;
// }

// const TableInput: React.FC<TableInputProps> = ({ value, onChange }) => {
//   // Add a new column to each row
//   const addColumn = () => {
//     const updatedTable = value.map((row) => [...row, ""]);
//     onChange(updatedTable);
//   };

//   // Add a new row (with empty values matching the column count)
//   const addRow = () => {
//     const newRow = new Array(value[0]?.length || 2).fill("");
//     onChange([...value, newRow]);
//   };

//   // Handle input changes inside the table
//   const handleCellChange = (rowIndex: number, colIndex: number, newValue: string) => {
//     const updatedTable = value.map((row, rIdx) =>
//       row.map((cell, cIdx) => (rIdx === rowIndex && cIdx === colIndex ? newValue : cell))
//     );
//     onChange(updatedTable);
//   };

//   return (
//     <div className="table-container">
//       <table className="border-collapse border border-gray-300">
//         <tbody>
//           {value.map((row, rowIndex) => (
//             <tr key={rowIndex}>
//               {row.map((cell, colIndex) => (
//                 <td key={colIndex} className="border border-gray-300 p-2">
//                   <input
//                     type="text"
//                     value={cell}
//                     onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
//                     className="w-full p-1 border border-gray-300"
//                   />
//                 </td>
//               ))}
//               {/* Add column button only for the first row */}
//               {rowIndex === 0 && (
//                 <td className="p-2">
//                   <button onClick={addColumn} className="p-1 bg-blue-500 text-white rounded">
//                     ➕
//                   </button>
//                 </td>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <button onClick={addRow} className="mt-2 p-1 bg-green-500 text-white rounded">
//         ➕ Add Row
//       </button>
//     </div>
//   );
// };

// export default TableInput;

