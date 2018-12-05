
// import react modules from react
import React, { Component } from "react";

// creating class component
export default class App extends Component {

    // constructor method
    constructor(props) {

        // sending props to parent component
        super(props);

        // setting state object
        this.state = {
            todos: [],
            currentTodo: {
                todo: '',
                completed: false
            }
        };

    }

    componentDidMount() {

        console.log("Component Mounted");

    }

    // function called when user starts typing
    todoChange = (e) => {

        // fetching current value
        let todo = e.target.value;

        // setting currentTodo's todo as user types.
        this.setState({

            currentTodo: {
                todo,
                completed: false
            }

        });

    }

    // function called when user presses enter or Submit button
    onSubmit = (e) => {

        // prevent redirection on form submit
        e.preventDefault();

        // save todo only if: 
        // currentTodo is present
        // currentTodo has todo property
        // todo property is not empty
        if (this.state.currentTodo && this.state.currentTodo.todo &&
            this.state.currentTodo.todo.trim().length != 0) {

            // Checking for already present Todos

            // enter if some todos present
            if (this.state.todos.length > 0) {

                // find if any matching todo is present
                var getTodo = this.state.todos.filter((Todo) => {

                    return Todo.todo == this.state.currentTodo.todo ? Todo : '';

                });

                // if present alert!!
                if (getTodo.length != 0) {

                    alert("Todo already present.");

                }
                else {

                    // else save the todo
                    this.setState((prevState) => {

                        return {
                            todos: prevState.todos.concat([this.state.currentTodo]),
                            currentTodo: {}
                        }

                    });

                }

            }
            else {

                // if the current Todo is the first Todo, save it.
                this.setState((prevState) => {

                    return {
                        todos: prevState.todos.concat([this.state.currentTodo]),
                        currentTodo: {}
                    }

                });

            }

        }
    }

    // function called when user marks todo complete.
    onTodoComplete = (e) => {

        // fetch the specific todo, the user clicked on.
        var getTodo = this.state.todos.filter((Todo) => {

            return Todo.todo == e.target.value ? Todo : '';

        });

        // set it to completed.
        getTodo[0].completed = !getTodo[0].completed;

        // update the whole array with the latest todo
        let newTodos = this.state.todos.map((val, i) => {

            return val.todo == getTodo.todo ? getTodo : val;

        });

        // set it to state
        this.setState({
            todos: newTodos
        });

    }

    // on specific todo delete button press.
    onTodoDelete = (e) => {
        // get the todos except todo whose corresponding delete
        // button was clicked
        let newTodos = this.state.todos.map((val, i) => {

            return val.todo != e.target.value ? val : ''

        });

        // set the state
        this.setState({

            todos: newTodos

        });

    }

    // when user want to delete all todos at once
    onDeleteAll = (e) => {

        // bring the state to initial values
        this.setState({
            todos: [],
            currentTodo: {
                todo: '',
                completed: false
            }
        });

    }

    render() {
        return (
            <div className="container">

                {/* heading div */}
                <div className="heading">

                    Daily Todo List

                    {/* remove all todos button */}
                    <i className="fa fa-trash fa-1x deleteAllBtn" aria-hidden="true"
                        onClick={this.onDeleteAll}
                    ></i>

                </div>

                {/* input todo div */}
                <div className="inputTodoDiv">

                    {/* form */}
                    <form className="todoForm" onSubmit={this.onSubmit}>

                        <input className="inputTodo" type="text" value={this.state.currentTodo.todo || ''}
                            onChange={this.todoChange} placeholder="Add your todo" />
                        <button className="todoSubmit" type="submit">
                            <i className="fa fa-plus-circle fa-2x" aria-hidden="true"></i>
                        </button>

                    </form>

                </div>

                {/* container for todos */}
                <div className="todoList">

                    {/* if not todos print "no todos present" message */}
                    {this.state.todos.length == 0 ?

                        <div className="todoListContainer noTodosContainer">No Todos!!</div>

                        :
                        //  else loop over the todos and print them
                        this.state.todos.map((val, i) => {
                            return (

                                <div key={i}>

                                    {/* if todo not null print it */}
                                    {val.todo &&

                                        <div className="todoListContainer">


                                            {/* complete button class toggle */}
                                            <button className={"checkStatus" + (val.completed ? ' completeClass'
                                                : ''
                                            )}

                                                value={val.todo}
                                                onClick={this.onTodoComplete}
                                            ></button>

                                            {/* strike todo if complete */}
                                            <p className={"todo" + (val.completed ? ' todoComplete'
                                                : '')
                                            }>

                                                {val.todo}
                                            </p>

                                            {/* delete todo */}
                                            <div className="deleteBtnContainer">
                                                <button className="deleteBtn" value={val.todo}
                                                    onClick={this.onTodoDelete}
                                                >
                                                    Delete
                                                </button>
                                            </div>

                                        </div>

                                    }

                                </div>

                            );
                        })
                    }

                </div>

            </div>
        );
    }
}
