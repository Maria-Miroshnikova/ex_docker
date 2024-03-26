import React, {useEffect, useState} from 'react';
import CardList from "./CardList";

interface AppProps {
    text: string
}

export interface TodoItem {
    id: number,
    task_text: string,
    pub_date: string
}

const default_item: TodoItem = {
    id: -1,
    task_text: "Task not found",
    pub_date: "-"
}

const base_url: string = 'http://localhost:8000/mainpage/todo'
const delete_url: string = "delete"
const add_url: string = "add"
const base_url_local: string = "http://localhost:3000/mainpage/todo"

const stringTodoItem = (item: TodoItem) => {
    return  "id: " + item.id + " text: " + item.task_text + " date: " + item.pub_date.toString()
}

const App = () => {

    const [text, setText] = useState("")
    // url это все что идет после todo, в том числе /
    const [url, setUrl] = useState("")
    const [todo_items, setItems] = useState<TodoItem[]>([])

    useEffect(() => {
       // setUrl(window.location.pathname)
        var new_url: string = window.location.href.substring(21)
        if (new_url != url) {
            setUrl(new_url)
            request_to_Api(new_url)
        }
       // console.log(window.location.pathname)
        console.log(window.location.href.substring(21));
    })

    const request_to_Api = (new_url: string) => {
        console.log("now url is: " + new_url)
        //fetch(base_url).then(res => res.json()).then(data => setText(data))
        //fetch(base_url).then(res =>  setText(res.text()))
        //fetch(base_url).then(res =>  res.json()).then(data => setText("id: " + data.id + " text: " + data.task_text))
        if (new_url.includes(delete_url)) {
            console.log("useEffect: delete")
            deleteTodoById(new_url).then(json => json as string).then(data => {
                setText(data)
                setItems([])
            })
        }
        else if (new_url.includes(add_url)) {
            addTodo().then(json => json as TodoItem).then(data => {
                setText(stringTodoItem(data))
                setItems([])
            })
            console.log("useEffect: add")
        }
        else if ((new_url == "/") || (new_url == "")) {
            console.log("useEffect: getList")
            getTodoList().then(json => json as TodoItem[]).then(data => {
                console.log(data)
                //var text_: string = ""
                //data.forEach(item => {
                //    text_ += stringTodoItem(item)
                //})
                //setText(text_)
                setText("")
                setItems(data)
            })

        }
        else {
            getTodoById(new_url).then(json => json as TodoItem).then(data => {
                //setText(stringTodoItem(data))
                setText("")
                setItems([data])
            })
            console.log("useEffect: getbyId")
        }
    }

    const getTodoList = () => {
        return fetch(base_url, {
            method: 'GET'
        })
            .then(response => response.json())
            .catch(error => {
                console.error(error);
            });
    };

    const getTodoById = (new_url: string) => {
        return fetch(base_url + new_url, {
            method: 'GET'
        })
            .then(response => {
                if (response.ok)
                    return response.json()
                else
                {
                    return {
                        id: -1,
                        task_text: "Error 404: task not found",
                        pub_date: "-"
                    }
                }
            })
            .catch(error => {
                console.error(error);
            });
    };

    const addTodo = () => {
        return fetch(base_url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: 0,
                task_text: 'todo text added',
                pub_date: "2024-03-25T19:14:00Z"
            })
        })
            .then(response => {
                if (response.ok)
                    return response.json()
                else
                {
                    return {
                        id: -1,
                        task_text: "Error: task was not added",
                        pub_date: "-"
                    }
                }
            })
            .catch(error => {
                console.error(error);
            });
    };

    const deleteTodoById = (new_url: string) => {
        return fetch(base_url + new_url, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok)
                    return "Task wad deleted"
                else
                    return "Error: task was not deleted"
            })
            .catch(error => {
                console.error(error);
            });
    };


    return(<div>
        <div>{"Todo tasks"}</div>
        <div> {text}</div>
        <CardList cards={todo_items}></CardList>
    </div>);
}

export default App