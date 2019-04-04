import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';

class App extends React.Component {

  constructor(props){
    super(props);

    //only time we do direct assignment to state
    this.state = {lat: null, errorMessage: ''};

  };

  componentDidMount(){
    window.navigator.geolocation.getCurrentPosition(
      // Callback for position;
      (position) => this.setState({lat: position.coords.latitude}),
      (err) => this.setState({errorMessage: err.message})
    );
  }

  render() {

    if(this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>
    }

    if(!this.state.errorMessage && this.state.lat) {
      return <div><SeasonDisplay latitude={this.state.lat}/></div>
    }

    return <div> Loading </div>
    /*
    return (
      <div><SeasonDisplay/>
      Latitude: {this.state.lat} <br/>
      Error: {this.state.errorMessage}</div>
    );
    */
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
