import React from 'react';
import './App.css';


import CardGrid from './components/CardGrid';
import Search from './components/Search';

class App extends React.Component {
  constructor () {
    super();
  this.state = {
    searchedUser: '',
    user: {},
    followers: []
  }
}
  // user = 'Tereamarie';
  
  componentDidMount() {
    // api call to my user account
    fetch(`https://api.github.com/users/Tereamarie`)
      .then(res => res.json())
      .then(res => this.setState({ user: res }))
      .catch(err => console.log('Error Occured:', err))
    // api call to my followers
    fetch(`https://api.github.com/users/Tereamarie/followers`)
      .then(res => res.json())
      .then(res => 
        res.map(user => 
          // api call that fetches my followers account information/same info from my account
          fetch(`https://api.github.com/users/${user.login}`)
            .then(res => res.json())
            .then(res => this.setState({followers: [...this.state.followers, res]}))
        )
        // fetch(`https://api.github.com/users/${user}`)
        //   .then(user.map(follower => {
        //     this.setState({followers: follower})
        //   }))
      )
      // .then(res => this.setState({ followers: res }))
      // .then(res => console.log(res))
      // .then(res => res.map((user, followers) => 
      //   this.setState({
      //     followers:  [...this.state.followers, user.login]
      //   })))
      .catch(err => console.log('Followers Error: ', err))
  }

  searchNewUser = e => {
    this.state.followers = []
    e.preventDefault();
    // api call to my user account
    fetch(`https://api.github.com/users/${this.state.searchedUser}`)
      .then(res => res.json())
      .then(res => this.setState({ user: res }))
      .catch(err => console.log('Error Occured:', err))
    // api call to my followers
    fetch(`https://api.github.com/users/${this.state.searchedUser}/followers`)
      .then(res => res.json())
      .then(res => 
        res.map(user => 
          // api call that fetches my followers account information/same info from my account
          fetch(`https://api.github.com/users/${user.login}`)
            .then(res => res.json())
            .then(res => this.setState({
              followers: [...this.state.followers, res]
            }))
        )
      )
      .catch(err => console.log('Followers Error: ', err))
  }
 
  handleChanges = e => {
    this.setState({
      searchedUser: e.target.value
    })
  }
  render() {
    return (
      <div className='App container'>
        <div className='header'>
          <p>Marie's Github CardGrid!!</p>
        </div>
        <Search 
          handleChanges={this.handleChanges}
          searchUser={this.searchNewUser}
          searchResult={this.searchedUser}
        />
        <CardGrid 
          user={this.state.user} 
          followers={this.state.followers}
        />
      </div>
    );
  }
}

export default App;
