import React, { Component } from 'react';

class ControlItem extends Component {
  constructor(){
    super();
    this.state = {
      newLength:{},
    }
  }

  static defaultProps= {
    pageLengths:[5, 10, 25, 50, 75, 100]
  }

  onClick(){
    this.props.dropDown();
  }

  chooseLength(length){
    this.setState({newLength:
      {
        id: 2,
        title: 'items per page',
        style: 'items-per-page',
        subStyle: 'page-number',
        lengths: length,
        arrow: 'fa fa-caret-down'
      }
    }, function(){
      this.props.chooseLength(this.state.newLength);
    })
  }

  render() {
    let lengths = this.props.pageLengths.map(length => {
      return <option onClick={this.chooseLength.bind(this, length)} key={length} value={length}>{length}</option>
    })
    return (
      <li className={this.props.control.style}>
        {this.props.control.title}{this.props.control.pageNumber} {this.props.control.dash} {this.props.control.pageTotal} <span className={this.props.control.subStyle}>{this.props.control.subTitle} <a onClick={this.onClick.bind(this)} className='drop-click'>{this.props.control.lengths} <i className={this.props.control.arrow}></i></a><div id='drop-down' className='drop-down-content'><p>{lengths}</p></div><span className={this.props.control.totalPagesStyle}>{this.props.control.totalItems}</span><i className={this.props.control.icon}></i></span>
      </li>
    );
  } 
}

export default ControlItem;
