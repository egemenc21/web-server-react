import { Component } from 'react';

interface HeadingGreetingProps {
  user: {
    firstName: string;
  };
}

interface State {
  name: string;
}

class HeadingGreetingUser extends Component<HeadingGreetingProps, State> {
  constructor(props: HeadingGreetingProps) {
    super(props);
    this.state = {
      name: props.user.firstName,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.value;
    this.setState({ name });
  }

  render() {
    return (
      <div>
        <h1>Hello, {this.state.name}!</h1>
        <input type="text" value={this.state.name} onChange={this.handleInputChange}/>
      </div>
    );
  }
}

export default HeadingGreetingUser;
