import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Dispatch } from 'react';

type Props<T> = {
  data: T[] | undefined;
  columns: ColumnDef<T>[];
  pageCount: number;
  pageIndex: number;
  setPageIndex: Dispatch<number>;
  isPending: boolean;
  isError: boolean;
}

export default function TableWrapper<T>({
  data,
  columns,
  pageCount,
  pageIndex,
  setPageIndex,
  isPending,
  isError,
}: Props<T>) {

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  if (!data) {
    return null;
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount,
  })

  return (
    <div className='w-full overflow-x-scroll'>
      <table className='w-full'>

        <thead>
          {table.getHeaderGroups().map(header => {
            return <tr key={header.id} className='sticky top-0'>{header.headers.map(cell => {
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
        onClick={() => setPageIndex(0)}
        disabled={pageIndex === 0}
      >
        {'|<<|'}
      </button>
      <button
        onClick={() => setPageIndex(pageIndex - 1)}
        disabled={pageIndex === 0}
      >
        {'|<|'}
      </button>
      <button
        onClick={() => setPageIndex(pageIndex + 1)}
        disabled={pageIndex === pageCount - 1}
      >
        {'|>|'}
      </button>
      <button
        onClick={() => setPageIndex(pageCount - 1)}
        disabled={pageIndex === pageCount - 1}
      >
        {'|>>|'}
      </button>

      <p>
        Page: {pageIndex + 1} of {pageCount}
      </p>
    </div>
  )
}