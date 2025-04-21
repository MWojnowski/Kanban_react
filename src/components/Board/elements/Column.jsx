import React, { useState } from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { Button } from '../../ui/Button';
import { Trash2, Plus } from 'lucide-react';

const Column = ({
  columnId,
  tasks,
  index,
  newTaskInput,
  handleNewTaskInputChange,
  addTask,
  deleteColumn,
  renameColumn,
}) => {
  const [editingColumn, setEditingColumn] = useState(false);
  const [localNewTitle, setLocalNewTitle] = useState(columnId);

  const handleRename = () => {
    if (localNewTitle.trim()) {
      renameColumn(columnId, localNewTitle);
    }
    setEditingColumn(false);
  };

  return (
    <Draggable draggableId={columnId} index={index}>
      {(draggableProvided) => (
        <div
          className="bg-white text-gray-800 p-6 rounded-lg shadow-lg dark:bg-gray-700 dark:text-white w-80 flex-shrink-0"
          ref={draggableProvided.innerRef}
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
        >
          <div className="flex items-center justify-between mb-4">
            {editingColumn ? (
              <input
                type="text"
                className="border p-2 rounded-md w-full dark:bg-gray-600"
                value={localNewTitle}
                onChange={(e) => setLocalNewTitle(e.target.value)}
                onBlur={handleRename}
                onKeyDown={(e) => e.key === 'Enter' && handleRename()}
                autoFocus
              />
            ) : (
              <h2
                className="text-2xl font-semibold capitalize cursor-pointer"
                onClick={() => setEditingColumn(true)}
              >
                {columnId}
              </h2>
            )}
            <Button
              variant="destructive"
              size="sm"
              onClick={() => deleteColumn(columnId)}
            >
              <Trash2 className="w-5 h-5" />
            </Button>
          </div>

          <div className="mt-4 mb-4">
            <input
              className="border p-2 rounded-md w-full dark:bg-gray-600"
              type="text"
              placeholder="New task"
              value={newTaskInput || ''}
              onChange={(e) =>
                handleNewTaskInputChange(columnId, e.target.value)
              }
              onKeyDown={(e) => e.key === 'Enter' && addTask(columnId)}
            />
            <Button
              variant="default"
              size="sm"
              className="mt-2 w-full"
              onClick={() => addTask(columnId)}
            >
              <Plus className="w-4 h-4 mr-2" /> Add Task
            </Button>
          </div>

          <Droppable droppableId={columnId} type="TASK">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{ minHeight: '100px' }}
              >
                {tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        className="bg-white p-4 rounded-lg shadow-sm mb-2 cursor-pointer hover:bg-gray-100 dark:bg-gray-600 dark:hover:bg-gray-500"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {task.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
