import React from 'react';

class ToDoItem extends React.Component{
    handleDoneClick = () => {
        //Pamiętaj o sprawdzeniu czy
        //atrybut istnieje i można go wywołać!
        if ( typeof this.props.onDone === 'function' ){
            this.props.onDone(this.props.title);
        }
    }
    render(){
        return <li><span>{this.props.title}</span>
            <button
                onClick={this.handleDoneClick}
            >Zakończ</button></li>;
    }
}

class ToDoList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            items: ['Kupić bułki','Ugotować rosół',
                'Zrobić prezentację ze zdarzeń']
        };
    }
    handleItemDone = (title) => {
        const newItems = this.state.items.filter(item => {
            return item !== title;
        });
        this.setState({
            items: newItems
        });
    };
    render(){
        const items = this.state.items.map((item, i) => {
            return <ToDoItem
                key={i}
                title={item}
                onDone={this.handleItemDone}
            />
        });
        return <ul>
            {items}
        </ul>;
    }
}

export default ToDoList;