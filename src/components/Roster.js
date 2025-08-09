// src/components/Roster.js
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'position', headerName: 'Position', width: 100 },
  { field: 'rating', headerName: 'Rating', width: 100 },
  { field: 'salary', headerName: 'Salary', width: 150, valueFormatter: ({ value }) => `$${value.toLocaleString()}` },
];

const Roster = () => {
  const rows = JSON.parse(localStorage.getItem('yourTeam') || '[]');
  return (
    <div style={{ height: 400, width: '100%', padding: 16 }}>
      <DataGrid rows={rows} columns={columns} pageSize={10} />
    </div>
  );
};
