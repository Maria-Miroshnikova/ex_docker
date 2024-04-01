import React, {FC} from "react";
import {TodoItem} from "./App";

interface CardProps {
    item: TodoItem
}


const Card: FC<CardProps> = ({item}) => {
    return (
    <div style={{border: "1px solid gray"}}>
        <div>
            {"TASK"}
        </div>
        <div>
            {"id: " + item.id}
        </div>
        <div>
            {"text: " + item.task_text}
        </div>
        <div>
            {"date: " + item.pub_date.toString()}
        </div>
    </div>)
}

export default Card