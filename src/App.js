import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AppBar, Tab, Tabs, MuiThemeProvider, CssBaseline, createMuiTheme } from '@material-ui/core'
import { Feedback, Photo } from '@material-ui/icons';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import './App.css';
import Thoughts from './components/Thoughts';
import Photos from './components/Photos';
import rootReducer from './components/reducers';


let theme = {
  palette: {
    type: 'light',
    primary: {
      main: '#85C1E9'
    },
    secondary: {
      main: '#2E86C1'
    }
  },
}

const store = createStore(rootReducer)

class App extends React.Component {
  state = {
    selectedTab: 0
  }

  handleChange = (event, newValue) => {
    this.setState({selectedTab: newValue})
  }

  render () {
    const { selectedTab } = this.state

    return (
        <Provider store={store} className="App">
          <MuiThemeProvider theme={createMuiTheme(theme)} >
            <Router>
              <CssBaseline>
                <AppBar position="static">
                  <Tabs value={selectedTab} onChange={this.handleChange}>
                    <Tab label="Thoughts" icon={<Feedback />} component={Link} to={'/'} />
                    <Tab label="Photos" icon={<Photo />} component={Link} to={'/photos'} />
                  </Tabs>
                </AppBar>
                <Route exact path="/" component={Thoughts} />
                <Route exact path="/photos" component={Photos} />
              </CssBaseline>
            </Router>
          </MuiThemeProvider>
        </Provider>
    );
  }
}

export default App;
