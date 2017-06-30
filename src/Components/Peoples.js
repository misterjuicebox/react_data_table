import React, { Component } from 'react';
import PeopleHeader from './PeopleHeader';
import PeopleItem from './PeopleItem';

class Peoples extends Component {
  addHeader(newHeader){
    this.props.addHeader(newHeader);
  }

  changeControl(newControl){
    this.props.changeControl(newControl);
  }

  sort(order, sorter){
    this.props.sort(order, sorter);
  }

  render(){
    let peopleHeaders;
    if(this.props.headers)
      peopleHeaders = this.props.headers.map(header => {
        return (
          <PeopleHeader sort={this.sort.bind(this)} changeControl={this.changeControl.bind(this) }addHeader={this.addHeader.bind(this)} key={header.title} header={header} />
        );
      });

    let firstIndex = this.props.controls[3].firstIndex; 
    let lastIndex = this.props.controls[3].lastIndex;

    let peopleItems;
    if(this.props.peoples){
      peopleItems = this.props.peoples.slice(firstIndex, lastIndex).map(people => {
        return (
          <PeopleItem key={people.id} people={people} />
        );
      });
    }
    return (
      <div className="table">
          <table id="people-table" className="info-table">
            <thead>
              <tr>
                {peopleHeaders}
              </tr>
            </thead>
            <tbody>
              {peopleItems}
            </tbody>
          </table>
      </div>
    )
  }
}

export default Peoples