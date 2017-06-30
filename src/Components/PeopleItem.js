import React, { Component } from 'react';

class PeopleItem extends Component {
  render(){
    return (
        <tr>
          <td className="first-name-row">{this.props.people.firstName}</td>
          <td className="last-name-row">{this.props.people.lastName}</td>
          <td className="country-row">{this.props.people.country}</td>
          <td className="address-row">{this.props.people.address}</td>
          <td className="city-row">{this.props.people.city}</td>
          <td className="state-row">{this.props.people.state}</td>
          <td className="zip-row">{this.props.people.zip}</td>
          <td className="phone-row">{this.props.people.phone}</td>
        </tr>
    );
  }
}

export default PeopleItem;