import React, { useEffect, useState } from 'react';
import CreateTask from '../modals/CreateTask';
import Card from './Card';

const TodoList = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        let arr = localStorage.getItem("taskList");

        if (arr) {
            let obj = JSON.parse(arr);
            setTaskList(obj);
        }
    }, []);

    // 할 일 체크 처리 함수
    const handleTaskCompletion = (updatedTask, index, allCompleted) => {
        const updatedTaskList = [...taskList];

        if (allCompleted) {
            updatedTaskList.splice(index, 1);
        } else {
            updatedTaskList[index] = updatedTask;
        }

        localStorage.setItem("taskList", JSON.stringify(updatedTaskList));
        setTaskList(updatedTaskList);
    };

    const deleteTask = (index) => {
        let tempList = [...taskList];
        tempList.splice(index, 1);
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
    };

    const updateListArray = (obj, index) => {
        let tempList = [...taskList];
        tempList[index] = obj;
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
    };

    const toggle = () => {
        setModal(!modal);
    };

    const saveTask = (taskObj) => {
        let tempList = [...taskList];
        tempList.push(taskObj);
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
        setModal(false);
    };

    const getColorIndex = (name) => {
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        return Math.abs(hash) % 5;
    };

    return (
        <>
            <div className="header text-center">
                <h3>Todo List</h3>
                <button className="btn btn-primary mt-2" onClick={() => setModal(true)}>Create Task</button>
            </div>
            <div className="task-container">
                {taskList && taskList.map((obj, index) => (
                    <Card
                        key={index}
                        taskObj={obj}
                        index={index}
                        deleteTask={deleteTask}
                        updateListArray={updateListArray}
                        getColorIndex={getColorIndex}
                        handleTaskCompletion={handleTaskCompletion}
                    />
                ))}
            </div>
            <CreateTask toggle={toggle} modal={modal} save={saveTask} />
        </>
    );
};

export default TodoList;
