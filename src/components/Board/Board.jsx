import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import Column from './elements/Column.jsx';
import AddColumnForm from './elements/AddColumnForm.jsx';

const Board = () => {
  const [columnOrder, setColumnOrder] = useState([]);
  const [tasks, setTasks] = useState({});
  const [newTaskInputs, setNewTaskInputs] = useState({});
  const [newColumnName, setNewColumnName] = useState('');

  useEffect(() => {
    fetch('/Projects/board_data.csv')
      .then((res) => res.text())
      .then((text) => {
        if (text.startsWith('<!DOCTYPE html')) {
          console.error('Expected CSV, but got HTML. File may not exist or is misconfigured.');
          return;
        }
  
        const rows = text
          .trim()
          .split('\n')
          .map((row) => row.split(',').map((cell) => cell.trim()));
  
        if (rows.length < 1) return;
  
        const columnNames = rows[0];
        const numColumns = columnNames.length;
  
        const tasksByColumn = {};
        columnNames.forEach((col) => {
          const colId = col.toLowerCase().replace(/\s+/g, '');
          tasksByColumn[colId] = [];
        });
  
        for (let i = 1; i < rows.length; i++) {
          const row = rows[i];
          for (let colIndex = 0; colIndex < numColumns; colIndex++) {
            const taskContent = row[colIndex];
            if (taskContent) {
              const colName = columnNames[colIndex];
              const colId = colName.toLowerCase().replace(/\s+/g, '');
              tasksByColumn[colId].push({
                id: `task-${Date.now()}-${Math.random()}`,
                content: taskContent,
              });
            }
          }
        }
  
        setTasks(tasksByColumn);
        setColumnOrder(columnNames.map((name) => name.toLowerCase().replace(/\s+/g, '')));
      });
  }, []);
  

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

      const sourceColumn = Array.from(tasks[source.droppableId]);
      const destinationColumn = Array.from(tasks[destination.droppableId]);
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

export default Board;
