// src/components/CustomerDetails.tsx
import React from 'react';
import '../App.css';
import PhotoGrid from './PhotoGrid';

interface Customer {
  name: string;
  title: string;
  address: string;
  description: string;
}

interface CustomerDetailsProps {
  customer: Customer;
  serialNumber: number; // Add this line to include serial number
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ customer, serialNumber }) => {
  return (
    <div className="customer-details">
      <h2 className="customer-details-header">{customer.name}</h2>
      <div className="customer-details-address">{customer.address}</div>
      <p className="customer-details-description">{customer.description}</p>
      <PhotoGrid />
    </div>
  );
};

export default CustomerDetails;
