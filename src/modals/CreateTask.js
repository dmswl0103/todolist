import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';

const CreateTaskPopup = ({ modal, toggle, save }) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [subtasks, setSubtasks] = useState([]);
    const [taskCreated, setTaskCreated] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "taskName") {
            setTaskName(value);
        } else {
            setDescription(value);
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        const lines = description.split('\n');
        let taskObj = {
            Name: taskName,
            Description: description,
            Subtasks: lines.map(line => ({
                description: line,
                completed: false
            }))
        };
        save(taskObj);
        setSubtasks(taskObj.Subtasks);
        setTaskCreated(true);
        setTaskName('');
        setDescription('');
    };

    const handleToggleComplete = (index) => {
        const updatedSubtasks = [...subtasks];
        updatedSubtasks[index].completed = !updatedSubtasks[index].completed;
        setSubtasks(updatedSubtasks);
    };

    return (
        <Dialog open={modal} onClose={toggle}>
            <DialogTitle>Create Task</DialogTitle>
            <DialogContent>
                {!taskCreated ? (
                    <DialogContentText>
                        <div className="form-group">
                            <TextField
                                label="Task Name"
                                variant="outlined"
                                fullWidth
                                value={taskName}
                                onChange={handleChange}
                                name="taskName"
                                margin="dense"
                            />
                        </div>
                        <div className="form-group">
                            <TextField
                                label="Description"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={5}
                                value={description}
                                onChange={handleChange}
                                name="description"
                                margin="dense"
                            />
                        </div>
                    </DialogContentText>
                ) : (
                    <div>
                        <DialogContentText>{description}</DialogContentText>
                        <ul>
                            {subtasks.map((subtask, index) => (
                                <li key={index}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={subtask.completed}
                                            onChange={() => handleToggleComplete(index)} // 여기서 handleToggleComplete 사용
                                        />
                                        {subtask.description}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                {!taskCreated ? (
                    <Button color="primary" onClick={handleSave}>Create</Button>
                ) : null}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateTaskPopup;
