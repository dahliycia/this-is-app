import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AppBar, Grid, Tab, Tabs, Typography, MuiThemeProvider, CssBaseline, createMuiTheme } from '@material-ui/core'
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
      main: '#3e3e3e'
    },
    secondary: {
      main: '#4EA6E1'
    }
  },
}

const store = createStore(rootReducer);

const TAB_MAP = {
  '/': {
    name: "Thoughts",
    icon: <Feedback />
  },
  '/photos': {
    name: "Photos",
    icon: <Photo />
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    const selectedTab = Object.keys(TAB_MAP).indexOf(window.location.pathname)
    this.state = {
      selectedTab: selectedTab
    }
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
                  <Grid container spacing={6} alignItems="center" style={{paddingLeft: "20px"}}>
                    <Grid item>
                      <Typography variant="h5">This is an app</Typography>
                    </Grid>
                    <Grid item>
                      <Tabs value={selectedTab} onChange={this.handleChange}>
                        {Object.keys(TAB_MAP).map(tabUrl => (
                          <Tab key={tabUrl} icon={TAB_MAP[tabUrl].icon} component={Link} to={tabUrl} />
                        )) }
                      </Tabs>
                    </Grid>
                  </Grid>
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
