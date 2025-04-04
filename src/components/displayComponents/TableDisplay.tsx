import React from 'react'

function TableDisplay({ value }: { value: string[][] }) {
  return (
    <div className="overflow-x-auto border thin-scrollbar border-purple-300 dark:border-zinc-800 my-4">
        <table className="table-auto border-separate border-spacing-0 w-full">
            <thead>
                <tr>
                    {value[0].map((cell, j) => {
                        return (
                        <td key={j} className='min-w-[240px] max-w-[300px] border border-purple-300 dark:border-zinc-800 bg-purple-400 dark:bg-purple-800 px-auto py-2 text-center'>
                            {cell}
                        </td>
                    )})}
                </tr>
            </thead>
        <tbody>
            {value.slice(1).map((row, i) => (
            <tr key={i}>
                {row.map((cell, j) => (
                <td key={j} className="min-w-[240px] max-w-[300px] bg-purple-50 dark:bg-zinc-900 border border-purple-300 dark:border-zinc-800 px-4 py-2">
                    {cell}
                </td>
                ))}
            </tr>
            ))}
        </tbody>
        </table>
    </div>
  )
}

export default TableDisplay