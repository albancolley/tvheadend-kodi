import React, { Component } from 'react';
import { Button, Table } from 'antd';
//import reqwest from 'reqwest';
import './App.css';


const columns = [{
  title: 'Name',
  dataIndex: 'disp_title',
  key: 'disp_title',
}, {
  title: 'Description',
  dataIndex: 'disp_description',
  key: 'disp_description',
}, {
  title: 'Filename',
  dataIndex: 'filename',
  key: 'filename',
}];


class App extends Component {
  state = {
    data: [],
    pagination: {},
    loading: false,
  };
  


    componentDidMount() {
    fetch('/api/load')
      .then(res => res.json())
      .then((data) => {
		  console.log(data.entries)
      const pagination = { ...this.state.pagination };
      // Read total count from server
      // pagination.total = data.totalCount;
      pagination.total = data.total;
      this.setState({
        loading: false,
        data: data.entries,
        pagination,
      });
    });
  }

  /*
  fetch = (params = {}) => {
    console.log('params:', params);
    this.setState({ loading: true });
    reqwest({
      url: 'http://192.168.1.247:9981/api/dvr/entry/grid_finished',
      method: 'get',
	  crossOrigin: false,
      data: {
        sort: 'disp_title',
        ...params,
      },
      type: 'json',
    }).then((data) => {
      const pagination = { ...this.state.pagination };
      // Read total count from server
      // pagination.total = data.totalCount;
      pagination.total = data.total;
      this.setState({
        loading: false,
        data: data.entries,
        pagination,
      });
    });
  }
  componentDidMount() {
    this.fetch();
  }
  */
  
  render() {
    return (
      <div className="App">
        <Button type="primary">Button</Button>
		<Table dataSource={this.state.data} columns={columns} pagination={this.state.pagination} />
      </div>
    );
  }
}

export default App;