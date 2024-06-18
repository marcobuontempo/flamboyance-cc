import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

type Props<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  pageIndex?: number;
  pageSize?: number;
}

export default function TableWrapper<T>({
  data,
  columns,
}: Props<T>) {

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className='w-full overflow-x-scroll'>
      <table className='w-full'>

        <thead>
          {table.getHeaderGroups().map(header => {
            return <tr key={header.id}>{header.headers.map(cell => {
              return <th key={cell.id} colSpan={cell.colSpan}>
                {flexRender(cell.column.columnDef.header, cell.getContext())}
              </th>
            })}
            </tr>
          })}
        </thead>

        <tbody>
          {
            table.getRowModel().rows.map(row => {
              return <tr key={row.id}>{row.getVisibleCells().map(cell => {
                return <td key={cell.id} className='text-xs'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              })}
              </tr>
            })
          }
        </tbody>
      </table>

      <button
        onClick={() => table.firstPage()}
        disabled={!table.getCanPreviousPage()}
      >
        {'<<'}
      </button>
      <button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        {'<'}
      </button>
      <button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        {'>'}
      </button>
      <button
        onClick={() => table.lastPage()}
        disabled={!table.getCanNextPage()}
      >
        {'>>'}
      </button>
    </div>
  )
}