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
import ArrowIcon from '@assets/icons/arrow.svg?react';

interface Props<T> {
  data: T[] | undefined;
  columns: ColumnDef<T, any>[];
  pageCount?: number;
  pageIndex?: number;
  setPageIndex?: Dispatch<number>;
  isPending: boolean;
  isError: boolean;
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>;
  className?: string;
}

export default function Table<T>({ columns, data, pageCount, pageIndex, setPageIndex, isPending, isError, refetch, className }: Props<T>) {

  let content = null;

  if (isPending) {
    content = <LoadingSpinner />;
  } else if (isError) {
    content = <RetryButton refetch={refetch} />;
  } else if (!data || data?.length === 0) {
    content = <p className='text-center italic'>No data available.</p>;
  } else {
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      manualPagination: true,
      pageCount,
    });

    content = (
      <>
        <div className='w-full h-full overflow-x-auto overflow-y-hidden scroll-smooth'>
          <table className='w-full h-full mb-4'>
            <thead className='font-montserrat font-bold text-left'>
              {
                table.getHeaderGroups().map(header => {
                  return <tr key={header.id} className='sticky top-0'>{header.headers.map(cell => {
                    return <th key={cell.id} colSpan={cell.colSpan} className='whitespace-nowrap pt-4 pb-3.5 bg-white/15 first:rounded-tl-2xl first:pl-6 px-4 last:rounded-tr-2xl last:pr-6'>
                      {flexRender(cell.column.columnDef.header, cell.getContext())}
                    </th>
                  })}
                  </tr>
                })
              }
            </thead>

            <tbody className='font-ibm-plex-mono'>
              {
                table.getRowModel().rows.map((row, rowNumber, rows) => (
                  <tr key={row.id} className='relative h-16 text-white/50'>
                    {
                      row.getVisibleCells().map((cell, cellNumber, cells) => (
                        <td key={cell.id} className={`relative whitespace-nowrap bg-white/10 p-4 first:pl-6 last:pr-6 ${rowNumber === rows.length - 1 && 'first:rounded-bl-2xl last:rounded-br-2xl'}`}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          {
                            // right border. for every cell except last
                            cellNumber !== cells.length - 1 &&
                            <span className='absolute top-0 bottom-0 right-0 w-0.5 h-full py-2 after:block after:w-full after:h-full after:rounded-full after:bg-white/5'></span>
                          }
                          {
                            // bottom border. for every row except last
                            rowNumber !== rows.length - 1 &&
                            <span className={`absolute bottom-0 left-0 right-0 w-full h-0.5 after:block after:w-full after:h-full after:bg-white/5 ${cellNumber === 0 && 'pl-2 after:rounded-l-full'} ${cellNumber === cells.length - 1 && 'pr-2 after:rounded-r-full'} `}></span>
                          }
                        </td>
                      ))
                    }
                  </tr>
                ))
              }
            </tbody>
          </table >
        </div>
        {
          (pageIndex !== undefined && setPageIndex !== undefined && pageCount !== undefined)
            ? <div className='w-full flex justify-center items-center font-ibm-plex-mono py-4'>
              <button
                className='-rotate-90 px-1 disabled:opacity-40'
                onClick={() => setPageIndex(pageIndex - 1)}
                disabled={pageIndex <= 0 || isPending || isError || !data}
              >
                <ArrowIcon />
              </button>
              <button
                className='-rotate-90 px-1 disabled:opacity-40'
                onClick={() => setPageIndex(0)}
                disabled={pageIndex <= 0 || isPending || isError || !data}
              >
                <ArrowIcon />
                <ArrowIcon />
              </button>
              <p
                className='font-medium text-white/80 px-6'
              >
                {(pageIndex + (pageCount === 0 ? 0 : 1)).toLocaleString('en-US')} <span className='font-normal'>of</span> {pageCount.toLocaleString('en-US')}
              </p>
              <button
                className='rotate-90 px-1 disabled:opacity-40'
                onClick={() => setPageIndex(pageCount - 1)}
                disabled={pageIndex >= pageCount - 1 || isPending || isError || !data}
              >
                <ArrowIcon />
                <ArrowIcon />
              </button>
              <button
                className='rotate-90 px-1 disabled:opacity-40'
                onClick={() => setPageIndex(pageIndex + 1)}
                disabled={pageIndex >= pageCount - 1 || isPending || isError || !data}
              >
                <ArrowIcon />
              </button>
            </div>
            : null
        }
      </>

    )
  }

  return (
    <div className={`${className}`}>
      {content}
    </div>
  )
}