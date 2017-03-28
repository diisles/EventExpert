
// https://www.eventbriteapi.com/v3/users/me/?token=SESXYS4X3FJ5LHZRWGKQ

import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  ListView,
  Image
} from 'react-native';

const API_KEY = 'Y5LQMZVKPDJFDK444JRQ';
const ROOT_URL = 'https://www.eventbriteapi.com/v3/events/search/';
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

module.exports = React.createClass({
  getInitialState() {
    return ({
      dataSource: ds.cloneWithRows([
        {
          name: {
            text: 'Event 1'
          },
          url: 'www.eventone.com'
        }
      ]),
      eventType: '',
      city: ''
    });
  },

  componentWillMount() {
    this.searchEvents('hackathon', 'San Francisco');
  },

  searchEvents(category, city) {
    // This is the vanilla javascript way of doing this FETCH_URL. Bellow it, is the ES6 way.

    // const FETCH_URL = ROOT_URL + '?token=' + API_KEY + '&q=' + category + '&location.address=' + city + '/';

    const FETCH_URL = `${ROOT_URL}?token=${API_KEY}&q=${category}&location.address=${city}/`;

    return fetch(FETCH_URL, {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJSON) => {
      console.log('responseJSON', responseJSON);
      this.setState({ dataSource: ds.cloneWithRows(responseJSON.events) });
})
    .catch((error) => {
      console.error(error);
    });
  },

  renderRow(rowData) {
    const defaultImg = 'https://cdn.pixabay.com/photo/2017/03/18/09/01/question-mark-2153514__340.jpg';

    let img = rowData.logo != null ? rowData.logo.url : defaultImg;

    return (
      <View style={styles.row}>
        <Image
          style={styles.rowLogo}
          source={{ uri: img }}
        />
        <View style={styles.rowDetails}>
        <Text>
          {rowData.name.text.length > 30 ?
            `${rowData.name.text.substring(0, 30)}...` : rowData.name.text
          }
        </Text>
        <Text>
          more details
        </Text>
        </View>
      </View>
    );
  },

  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.title}>
        Event Expert!
      </Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder='kind of event...'
            onChangeText={(text) => this.setState({ eventType: text })}
          />
          <TextInput
            style={styles.input}
            placeholder='city...'
            onChangeText={(text) => this.setState({ city: text })}
          />
        </View>
        <ListView
          style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => this.renderRow(rowData)}
        />
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    flex: 0.5,
    marginTop: 40,
    textAlign: 'center',
    fontSize: 20
  },
  form: {
    flex: 4,
  },
  list: {
    flex: 10,
    height: -20,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    padding: 5
  },
  rowDetails: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowLogo: {
    flex: 1,
    width: 70,
    height: 50,
    borderColor: '#000',
    borderWidth: 1
  },
  input: {
    height: 50,
    borderColor: '#000',
    borderRadius: 5,
    borderWidth: 1,
    margin: 5,
    textAlign: 'center',


  }
});
