import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { triggerLogin, formError, clearError } from '../../redux/actions/loginActions';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';



const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  componentDidMount() {
    this.props.dispatch(clearError());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.userName) {
      this.props.history.push('/devices');  //<-- I CHANGED THIS TO SEND THE USER IMMEDIATLY TO THE DEVICES PAGE
    }
  }

  login = (event) => {
    event.preventDefault();

    if (this.state.username === '' || this.state.password === '') {
      this.props.dispatch(formError());
    } else {
      this.props.dispatch(triggerLogin(this.state.username, this.state.password));
    }
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  renderAlert() {
    if (this.props.login.message !== '') {
      return (
        <h2
          className="alert"
          role="alert"
        >
          { this.props.login.message }
        </h2>
      );
    }
    return (<span />);
  }

  render() {
    return (
      <div>
        { this.renderAlert() }
        <form onSubmit={this.login}>
          <h1>Is It Loud In Here?</h1>
          <h2>Login</h2>
          <div className="loginTextField">
            <label htmlFor="username">
              <TextField
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
                label="Username"
                
              />
            </label>
          </div>
          <div className="loginTextField">
            <label htmlFor="password">
              <TextField
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
                label="Password"
              />
            </label>
          </div>
          <div>
            <div className="loginButton" >
              <Button type="submit" 
                      name="submit" 
                      value="Log In"
                      fullWidth={true}
                      >
                      Submit
              </Button>
            </div>
            <div className="loginButton">
              <Button component={Link} 
                      to="/register"
                      fullWidth={true}>
                Register
              </Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps)(LoginPage);
