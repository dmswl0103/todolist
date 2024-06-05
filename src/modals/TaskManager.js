import React, { useState } from 'react';
import { Button, Checkbox, FormControlLabel } from '@mui/material';
import CreateTaskPopup from './CreateTaskPopup';
import EditTaskPopup from './EditTaskPopup';

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);

    const toggleCreateModal = () => setCreateModalOpen(!isCreateModalOpen);
    const toggleEditModal = () => setEditModalOpen(!isEditModalOpen);

    const saveTask = (task) => {
        setTasks([...tasks, task]);
        toggleCreateModal();
    };

    const updateTask = (updatedTask) => {
        const updatedTasks = tasks.map(task => task.Name === currentTask.Name ? updatedTask : task);
        setTasks(updatedTasks);
        toggleEditModal();
    };

    const handleCheckboxChange = (taskName, subtaskIndex) => {
        const updatedTasks = tasks.map(task => {
            if (task.Name === taskName) {
                const updatedSubtasks = [...task.Subtasks];
                updatedSubtasks[subtaskIndex].completed = !updatedSubtasks[subtaskIndex].completed;
                const allCompleted = updatedSubtasks.every(subtask => subtask.completed);

                return { ...task, Subtasks: updatedSubtasks, completed: allCompleted };
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    const openEditModal = (task) => {
        setCurrentTask(task);
        toggleEditModal();
    };

    return (
        <div>
            <Button onClick={toggleCreateModal}>Create Task</Button>
            <CreateTaskPopup modal={isCreateModalOpen} toggle={toggleCreateModal} save={saveTask} />
            {currentTask && (
                <EditTaskPopup
                    modal={isEditModalOpen}
                    toggle={toggleEditModal}
                    updateTask={updateTask}
                    taskObj={currentTask}
                />
            )}
            <div>
                {tasks.map((task, taskIndex) => (
                    <div key={taskIndex}>
                        <h3 style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.Name}</h3>
                        {task.Subtasks.map((subtask, subtaskIndex) => (
                            <FormControlLabel
                                key={subtaskIndex}
                                control={
                                    <Checkbox
                                        checked={subtask.completed}
                                        onChange={() => handleCheckboxChange(task.Name, subtaskIndex)}
                                        color="primary"
                                    />
                                }
                                label={subtask.description}
                                style={{ textDecoration: subtask.completed ? 'line-through' : 'none' }}
                            />
                        ))}
                        <Button onClick={() => openEditModal(task)}>Edit</Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskManager;
