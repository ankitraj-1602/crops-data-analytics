import React, { useState } from 'react';
import { Table, Pagination} from '@mantine/core';
import styles from './DataTable.module.css';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

interface Column {
  key: string;
  label: string;
}

interface DataTableProps {
  data: Array<{ [key: string]: any }>;
  columns: Column[];
  rowsPerPage?: number;
}

const DataTable: React.FC<DataTableProps> = ({ data, columns, rowsPerPage = 10 }) => {
  const [activePage, setPage] = useState(1);

  // Calculate the current rows to display based on the active page and rows per page
  const startRow = (activePage - 1) * rowsPerPage;
  const endRow = startRow + rowsPerPage;
  const currentRows = data.slice(startRow, endRow);

  return (
    <div className={styles['data-table-container']}>
      <Table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, index) => (
            <tr key={index}>
              {columns.map((col) => (
                <td key={col.key}>{row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <div className={styles.page}>
        <Pagination
          total={Math.ceil(data.length / rowsPerPage)}
          value={activePage}
          onChange={setPage}
          siblings={3}
          previousIcon={IconChevronLeft}
          nextIcon={IconChevronRight}
          styles={{
            control: {
              outline: 'none',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              padding: '6px 10px',
              fontSize: '15px',
              backgroundColor: '#ffffff',
              color: '#333333',
              cursor: 'pointer',
              margin:'5px',
              transition: 'background-color 0.2s ease, color 0.2s ease',
              '&:hover': {
                backgroundColor: '#f5f5f5',
                borderColor: '#60cdff',
                color: '#007bff',
              },
            }
          }}
        />
        
      </div>
    </div>
  );
};

export default DataTable;
