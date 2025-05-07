import React from 'react';
import TaskItem from './TaskItem';

function TaskList({tasks, onDelete, onToggle}) {
    return (
      <div className='mt-6'>
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks yet. Add one!</p>
        ) : (
          tasks.map((task) => (
            <TaskItem 
              key={task.id}
              task={task}
              onDelete={onDelete}
              onToggle={onToggle}
            />
          ))
        )}
      </div>
    )
  }
  export default TaskList;
  