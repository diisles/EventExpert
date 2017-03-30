// https://www.eventbriteapi.com/v3/users/me/?token=SESXYS4X3FJ5LHZRWGKQ

import React, { Component } from 'react';
import {
  Navigator
} from 'react-native';

import Events from './components/events';
import EventDetail from './components/eventDetail';


const routes = {
  events: Events,
  eventDetail: EventDetail
};

module.exports = React.createClass({
  render() {
    return (
      <Navigator
        initialRoute={{ name: 'events' }}
        renderScene={this.renderScene}
      />
    );
  },

  renderScene(route, navigator) {
    let Component = routes[route.name];

    let { title, description, url, img, } = route;

    return (
      <Component
        navigator={navigator}
        title={title}
        description={description}
        url={url}
        img={img}
      />
    );
  }
});
