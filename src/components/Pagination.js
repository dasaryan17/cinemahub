import React from 'react';
import { Pagination, Box } from '@mui/material';

function PaginationComponent({ page, setPage, totalPages }) {
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      mt: 6, 
      mb: 4,
      width: '100%' 
    }}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(event, value) => setPage(value)}
        size="large"
        variant="outlined"
        shape="rounded"
        sx={{
          '& .MuiPaginationItem-root': {
            color: '#fff', // White text for numbers
            borderColor: '#333',
            fontSize: '1.1rem',
            '&:hover': {
              backgroundColor: '#333',
            },
            '&.Mui-selected': {
              backgroundColor: '#f5c518', // IMDb Yellow
              color: '#000',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#e2b616',
              },
            },
          },
          '& .MuiPaginationItem-icon': {
            color: '#f5c518', // Arrows in yellow
          }
        }}
        aria-label="Movie pagination"
      />
    </Box>
  );
}

export default PaginationComponent;