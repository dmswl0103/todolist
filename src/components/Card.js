import React, { useState, useEffect } from 'react';

const Card = ({ taskObj, index, deleteTask, updateListArray, getColorIndex, handleTaskCompletion }) => {
    const [subtasks, setSubtasks] = useState(taskObj.Subtasks || []);

    useEffect(() => {
        setSubtasks(taskObj.Subtasks || []);
    }, [taskObj]);

    const handleCheckboxChange = (subtaskIndex) => {
        const updatedSubtasks = [...subtasks];
        updatedSubtasks[subtaskIndex].completed = !updatedSubtasks[subtaskIndex].completed;

        const allCompleted = updatedSubtasks.every(subtask => subtask.completed);

        const updatedTask = { ...taskObj, Subtasks: updatedSubtasks };
        handleTaskCompletion(updatedTask, index, allCompleted);
    };

    return (
        <div className="card-wrapper" style={{ borderColor: `color-${getColorIndex(taskObj.Name)}` }}>
            <div className="card-top" style={{ backgroundColor: `color-${getColorIndex(taskObj.Name)}` }}></div>
            <div className="task-holder">
                <span className="card-header" style={{ textDecoration: taskObj.completed ? 'line-through' : 'none' }}>{taskObj.Name}</span>
                <p className="mt-3">{taskObj.Description}</p>

                {subtasks.map((subtask, subtaskIndex) => (
                    <div key={subtaskIndex} className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id={`subtask-${index}-${subtaskIndex}`}
                            checked={subtask.completed}
                            onChange={() => handleCheckboxChange(subtaskIndex)}
                        />
                        <label className="form-check-label" htmlFor={`subtask-${index}-${subtaskIndex}`} style={{ textDecoration: subtask.completed ? 'line-through' : 'none' }}>
                            {subtask.description}
                        </label>
                    </div>
                ))}

                <div className="task-footer">
                    <button className="btn btn-primary" onClick={() => updateListArray(taskObj, index)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => deleteTask(index)}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default Card;
