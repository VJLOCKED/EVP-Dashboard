'use client'

import { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface DataTableProps {
  data: Array<Record<string, any>>; // Define a generic structure for your data
}

export default function DataTable({ data }: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredData = useMemo(() => {
    return data.filter(item =>
      Object.values(item).some(
        value =>
          value &&
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      if (!sortColumn) return 0;
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortColumn, sortDirection]);

  const pageCount = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (column: string) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-2">
        <Input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full sm:w-64"
        />
        <div className="flex items-center space-x-2">
          <label htmlFor="itemsPerPage" className="text-sm font-medium">
            Items per page:
          </label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={e => setItemsPerPage(Number(e.target.value))}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {Object.keys(data[0]).map(columnKey => (
                <TableHead key={columnKey} className="font-semibold text-sm">
                  <button
                    onClick={() => handleSort(columnKey)}
                    className="flex items-center space-x-1 text-left font-semibold"
                  >
                    <span className="whitespace-nowrap">{columnKey}</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </button>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item, index) => (
              <TableRow key={index}>
                {Object.entries(item).map(([cellKey, value]) => (
                  <TableCell key={cellKey} className="whitespace-nowrap">
                    {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm">
            Page {currentPage} of {pageCount}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
            disabled={currentPage === pageCount}
            className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="text-sm text-gray-600">
          Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, sortedData.length)} of {sortedData.length} items
        </div>
      </div>
    </div>
  );
}
