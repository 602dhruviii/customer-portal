// src/components/CustomerList.tsx
import React, { useState, useEffect, useRef } from 'react';
import '../App.css'; // Use specific CSS file for this component

interface Customer {
  name: string;
  description: string;
}

interface CustomerListProps {
  customers: Customer[];
  selectedCustomer: string;
  onSelectCustomer: (name: string) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ customers, selectedCustomer, onSelectCustomer }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const calculateItemsPerPage = () => {
      if (containerRef.current) {
        const containerHeight = containerRef.current.clientHeight;
        const itemHeight = 20; // Height of each customer item (adjust as necessary)
        setItemsPerPage(Math.floor(containerHeight / itemHeight));
      }
    };

    calculateItemsPerPage();
    window.addEventListener('resize', calculateItemsPerPage);

    return () => window.removeEventListener('resize', calculateItemsPerPage);
  }, []);

  const totalPages = Math.ceil(customers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCustomers = customers.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="customer-list" ref={containerRef}>
      <h2>Customer List</h2>
      {currentCustomers.map((customer, index) => {
        // Calculate the serial number (1-based index)
        const serialNumber = startIndex + index + 1;
        return (
          <div
            key={customer.name}
            className={`customer-item ${selectedCustomer === customer.name ? 'selected' : ''}`}
            onClick={() => onSelectCustomer(customer.name)}
          >
            <div className="customer-serial-number">Customer {serialNumber}</div> {/* Display serial number */}
            <div className="customer-name">{customer.name}</div>
            <div className="customer-description">{customer.description}</div>
          </div>
        );
      })}
      <div className="pagination">
        <button 
          className="pagination-button pagination-prev" 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1}
          aria-label="Previous Page"
        >
          &lt;
        </button>
        <span className="pagination-info">Page {currentPage} of {totalPages}</span>
        <button 
          className="pagination-button pagination-next" 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
          aria-label="Next Page"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default CustomerList;
