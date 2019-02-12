import React from 'react';
import './TodoApp.css'
import {TodoList} from "../TodoList";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from "@material-ui/core/es/InputLabel/InputLabel";
import Input from "@material-ui/core/es/Input/Input";
import axios from "axios/index";

export class TodoApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {items: [], text: '', priority: 0, dueDate: "", file: null};
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handlePriorityChange = this.handlePriorityChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.axios = axios.create({
            baseURL: 'http://localhost:8080/api/',
            timeout: 10000,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem("token")}
        });
        this.loadDataFromServer();

    }


    loadDataFromServer() {

        let that = this;

        this.axios.get("todo").then(function (response) {
            console.log("This is my todolist:  ", response.data);
            that.setState({items: response.data})
        })
            .catch(function (error) {
                console.log(error);
            });
    }


    render() {

        return (
            <div>
                <Card className="todo-form">
                    <CardContent>
                        <form onSubmit={this.handleSubmit}>
                            <h3>New TODO</h3>

                            <FormControl>
                                <InputLabel htmlFor="text">Text</InputLabel>
                                <Input id="text" value={this.state.text} onChange={this.handleTextChange}/>
                            </FormControl>

                            <br/>
                            <br/>

                            <FormControl>
                                <InputLabel htmlFor="priority">Priority</InputLabel>
                                <Input id="priority" type="number" value={this.state.priority}
                                       onChange={this.handlePriorityChange}/>
                            </FormControl>

                            <br/>
                            <br/>

                            <TextField
                                id="due-date"
                                label="Due date"
                                type="datetime-local"
                                onChange={this.handleDateChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <br/>
                            <br/>
                            <input type="file" id="file" onChange={this.handleInputChange}/>
                            <br/>

                            <Button variant="contained" onClick={this.handleSubmit}>
                                Add #{this.state.items.length + 1}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <br/>
                <br/>
                <br/>

                <TodoList todoList={this.state.items}/>
            </div>
        );
    }

    handleTextChange(e) {
        this.setState({
            text: e.target.value
        });
    }

    handlePriorityChange(e) {
        this.setState({
            priority: e.target.value
        });
    }

    handleDateChange(e) {
        this.setState({
            dueDate: e.target.value
        });
    }

    handleInputChange(e) {
        this.setState({
            file: e.target.files[0]
        });
        console.log(this.state)
    }


    handleSubmit(e) {

        console.log("This is the submit:  ");

        e.preventDefault();


        // if (!this.state.text.length || !this.state.priority.length || !this.state.dueDate)
        //     return;


        let data = new FormData();
        data.append('file', this.state.file);

        let that = this;

        this.axios.post('files', data)
            .then(function (response) {

                console.log("file uploaded!", data);
                const newItem = {
                    text: that.state.text,
                    priority: that.state.priority,
                    dueDate: that.state.dueDate,
                    user: {
                        name: "Santiago Carrillo",
                        email: "sancarbar@gmail.com"
                    },
                    fileUrl: response.data
                };

                that.axios.post('todo', newItem)
                    .then(function (response) {

                        console.log("success save todo", response);
                        that.setState(prevState => ({
                            items: prevState.items.concat(newItem),
                            text: '',
                            priority: '',
                            dueDate: ''
                        }));

                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            })
            .catch(function (error) {
                console.log("failed file upload", error);
            });


    }
}