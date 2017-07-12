import React, { Component } from 'react';
import $ from 'jquery';
import Navigations from './Components/Navigations';
import Controls from './Components/Controls';
import Peoples from './Components/Peoples';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      controls: [],
      headers: [],
      peoples: [],
      pageIndex: [],
      newControl: {}
    }
  };

  getControls(){
    this.setState({
      controls: [
        {
          id: 0,
          title: 'List of Awesome',
          style: 'table-header',
          subTitle: '|',
          subStyle: 'pipe-divider'

        },
        {
          id: 1,
          title: 'Sort by:',
          style: 'sorting-type',
          subStyle: 'sort-selection',
        },
        {
          id: 2,
          title: 'items per page:',
          style: 'items-per-page',
          subStyle: 'page-number',
          lengths: 5,
          arrow: 'fa fa-caret-down'
        },
        {
          id: 3,
          pageNumber: 1,
          dash: '-',
          pageTotal: 20,
          style: 'pagination',
          subTitle: 'of',
          subStyle: 'of',
          totalItems: 100,
          totalPagesStyle: 'total-pages',
          firstIndex: 0,
          lastIndex: 5
        }
      ]
    })
  };

  getHeaders(){
    this.setState({
      headers: [
        {
          idx: 0,
          title: 'First Name',
          order: 'ASC',
          style: 'first-name-row',
          sorter: 'firstName'
        },
        {
          idx: 1,
          title: 'Last Name',
          order: 'ASC',
          style: 'last-name-row',
          sorter: 'lastName'
        },
        {
          idx: 2,
          title: 'Country',
          order: 'ASC',
          style: 'country-row',
          sorter: 'country'
        },
        {
          idx: 3,
          title: 'Address',
          order: 'ASC',
          style: 'address-row',
          sorter: 'address'
        },
        {
          idx: 4,
          title: 'City',
          order: 'ASC',
          style: 'city-row',
          sorter: 'city'
        },
        {
          idx: 5,
          title: 'State',
          order: 'ASC',
          style: 'state-row',
          sorter: 'state'
        },
        {
          idx: 6,
          title: 'Zip',
          order: 'ASC',
          style: 'zip-row',
          sorter: 'zip'
        },
        {
          idx: 7,
          title: 'Phone',
          order: 'ASC',
          style: 'phone-row',
          sorter: 'firstName'
        },
      ]
    })
  };

  getPeoples(){
    $.ajax({
      url: '99-people.json',
      useDefaultXhrHeader: false,
      dataType: 'json',
      cache: false,
      success: function (data){
        this.setState({peoples: data}, function(){
        });
      }.bind(this),
      error: function(xhr, status, err){
        console.log(err);
      }
    })
  };

  handleChangeControl(newControl){
    let controls = this.state.controls;
    let index = newControl.id;
    controls.splice(index, 1);
    controls.push(newControl);
    controls.sort((a,b)=> a.id - b.id);
    this.setState({controls:controls});
  }

  handleAddHeader(newHeader){
    let headers = this.state.headers;
    let index = headers.findIndex(x => x.idx === newHeader.idx);
    headers.splice(index, 1);
    headers.push(newHeader);
    headers.sort((a,b)=> a.idx - b.idx);
    this.setState({headers:headers});
  }

  handleSort(order, sorter){
    let peoples = this.state.peoples;

      if(order === 'DESC'){
        peoples.sort(function(a, b){
          let nameA=a[sorter].toLowerCase(), nameB=b[sorter].toLowerCase();
          if(nameA < nameB) return -1;
          if(nameA > nameB) return 1;
          return 0;
        })
      }
      else if(order === 'ASC'){
        peoples.sort(function(a, b){
          let nameA=a[sorter].toLowerCase(), nameB=b[sorter].toLowerCase();
          if(nameA > nameB) return -1;
          if(nameA < nameB) return 1;
          return 0;
        })
      }
  }
  
  handleDropDown(){
    document.getElementById('drop-down').classList.toggle('show');
  }

  handleChooseLength(newLength){
    let controls = this.state.controls;  
    let oldFirstIndex = controls[3].firstIndex;
    let oldLastIndex = controls[3].lastIndex;
    let oldPageNumber = controls[3].pageNumber
    let oldPageLength = this.state.controls[2].lengths;

    let index = 2;
    controls.splice(index, 1);
    controls.push(newLength);
    controls.sort((a,b) => a.id - b.id);
    this.setState({controls:controls});

    let newPageLength = this.state.controls[2].lengths;
    let newPageNumber;
    let newFirstIndex;
    let newLastIndex;

    if(newPageLength === oldPageLength){
        newPageNumber = oldPageNumber;
        newFirstIndex = oldFirstIndex;
        newLastIndex = oldLastIndex;
    }

    else if(newPageLength > oldPageLength){
      if(oldLastIndex > newPageLength){
        newPageNumber = Math.ceil((oldLastIndex + 1)/newPageLength);
        newFirstIndex = (newPageNumber - 1) * newPageLength;
        newLastIndex = newFirstIndex + newPageLength - 1;
      }
      else if(oldLastIndex < newPageLength){
        newPageNumber = 1;
        newFirstIndex = 0;
        newLastIndex = newPageLength - 1;
      }
    }

    else if(newPageLength < oldPageLength){
      if(oldFirstIndex > newPageLength){
        newPageNumber = Math.ceil(oldFirstIndex/newPageLength);
        newFirstIndex = (newPageNumber - 1) * newPageLength;
        newLastIndex = newFirstIndex + newPageLength - 1;
      }
      else if(oldFirstIndex <= newPageLength){
        newPageNumber = 1;
        newFirstIndex = 0;
        newLastIndex = newPageLength - 1;
      }
    }
    this.setState({newControl:
      {
        id: 3,
        pageNumber: newPageNumber,
        dash: '-',
        pageTotal: Math.ceil(100/this.state.controls[2].lengths),
        style: 'pagination',
        subTitle: 'of',
        subStyle: 'of',
        totalItems: 100,
        totalPagesStyle: 'total-pages',
        firstIndex: newFirstIndex,
        lastIndex: newLastIndex
      }
    }, function(){
      this.handleChangeControl(this.state.newControl);
    })
  }

  componentWillMount(){
    this.getControls();
    this.getHeaders();
    this.getPeoples();
  };

  componentDidMount(){
    this.getPeoples();
  };

  render() {
    return (
      <div className="App">
        <Navigations/>
        <Controls 
          chooseLength={this.handleChooseLength.bind(this)}
          dropDown={this.handleDropDown.bind(this)}
          controls={this.state.controls}
          setControls={this.handleChangeControl.bind(this)}
          />
        <Peoples 
          sort={this.handleSort.bind(this)}
          addHeader={this.handleAddHeader.bind(this)}
          changeControl={this.handleChangeControl.bind(this)}
          headers = {this.state.headers}
          peoples = {this.state.peoples}
          controls={this.state.controls} />
      </div>
    );
  };
}

export default App;
