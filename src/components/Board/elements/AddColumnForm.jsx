import React from 'react';
import { Button } from '../../ui/Button';
import { Plus } from 'lucide-react';

const AddColumnForm = ({ newColumnName, setNewColumnName, addColumn }) => {
  return (
    <div className="text-center mt-8">
      <input
        className="border p-2 rounded-md dark:bg-gray-600 w-64"
        type="text"
        placeholder="New column name"
        value={newColumnName}
        onKeyDown={(e) => e.key === 'Enter' && addColumn()}
        onChange={(e) => setNewColumnName(e.target.value)}
      />
      <Button
        variant="default"
        size="lg"
        className="mt-4 ml-2"
        onClick={addColumn}
      >
        <Plus className="w-5 h-5 mr-2" /> Add Column
      </Button>
    </div>
  );
};

export default AddColumnForm;
