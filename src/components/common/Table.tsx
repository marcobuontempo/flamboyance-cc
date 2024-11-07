import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import {
  useReactTable,
  ColumnDef,
  flexRender,
  getCoreRowModel,
} from '@tanstack/react-table';
import LoadingSpinner from './LoadingSpinner';
import { Dispatch } from 'react';
import RetryButton from './RetryButton';

interface Props<T> {
  data: T[] | undefined;
  columns: ColumnDef<T, any>[];
  pageCount: number;
  pageIndex: number;
  setPageIndex: Dispatch<number>;
  isPending: boolean;
  isError: boolean;
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>;
}

export default function Table<T>({ columns, data, pageCount, pageIndex, setPageIndex, isPending, isError, refetch }: Props<T>) {

  let content = null;

  if (isPending) {
    content = <LoadingSpinner />;
  } else if (isError) {
    content = <RetryButton refetch={refetch} />;
  } else if (!data || data?.length === 0) {
    content = <p>No data</p>;
  } else {
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      manualPagination: true,
      pageCount,
    });

    content = (
      <table>
        <thead>
          {
            table.getHeaderGroups().map(header => {
              return <tr key={header.id} className='sticky top-0'>{header.headers.map(cell => {
                return <th key={cell.id} colSpan={cell.colSpan}>
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



  return (
    <>
      {content}
    </>
  )
}