import React, {Component } from 'react';

class Navigations extends Component {
    static defaultProps = {
        navigations: ['Nav Item 1', 'Nav Item 2', 'Nav Item 3']
    }


    render(){
        let navButtons = this.props.navigations.map(navigation => {
            return <li className="navigation" key={navigation}>{navigation}</li>
        });
        return (
            <div className="top-nav">
                <ul>
                    {navButtons}
                </ul>
            </div>
        )
    }
}

export default Navigations;