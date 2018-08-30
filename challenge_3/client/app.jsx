class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: null,
      Email: null,
      Password: null,
      'Address Line 1': null,
      'Address Line 2': null,
      City: null,
      State: null,
      'Zip Code': null,
      'Phone Number': null,
      'Credit Card': null,
      'Expiry Date': null,
      CVV: null,
      'Billing Zip Code': null
    };
  }

  clickFirstForm () {
    var x = {
      Name: this.state.Name,
      Email: this.state.Email,
      Password: this.state.Password
    }
    $.post('/form1', x, function(data) {
      console.log('successfully logged form 1')
    });
    document.getElementById('form1').reset()
    
  }
  
  clickSecondForm () {
    var y = {
      'Address Line 1': this.state['Address Line 1'],
      'Address Line 2': this.state['Address Line 2'],
      City: this.state.City,
      State: this.state.State,
      'Zip Code': this.state['Zip Code'],
      'Phone Number': this.state['Phone Number'],
    };
    $.post('/form2', y, function(data) {
      console.log('successfully logged form 2')
    });
    document.getElementById('form2').reset()
  }
  
  clickThirdForm () {
    var z = {
      'Credit Card': this.state['Credit Card'],
      'Expiry Date': this.state['Expiry Date'],
      CVV: this.state.CVV,
      'Billing Zip Code': this.state['Billing Zip Code']
    };
    $.post('/form3', z, function(data) {
      console.log('successfully logged form 3')
    });
    
  }

  onChange(e) {
    this.setState(
      {[e.target.id]: e.target.value}  
    );
  }

  render() {
    return(
    <div> 
        <Form handleChange={this.onChange.bind(this)} clickFirstForm={this.clickFirstForm.bind(this)} clickSecondForm={this.clickSecondForm.bind(this)} clickThirdForm={this.clickThirdForm.bind(this)} app={this.state}/>
    </div>
    );
  }

}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: 'home',
    };
  }

onCheckout() {
  this.setState({
    form: 'first'
  });
}


onFirstForm() {
  this.setState({
    form: 'second'
  });
  this.props.clickFirstForm()
}

onSecondForm() {
  this.setState({
    form: 'third'
  })
  this.props.clickSecondForm()
}

onThirdForm() {
  this.setState({
    form: 'confirm'
  })
  this.props.clickThirdForm()
}


render() {
    if(this.state.form === 'home') {
      return(
        <div>
          <p>Please browse our wares!</p>
          <p>All products have been sourced locally from the closest incubator</p>
          <button id="checkout" onClick={() => this.onCheckout()}>Checkout</button>
        </div>
      );
    }

    if(this.state.form === 'first') {
      return( 
        <form id="form1">
          <span>Name</span><input onChange={this.props.handleChange} id="Name" type="text" placeholder="Name"></input><br></br>
          <span>Email</span><input onChange={this.props.handleChange} id="Email" type="text" placeholder="Email"></input><br></br>
          <span>Password</span><input onChange={this.props.handleChange} id="Password" type="text" placeholder="Address"></input><br></br>
          <button type="button" onClick={() => this.onFirstForm()}>Next</button>
        </form>
      );
    } 

    if(this.state.form === 'second') {
      return( 
        <form id="form2">
          <span>Address Line 1</span><input onChange={this.props.handleChange} id="Address Line 1" type="text" ></input><br></br>
          <span>Address Line 2</span><input onChange={this.props.handleChange} id="Address Line 2" type="text" ></input><br></br>
          <span>City</span><input onChange={this.props.handleChange} id="City" type="text"></input><br></br>
          <span>State</span><input onChange={this.props.handleChange} id="State" type="text"></input>
          <span>Zip</span><input onChange={this.props.handleChange} id="Zip Code" type="text"></input><br></br>
          <span>Phone Number</span><input onChange={this.props.handleChange} id="Phone Number" type="text"></input><br></br>
          <button type="button" onClick={() => this.onSecondForm()}>Next</button>
        </form>
      );
    } 

    if(this.state.form === 'third') {
      return( 
        <form>
          <span>Credit Card #</span><input onChange={this.props.handleChange} id="Credit Card" type="text" ></input><br></br>
          <span>Expiry Date</span><input onChange={this.props.handleChange} id="Expiry Date" type="text" ></input>
          <span>CVV</span><input id="CVV" onChange={this.props.handleChange} type="text"></input><br></br>
          <span>Billing Zip</span><input onChange={this.props.handleChange} id="Billing Zip Code" type="text"></input><br></br>
          <button type="button" onClick={() => this.onThirdForm()}>Next</button>
        </form>
      );
    } 

    if(this.state.form === 'confirm') {
      return (
        <div>
          <h5>Is the following information correct?</h5>
          {_.map(this.props.app, function(val, key) {
               return (<p className="confirmation"><span className="key">{key}</span><span className="val">{val}</span></p>)
            })
          }
                
          <button id="purchase">Purchase</button>
        </div>
      );
    }
  }
}


ReactDOM.render(<App />, document.getElementById('app'));