// src/App.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import CustomerList from './components/CustomerList';
import CustomerDetails from './components/CustomerDetails';

interface Customer {
  name: string;
  title: string;
  address: string;
  description: string;
}

const App: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<string>('');
  const [selectedCustomerIndex, setSelectedCustomerIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await axios.get('https://randomuser.me/api/?results=1000');
      const fetchedCustomers = response.data.results.map((user: any, index: number) => ({
        name: `${user.name.first} ${user.name.last}`,
        title: user.name.title,
        address: `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}`,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat mole bendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. ',
      }));

      setCustomers(fetchedCustomers);
      setSelectedCustomer(fetchedCustomers[0].name);
      setSelectedCustomerIndex(0); // Initialize selected index
    };
    fetchCustomers();
  }, []);

  const handleSelectCustomer = (name: string) => {
    const index = customers.findIndex(c => c.name === name);
    if (index !== -1) {
      setSelectedCustomer(name);
      setSelectedCustomerIndex(index);
    }
  };

  return (
    <div className="app-container">
      <div className="customer-list-container">
        <CustomerList customers={customers} selectedCustomer={selectedCustomer} onSelectCustomer={handleSelectCustomer} />
        {selectedCustomerIndex !== null && (
          <CustomerDetails
            customer={customers[selectedCustomerIndex]}
            serialNumber={selectedCustomerIndex + 1} // Pass the serial number (1-based index)
          />
        )}
      </div>
    </div>
  );
};

export default App;
