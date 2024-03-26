import React, {FC} from "react";
import Card from "./Card";
import {TodoItem} from "./App";

interface CardListProps {
    cards: TodoItem[]
}

const CardList: FC<CardListProps> = ({cards}) => {
    return(
    <div>
        {
            cards.map(card => <Card item={card}/>)
        }
    </div>)
}

export default CardList