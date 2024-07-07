import { faBackwardFast, faBackwardStep, faForwardFast, faForwardStep } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Dispatch } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import RetryFetch from './RetryFetch';

type Props<T> = {
  data: T[] | undefined;
  columns: ColumnDef<T>[];
  pageCount: number;
  pageIndex: number;
  setPageIndex: Dispatch<number>;
  isPending: boolean;
  isError: boolean;
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>;
  title?: string;
}

export default function TableWrapper<T>({
  data,
  columns,
  pageCount,
  pageIndex,
  setPageIndex,
  isPending,
  isError,
  refetch,
  title,
}: Props<T>) {

  let content;

  if (isPending) {
    content = <LoadingSpinner />;
  } else if (isError) {
    content = <RetryFetch refetch={refetch} />;
  } else if (!data) {
    content = null;
  } else if (data.length === 0) {
    content = (
      <div className='w-full h-full text-center flex flex-col justify-center items-center'>
        No data.
      </div>
    )
  } else {
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      manualPagination: true,
      pageCount,
    });

    content = (
      <table className='w-full border-2 border-solid border-black m-2'>
        <thead>
          {table.getHeaderGroups().map(header => {
            return <tr key={header.id} className='sticky top-0 bg-purple-200'>{header.headers.map(cell => {
              return <th key={cell.id} colSpan={cell.colSpan} className='border-2 border-solid border-black px-2'>
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
                return <td key={cell.id} className='text-xs border border-solid border-black bg-purple-50'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              })}
              </tr>
            })
          }
        </tbody>
      </table>
    );
  }

  return (
    <div className='flex flex-col w-full h-full'>
      {title && <h2 className='text-2xl uppercase text-center p-2 font-bold'>{title}</h2>}
      <div className='flex-1 w-full overflow-x-scroll'>
        {content}
      </div>

      <div className='relative w-full flex justify-center p-2'>
        <div className='flex'>
          <button
            className='px-1 disabled:opacity-30'
            onClick={() => setPageIndex(0)}
            disabled={pageIndex <= 0 || isPending || isError || !data}
          >
            <FontAwesomeIcon icon={faBackwardFast} />
          </button>
          <button
            className='px-1 disabled:opacity-30'
            onClick={() => setPageIndex(pageIndex - 1)}
            disabled={pageIndex <= 0 || isPending || isError || !data}
          >
            <FontAwesomeIcon icon={faBackwardStep} />
          </button>

          <p className='w-32 text-center'>{pageIndex + (pageCount === 0 ? 0 : 1)} of {pageCount}</p>

          <button
            className='px-1 disabled:opacity-30'
            onClick={() => setPageIndex(pageIndex + 1)}
            disabled={pageIndex >= pageCount - 1 || isPending || isError || !data}
          >
            <FontAwesomeIcon icon={faForwardStep} />
          </button>
          <button
            className='px-1 disabled:opacity-30'
            onClick={() => setPageIndex(pageCount - 1)}
            disabled={pageIndex >= pageCount - 1 || isPending || isError || !data}
          >
            <FontAwesomeIcon icon={faForwardFast} />
          </button>
        </div>

        <form className='absolute right-2'>
          <input className='w-16 border border-black border-solid' min={1} max={pageCount} type='number'></input>
          <button className='ml-2 px-3 bg-cyan-200 font-bold neobrutalist-border-1' type='submit'>Go</button>
        </form>
      </div>
    </div>
  );
}