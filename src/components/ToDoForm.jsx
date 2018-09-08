import React from "react";

class ToDoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            task: "",
            selectedOption: ""
        }

    }

    componentDidMount() {
        if (this.props.id) {
            fetch(`https://realestatemanager-4c9ef.firebaseio.com/tasks/${this.props.id}.json`,)
                .then(response => response.json())
                .then(obj => Object.keys(obj).map(id => ({ id, ...obj[id] })))
                .then(data => {
                    this.setState(data)
                })
        }

    }

    onChange = (event) => {
        this.setState({
            task: event.target.value ,
            selectedOption: this.props.selected
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.send();
    }

    send = () => {
        const data = this.state;

        fetch('https://realestatemanager-4c9ef.firebaseio.com/tasks.json', {
            method : 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(resp => resp.json())
            .then(({ name }) => this.props.onTaskAdd({ ...data, id: name }))
            .then(() => this.setState({ task: "" }));
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} >
                <input className="taskPlace" value={this.state.task} onChange={this.onChange} />
                <button className="sendbtn">Dodaj</button>
            </form>
        )
    }
}

export default ToDoForm;