import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import Column from './elements/Column';
import AddColumnForm from './elements/AddColumnForm.jsx';

const Profile = ({ isLoggedIn }) => {
  const initialData = {
    toDo: [
      { id: 'task-1', content: 'Task 1' },
      { id: 'task-2', content: 'Task 2' },
    ],
    inProgress: [{ id: 'task-3', content: 'Task 3' }],
    done: [{ id: 'task-4', content: 'Task 4' }],
  };

  const initialColumnOrder = Object.keys(initialData);
  const [columnOrder, setColumnOrder] = useState(initialColumnOrder);
  const [tasks, setTasks] = useState(initialData);
  const [newTaskInputs, setNewTaskInputs] = useState({});
  const [newColumnName, setNewColumnName] = useState('');

  const handleNewTaskInputChange = (columnId, value) => {
    setNewTaskInputs((prevInputs) => ({
      ...prevInputs,
      [columnId]: value,
    }));
  };

  const addTask = (columnId) => {
    const newTaskText = newTaskInputs[columnId]?.trim();
    if (newTaskText) {
      const newTaskObj = {
        id: `task-${Date.now()}`,
        content: newTaskText,
      };
      const updatedTasks = { ...tasks };
      updatedTasks[columnId].push(newTaskObj);
      setTasks(updatedTasks);
      setNewTaskInputs((prevInputs) => ({
        ...prevInputs,
        [columnId]: '',
      }));
    }
  };

  const addColumn = () => {
    if (newColumnName.trim() !== '') {
      const newColumnId = newColumnName.toLowerCase().replace(/\s+/g, '');
      const updatedTasks = {
        ...tasks,
        [newColumnId]: [],
      };
      setTasks(updatedTasks);
      setColumnOrder((prevOrder) => [...prevOrder, newColumnId]);
      setNewColumnName('');
    }
  };

  const deleteColumn = (columnId) => {
    const updatedTasks = { ...tasks };
    delete updatedTasks[columnId];
    setTasks(updatedTasks);
    setColumnOrder((prevOrder) => prevOrder.filter((id) => id !== columnId));
  };

  const renameColumn = (columnId, newTitle) => {
    if (newTitle.trim() !== '') {
      const updatedTasks = { ...tasks };
      const renamedColumnTasks = updatedTasks[columnId];
      delete updatedTasks[columnId];

      const newColumnId = newTitle.toLowerCase().replace(/\s+/g, '');

      const newTasksState = {
        ...updatedTasks,
        [newColumnId]: renamedColumnTasks,
      };

      setTasks(newTasksState);
      setColumnOrder((prevOrder) =>
        prevOrder.map((id) => (id === columnId ? newColumnId : id))
      );
    }
  };

  const onDragEnd = (result) => {
    const { source, destination, type } = result;

    if (type === 'TASK') {
      if (!destination) return;
      if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
      )
        return;

      const sourceColumn = tasks[source.droppableId];
      const destinationColumn = tasks[destination.droppableId];
      const [movedTask] = sourceColumn.splice(source.index, 1);
      destinationColumn.splice(destination.index, 0, movedTask);

      setTasks({
        ...tasks,
        [source.droppableId]: sourceColumn,
        [destination.droppableId]: destinationColumn,
      });
    } else if (type === 'COLUMN') {
      if (!destination) return;
      if (source.index === destination.index) return;

      const newColumnOrder = Array.from(columnOrder);
      const [movedColumnId] = newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, movedColumnId);

      setColumnOrder(newColumnOrder);
    }
  };

  if (!isLoggedIn) return <Navigate to="/" replace />;

  return (
    <>
      <AddColumnForm
        newColumnName={newColumnName}
        setNewColumnName={setNewColumnName}
        addColumn={addColumn}
      />

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="COLUMN">
          {(provided) => (
            <div
              className="flex overflow-x-auto gap-8 p-6 mt-8"
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ minWidth: '100%' }}
            >
              {columnOrder.map((columnId, index) => (
                <Column
                  key={columnId}
                  columnId={columnId}
                  index={index}
                  tasks={tasks[columnId] || []}
                  setTasks={setTasks}
                  newTaskInput={newTaskInputs[columnId] || ''}
                  handleNewTaskInputChange={handleNewTaskInputChange}
                  addTask={addTask}
                  deleteColumn={deleteColumn}
                  renameColumn={renameColumn}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default Profile;
