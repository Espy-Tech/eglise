import React from 'react';

interface TableProps<T> {
  columns: { key: keyof T; label: string; format?: (value: any) => string }[];
  data: T[];
  className?: string;
}

function Table<T extends Record<string, any>>({
  columns,
  data,
  className = '',
}: TableProps<T>) {
  return (
    <div className={`overflow-x-auto rounded-lg border border-gray-200 ${className}`}>
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {columns.map((column) => (
              <th key={String(column.key)} className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
              {columns.map((column) => (
                <td key={String(column.key)} className="px-6 py-3 text-sm text-gray-700">
                  {column.format ? column.format(row[column.key]) : String(row[column.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;