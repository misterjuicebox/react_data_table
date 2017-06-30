import React, { Component } from 'react';

class PeopleHeader extends Component {
  constructor(){
    super();
    this.state = {
      newHeader:{},
      newControl:{} 
    }
  }

  onClick(id, header, direction, sorter){
    if(direction === "ASC"){
      this.setState({newHeader:{
        idx: id,
        title: header,
        order: "DESC",
        sorter: sorter
      }}, function(){
        this.props.addHeader(this.state.newHeader);
      })
      this.setState({newControl:{
        id: 1,
        title: 'Sort by',
        style: 'sorting-type',
        subTitle: header,
        subStyle: 'sort-selection',
        icon: 'fa fa-caret-down'        
      }}, function(){
        this.props.changeControl(this.state.newControl);
        this.props.sort(this.state.newHeader.order, this.state.newHeader.sorter);
      })
    }
    if(direction ==="DESC"){
      this.setState({newHeader:{
        idx: id,
        title: header,
        order: "ASC",
        sorter: sorter
      }}, function(){
        this.props.addHeader(this.state.newHeader);
      })
      this.setState({newControl:{
        id: 1,
        title: 'Sort by',
        style: 'sorting-type',
        subTitle: header,
        subStyle: 'sort-selection',
        icon: 'fa fa-caret-up'        
      }}, function(){
        this.props.changeControl(this.state.newControl);
        this.props.sort(this.state.newHeader.order, this.state.newHeader.sorter);
      })
    }
  }

  render() {
    return (
      <th className={this.props.header.style}><a onClick={this.onClick.bind(this, this.props.header.idx, this.props.header.title, this.props.header.order, this.props.header.sorter)}>{this.props.header.title}</a></th>
    );
  } 
}

export default PeopleHeader;