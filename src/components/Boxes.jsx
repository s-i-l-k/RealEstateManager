import React from 'react';
import Header from './Header.jsx';
import Header2 from './Header2.jsx';

class Boxes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    showMenu = () => {
        this.setState({
            visible: true
        })

    }

    hideMenu = () => {
        this.setState({
            visible: false
        })
    }

    render() {
        if (this.state.visible === false) {
            return (
                <div className='container'>
                    <Header onClick={this.showMenu}/>
                    {this.props.title.map((e,i) => {
                        return (
                            <div className={['box', `image${i+1}`, 'blur'].join(" ")} key={i}>
                                <h2>{e}</h2>
                            </div>
                        )
                    })
                    }
                </div>
            )
        } else {
            return (
                <div className='container'>
                    <Header2 onClick={this.hideMenu}/>
                    {this.props.title.map((e,i) => {
                        return (
                            <div className={['slideMenu', `dark`].join(" ")} key={i}>
                                <h2>{e}</h2>
                            </div>
                        )
                    })
                    }
                </div>
            )
        }
    }
};

export default Boxes;
