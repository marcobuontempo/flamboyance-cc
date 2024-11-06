import {
  useReactTable,
  ColumnDef,
  flexRender,
  getCoreRowModel,
} from '@tanstack/react-table';

interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T, any>[];
}

export default function Table<T>({ columns, data }: TableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className=''>
      <thead>
        {
          table.getHeaderGroups().map(header => {
            return <tr key={header.id} className='sticky top-0'>{header.headers.map(cell => {
              return <th key={cell.id} colSpan={cell.colSpan} className=''>
                {flexRender(cell.column.columnDef.header, cell.getContext())}
              </th>
            })}
            </tr>
          })
        }
      </thead>

      <tbody>
        {
          table.getRowModel().rows.map(row => {
            return <tr key={row.id}>{row.getVisibleCells().map(cell => {
              return <td key={cell.id} className=''>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            })}
            </tr>
          })
        }
      </tbody>
    </table>
  )
}