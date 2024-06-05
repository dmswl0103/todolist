import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Checkbox, FormControlLabel } from '@mui/material';

const EditTaskPopup = ({ modal, toggle, updateTask, taskObj }) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [descriptionList, setDescriptionList] = useState([]);

    useEffect(() => {
        setTaskName(taskObj.Name || '');
        setDescription(taskObj.Description || '');
        if (taskObj.Description) {
            setDescriptionList(taskObj.Description.split('\n').map((desc, index) => ({
                id: index,
                text: desc,
                checked: taskObj.Subtasks[index].completed
            })));
        } else {
            setDescriptionList([]);
        }
    }, [taskObj]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "taskName") {
            setTaskName(value);
        } else {
            setDescription(value);
            setDescriptionList(value.split('\n').map((desc, index) => ({
                id: index,
                text: desc,
                checked: false
            })));
        }
    };

    const handleCheckboxChange = (id) => {
        const newDescriptionList = [...descriptionList];
        const index = newDescriptionList.findIndex(desc => desc.id === id);
        if (index !== -1) {
            newDescriptionList[index].checked = !newDescriptionList[index].checked;
            setDescriptionList(newDescriptionList);
        }
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const updatedDescription = descriptionList.map(desc => desc.text).join('\n');
        const tempObj = {
            Name: taskName,
            Description: updatedDescription,
            Subtasks: descriptionList.map(desc => ({
                description: desc.text,
                completed: desc.checked
            }))
        };
        updateTask(tempObj);
    };

    return (
        <Dialog open={modal} onClose={toggle}>
            <DialogTitle>Update Task</DialogTitle>
            <DialogContent>
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
                    {descriptionList.map((desc) => (
                        <FormControlLabel
                            key={desc.id}
                            control={
                                <Checkbox
                                    checked={desc.checked}
                                    onChange={() => handleCheckboxChange(desc.id)}
                                    color="primary"
                                />
                            }
                            label={desc.text}
                            style={{ textDecoration: desc.checked ? 'line-through' : 'none' }}
                        />
                    ))}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={handleUpdate}>Update</Button>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditTaskPopup;

