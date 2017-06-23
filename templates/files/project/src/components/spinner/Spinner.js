import React, {Component} from 'react';
import LoadingIcon from './Loading.scss';

class Spinner extends Component{
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className ='loading'>Loading&#8230;</div>
		)
	}
};

export default Spinner;
