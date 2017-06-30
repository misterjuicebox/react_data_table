import React, {Component} from 'react';
import ControlItem from './ControlItem';

class Controls extends Component {
  constructor(){
    super();
    this.state = {
      newPageIndex: {},
      newControl: {}
    }
  }
  static defaultProps = {
    pageLengths: [5, 10, 25, 50, 75, 100],
  }

  dropDown(){
    this.props.dropDown();
  }

  chooseLength(newLength){
    this.props.chooseLength(newLength);
  }

  pageBack(pageLength, firstI, lastI, currentPage){
    if(firstI === 0){
    }
    else if(lastI >= 5){
      this.setState({newControl:{
          id: 3,
          pageNumber: currentPage - 1,
          dash: '-',
          pageTotal: Math.ceil(100/pageLength),
          style: 'pagination',
          subTitle: 'of',
          subStyle: 'of',
          totalItems: 100,
          totalPagesStyle: 'total-pages',
          firstIndex: firstI - pageLength,
          lastIndex: lastI - pageLength
      }}, function (){
        this.props.setControls(this.state.newControl)
      })
    }
  }

  pageForward(pageLength, firstIndex, lastIndex, currentPage){
    if(lastIndex === 99){
    }
    else if(firstIndex + pageLength < 100){
      let firstI = firstIndex + pageLength;
      let lastI = lastIndex + pageLength;
      if(lastI > 99){
        lastI = 99;
      }
      this.setState({newControl:{
          id: 3,
          pageNumber: currentPage + 1,
          dash: '-',
          pageTotal: Math.ceil(100/pageLength),
          style: 'pagination',
          subTitle: 'of',
          subStyle: 'of',
          totalItems: 100,
          totalPagesStyle: 'total-pages',
          firstIndex: firstI,
          lastIndex: lastI     
      }}, function (){
        this.props.setControls(this.state.newControl)
      })
    }
  }

  render() {
    let pageLength = this.props.controls[2].lengths;
    let pageNumber = this.props.controls[3].pageNumber;
    let firstIndex = this.props.controls[3].firstIndex
    let lastIndex = this.props.controls[3].lastIndex;
    let controlItems;
    
    if(this.props.controls){
      controlItems = this.props.controls.map(control => {
        return (
          <ControlItem chooseLength={this.props.chooseLength.bind(this)} dropDown={this.props.dropDown.bind(this)} key={control.id} control={control} />
        )
      })
    }

    return (
      <div className="table-title">
        <ul>
          {controlItems}
          <li className="arrows"><i onClick={this.pageBack.bind(this, pageLength, firstIndex, lastIndex, pageNumber)} className="fa fa-chevron-left"></i> <i onClick={this.pageForward.bind(this, pageLength, firstIndex, lastIndex, pageNumber)} className="fa fa-chevron-right"></i></li>
        </ul>
      </div>
    );
  }
}

export default Controls;


