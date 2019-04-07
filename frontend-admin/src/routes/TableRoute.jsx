import React, { Component } from 'react';
import DynamicTable from '../components/DynamicTable';

export default class TableRoute extends Component {
  render() {
    return <div style={{ height: '100vh' }}><DynamicTable { ...this.props } /></div>;
  }
}
