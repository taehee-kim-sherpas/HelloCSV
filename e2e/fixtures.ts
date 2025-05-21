const csvText = `employee_id,email,phone_number,address,city,state,zip_code
1234567,john.smith@company.com,555-123-4567,123 Main Street,Seattle,WA,98101
2345678,,555-234-5678,456 Oak Avenue,Portland,OR,97201
3456789,michael.brown@company.com,555-345-6789,789 Pine Road,San Francisco,CA,94102
4567890,sarah.davis@company.com,555-456-7890,321 Maple Lane,Los Angeles,CA,90001
5678901,,555-567-8901,654 Cedar Street,Denver,CO,80201
6789012,lisa.taylor@company.com,555-678-9012,987 Birch Boulevard,Austin,TX,78701
7890123,robert.johnson@company.com,555-789-0123,147 Elm Court,Chicago,IL,60601
8901234,jennifer.anderson@company.com,555-890-1234,258 Spruce Way,Boston,MA,2108
9012345,william.martinez@company.com,555-901-2345,369 Willow Drive,Miami,FL,33101
1123456,rachel.thompson@company.com,555-012-3456,741 Ash Street,Phoenix,AZ,85001
2234567,thomas.garcia@company.com,555-123-4567,852 Palm Avenue,Houston,TX,77001
3345678,patricia.lee@company.com,555-234-5678,963 Beach Road,San Diego,CA,92101
4456789,james.white@company.com,555-345-6789,159 Mountain View,Las Vegas,NV,89101
5567890,elizabeth.hall@company.com,555-456-7890,753 Valley Lane,Atlanta,GA,30301
6678901,christopher.clark@company.com,555-567-8901,951 River Road,Nashville,TN,37201
7789012,michelle.rodriguez@company.com,555-678-9012,357 Lake Drive,Minneapolis,MN,55401
8890123,daniel.lewis@company.com,555-789-0123,246 Forest Path,Detroit,MI,48201
9901234,nicole.walker@company.com,555-890-1234,135 Sunset Boulevard,Philadelphia,PA,19101
1012345,kevin.allen@company.com,555-901-2345,468 Harbor View,Seattle,WA,98102
2123456,amanda.young@company.com,555-012-3456,791 Ocean Drive,San Francisco,CA,94103`;

export const inputCsvFile = new File([csvText], 'test.csv', {
  type: 'text/csv',
});

export const expectedEmployees = [
  {
    employee_id: '1234567',
    email: 'john.smith@company.com',
    phone_number: '555-123-4567',
    address: '123 Main Street',
    city: 'Seattle',
    state: 'WA',
    zip_code: '98101',
  },
  {
    employee_id: '2345678',
    email: '',
    phone_number: '555-234-5678',
    address: '456 Oak Avenue',
    city: 'Portland',
    state: 'OR',
    zip_code: '97201',
  },
  {
    employee_id: '3456789',
    email: 'michael.brown@company.com',
    phone_number: '555-345-6789',
    address: '789 Pine Road',
    city: 'San Francisco',
    state: 'CA',
    zip_code: '94102',
  },
  {
    employee_id: '4567890',
    email: 'sarah.davis@company.com',
    phone_number: '555-456-7890',
    address: '321 Maple Lane',
    city: 'Los Angeles',
    state: 'CA',
    zip_code: '90001',
  },
  {
    employee_id: '5678901',
    email: '',
    phone_number: '555-567-8901',
    address: '654 Cedar Street',
    city: 'Denver',
    state: 'CO',
    zip_code: '80201',
  },
  {
    employee_id: '6789012',
    email: 'lisa.taylor@company.com',
    phone_number: '555-678-9012',
    address: '987 Birch Boulevard',
    city: 'Austin',
    state: 'TX',
    zip_code: '78701',
  },
  {
    employee_id: '7890123',
    email: 'robert.johnson@company.com',
    phone_number: '555-789-0123',
    address: '147 Elm Court',
    city: 'Chicago',
    state: 'IL',
    zip_code: '60601',
  },
  {
    employee_id: '8901234',
    email: 'jennifer.anderson@company.com',
    phone_number: '555-890-1234',
    address: '258 Spruce Way',
    city: 'Boston',
    state: 'MA',
    zip_code: '2108',
  },
  {
    employee_id: '9012345',
    email: 'william.martinez@company.com',
    phone_number: '555-901-2345',
    address: '369 Willow Drive',
    city: 'Miami',
    state: 'FL',
    zip_code: '33101',
  },
  {
    employee_id: '1123456',
    email: 'rachel.thompson@company.com',
    phone_number: '555-012-3456',
    address: '741 Ash Street',
    city: 'Phoenix',
    state: 'AZ',
    zip_code: '85001',
  },
  {
    employee_id: '2234567',
    email: 'thomas.garcia@company.com',
    phone_number: '555-123-4567',
    address: '852 Palm Avenue',
    city: 'Houston',
    state: 'TX',
    zip_code: '77001',
  },
  {
    employee_id: '3345678',
    email: 'patricia.lee@company.com',
    phone_number: '555-234-5678',
    address: '963 Beach Road',
    city: 'San Diego',
    state: 'CA',
    zip_code: '92101',
  },
  {
    employee_id: '4456789',
    email: 'james.white@company.com',
    phone_number: '555-345-6789',
    address: '159 Mountain View',
    city: 'Las Vegas',
    state: 'NV',
    zip_code: '89101',
  },
  {
    employee_id: '5567890',
    email: 'elizabeth.hall@company.com',
    phone_number: '555-456-7890',
    address: '753 Valley Lane',
    city: 'Atlanta',
    state: 'GA',
    zip_code: '30301',
  },
  {
    employee_id: '6678901',
    email: 'christopher.clark@company.com',
    phone_number: '555-567-8901',
    address: '951 River Road',
    city: 'Nashville',
    state: 'TN',
    zip_code: '37201',
  },
  {
    employee_id: '7789012',
    email: 'michelle.rodriguez@company.com',
    phone_number: '555-678-9012',
    address: '357 Lake Drive',
    city: 'Minneapolis',
    state: 'MN',
    zip_code: '55401',
  },
  {
    employee_id: '8890123',
    email: 'daniel.lewis@company.com',
    phone_number: '555-789-0123',
    address: '246 Forest Path',
    city: 'Detroit',
    state: 'MI',
    zip_code: '48201',
  },
  {
    employee_id: '9901234',
    email: 'nicole.walker@company.com',
    phone_number: '555-890-1234',
    address: '135 Sunset Boulevard',
    city: 'Philadelphia',
    state: 'PA',
    zip_code: '19101',
  },
  {
    employee_id: '1012345',
    email: 'kevin.allen@company.com',
    phone_number: '555-901-2345',
    address: '468 Harbor View',
    city: 'Seattle',
    state: 'WA',
    zip_code: '98102',
  },
  {
    employee_id: '2123456',
    email: 'amanda.young@company.com',
    phone_number: '555-012-3456',
    address: '791 Ocean Drive',
    city: 'San Francisco',
    state: 'CA',
    zip_code: '94103',
  },
];
