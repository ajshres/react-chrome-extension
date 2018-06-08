import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {
	render() {
		return (<div>{this.props.count}</div>)
	}
}

const mapStateToProps = (state) => {
	return {
		count:state.count || 0
	};
};

export default connect(mapStateToProps)(App);

