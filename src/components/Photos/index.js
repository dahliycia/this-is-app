import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GridList, GridListTile, GridListTileBar, ListSubheader, withStyles } from '@material-ui/core';

import { infoFetched } from './duck';
import getData from '../../fetch';


const PHOTOS_NUMBER = 9;

const styles = {
  root: {
    padding: "20px",
  },
  gridList: {
    paddingLeft: "20%",
    paddingRight: "20%",
    width: "100%",
  },
}

class Photos extends React.Component {
  static propTypes = {
    photos: PropTypes.array
  }

  fetchPhotosInfo = async (url) => {
    const items = await getData(url).then(result => result.items || [])
    this.props.dispatch(infoFetched(items.slice(0, PHOTOS_NUMBER)));
  }
  
  componentDidMount = async () => {
    const url = 'https://www.flickr.com/services/feeds/photos_public.gne?tags=marilynmonroe&format=json&nojsoncallback=?';
    await this.fetchPhotosInfo(url)
  }

  handleClose = () => {
    this.setState({open: false})
  }

  onPhotoClick = index => () => {
    const { photos } = this.props;
    const openImage = photos[index] || {};
    const link = openImage.link;
    if (link)
      window.open(link)
  }

  render () {
    const { classes, photos } = this.props;

    return (
      <div className={classes.root}>
        <GridList cellHeight={200} className={classes.gridList} cols={3}>
          <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }}>
            <ListSubheader component="div">Marilyn Monroe</ListSubheader>
          </GridListTile>
          {photos.map((item, index) => (
            <GridListTile key={item.link} onClick={this.onPhotoClick(index)}>
            <img src={item.media.m} alt={item.title} />
            <GridListTileBar
              title={item.title}
              subtitle={<span>by: {item.author}</span>}
            />
          </GridListTile>
          ))}
        </GridList>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state.photos;
}

export default connect(mapStateToProps)(withStyles(styles)(Photos));