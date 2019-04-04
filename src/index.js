import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {

  //only time we do direct assignment to state
  state = {lat: null, errorMessage: ''};


  componentDidMount(){
    window.navigator.geolocation.getCurrentPosition(
      // Callback for position;
      (position) => this.setState({lat: position.coords.latitude}),
      (err) => this.setState({errorMessage: err.message})
    );
  }

  renderContent(){
    if(this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>
    }

    if(!this.state.errorMessage && this.state.lat) {
      return <div><SeasonDisplay latitude={this.state.lat}/></div>
    }

    return <Spinner message = "Please accept location request"/>;
  }

  render() {
      return (
        <div className="border red">
          {this.renderContent()}
        </div>
      )

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
