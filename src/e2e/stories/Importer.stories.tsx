import { ComponentProps } from 'preact';
import Importer from '../../importer';

export const meta = {
  title: 'Importer',
  component: Importer,
};

export const Basic: { args: ComponentProps<typeof Importer> } = {
  args: {
    maxFileSizeInBytes: 10 * 1024 * 1024, // 10MB
    sheets: [
      {
        id: 'employees',
        label: 'Employees',
        columns: [
          {
            label: 'Employee ID',
            id: 'employee.id',
            type: 'number',
            validators: [
              { validate: 'required' },
              {
                validate: 'unique',
                error: 'This employee ID is not unique',
              },
              {
                validate: 'is_integer',
                error: 'This value must be a number',
              },
            ],
          },
          {
            label: 'Email',
            id: 'email',
            type: 'string',
            validators: [
              { validate: 'required' },
              { validate: 'unique', error: 'This email is not unique' },
              {
                validate: 'email',
                error: 'This email is not valid',
              },
            ],
          },
          {
            label: 'Phone Number',
            id: 'phone_number',
            type: 'string',
            validators: [
              { validate: 'required' },
              { validate: 'phone_number' },
            ],
          },
          {
            label: 'Address',
            id: 'address',
            type: 'string',
            validators: [{ validate: 'required' }],
          },
          { label: 'City', id: 'city', type: 'string' },
          {
            label: 'State',
            id: 'state',
            type: 'string',
            transformers: [{ transformer: 'state_code' }],
          },
          {
            label: 'Zip Code',
            id: 'zip_code',
            type: 'string',
            validators: [{ validate: 'required' }, { validate: 'postal_code' }],
          },
          {
            label: 'Full address',
            id: 'full_address',
            type: 'calculated',
            typeArguments: {
              getValue: (row) =>
                `${row.address}, ${row.city}, ${row.state} ${row.zip_code}`,
            },
          },
        ],
      },
    ],
    onDataColumnsMapped: (dataColumns) => {
      return dataColumns;
    },
    onComplete: async (state) => {
      console.log(JSON.stringify(state, null, 2));
    },
    preventUploadOnValidationErrors: true,
    persistenceConfig: {
      enabled: true,
    },
  },
};
