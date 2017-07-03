import React, { Component } from 'react';
import { View, BackAndroid, ScrollView, TextInput, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';

import { initailizePage } from '@actions/globals';

import { Styles, Colors, Images } from '@theme/';
import CommonWidgets from '@components/CommonWidgets';


import Global from '@src/Global';
import Utils from '@src/utils';
import Constants from '@src/constants';
import styles from './styles';

let subContainerKind = 0;

class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstInput: '',
      secondInput: '',
      thirdInput: '',
    };
  }
  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.props.globals.containerKind !== 0) {
        this.props.initailizePage(this.props.globals.containerKind - 1);
      }
      return true;
    });
  }
  rowPressed(item, index) {
    subContainerKind = index;
    if (subContainerKind === 0) {
      this.loadStatisticsData('wayback');
    } else if (subContainerKind === 1) {
      this.loadStatisticsData('hot');
    } else if (subContainerKind === 2) {
      this.loadStatisticsData('cold');
    } else if (subContainerKind === 3) {
      this.loadStatisticsData('recommended');
    } else if (subContainerKind === 4) {
      Global.search = [];
    }
    this.props.initailizePage(1);
  }
  loadStatisticsData(param) {
    this.setState({ isLoading: true });
    fetch(`${Constants.SERVER_URL}${param}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'GET',
    }).then(response => response.json())
    .then((responseData) => {
      if (param === 'wayback') {
        Global.wayback = responseData;
      } else if (param === 'hot') {
        Global.hot = responseData;
      } else if (param === 'cold') {
        Global.cold = responseData;
      } else if (param === 'recommended') {
        Global.recommended = responseData;
      }
      this.setState({ isLoading: false });
    }).catch((err) => {
      console.log(err);
    });
  }
  loadScoreSearch() {
    if (this.state.firstInput === '' && this.state.secondInput === '' && this.state.thirdInput === '') {
      return;
    }
    const firstPath = this.state.firstInput === '' ? '' : `&score[]=${this.state.firstInput}`;
    const secondPath = this.state.secondInput === '' ? '' : `&score[]=${this.state.secondInput}`;
    const thirdPath = this.state.thirdInput === '' ? '' : `&score[]=${this.state.thirdInput}`;
    const searchPath = firstPath + secondPath + thirdPath;

    this.setState({ isLoading: true });
    fetch(`${Constants.SERVER_URL}search?score[]=${searchPath}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'GET',
    }).then(response => response.json())
    .then((responseData) => {
      Global.search = responseData;
      this.setState({ isLoading: false });
    }).catch((err) => {
      console.log(err);
    });
  }
  backButtonPress() {
    this.props.initailizePage(0);
  }
  renderStatistics() {
    return (
      Constants.STATISTICS.map((item, index) => (
        CommonWidgets.renderStatisticsListItem(item, () => this.rowPressed(item, index))
      ))
    );
  }
  render() {
    let bodyView;
    if (Global.tabKind !== 2) {
      bodyView = null;
    } else if (this.props.globals.containerKind === 0) {
      bodyView = (
        <View style={{ flex: 1 }}>
          {this.renderStatistics()}
        </View>
      );
    } else if (this.props.globals.containerKind === 1) {
      if (subContainerKind === 0) {
        bodyView = (
          <View style={{ flex: 1 }}>
            {this.state.isLoading ? CommonWidgets.renderSpinner() :
              CommonWidgets.renderWayback(Utils.convertWaybackData(Global.wayback), () => this.backButtonPress())}
          </View>
        );
      } else if (subContainerKind === 1) {
        bodyView = (
          <View style={{ flex: 1 }}>
            {this.state.isLoading ? CommonWidgets.renderSpinner() :
              CommonWidgets.renderHot(Global.hot, () => this.backButtonPress())}
          </View>
        );
      } else if (subContainerKind === 2) {
        bodyView = (
          <View style={{ flex: 1 }}>
            {this.state.isLoading ? CommonWidgets.renderSpinner() :
              CommonWidgets.renderCold(Global.cold, () => this.backButtonPress())}
          </View>
        );
      } else if (subContainerKind === 3) {
        bodyView = (
          <View style={{ flex: 1 }}>
            {this.state.isLoading ? CommonWidgets.renderSpinner() :
              CommonWidgets.renderRecommend(Global.recommended, () => this.backButtonPress())}
          </View>
        );
      } else if (subContainerKind === 4) {
        bodyView = (
          <View style={{ flex: 1 }}>
            {CommonWidgets.renderStatisticsTitle(I18n.t('NUMBER_SEARCH'), Images.search, () => this.backButtonPress())}
            <View style={[Styles.center, { flexDirection: 'row', backgroundColor: Colors.mainBackgroundColor, padding: 10 }]}>
              <TextInput
                underlineColorAndroid="transparent"
                onChangeText={firstInput => this.setState({ firstInput })}
                value={this.state.firstInput}
                keyboardType="numeric"
                style={styles.inputStyle}
              />
              <TextInput
                underlineColorAndroid="transparent"
                onChangeText={secondInput => this.setState({ secondInput })}
                value={this.state.secondInput}
                keyboardType="numeric"
                style={styles.inputStyle}
              />
              <TextInput
                underlineColorAndroid="transparent"
                onChangeText={thirdInput => this.setState({ thirdInput })}
                value={this.state.thirdInput}
                keyboardType="numeric"
                style={styles.inputStyle}
              />
              <TouchableOpacity onPress={() => this.loadScoreSearch()}><Text>{I18n.t('SEARCH')}</Text></TouchableOpacity>
            </View>
            {Global.search.length === 0 ? (this.state.isLoading ? CommonWidgets.renderSpinner() : null) : (this.state.isLoading ? CommonWidgets.renderSpinner() : CommonWidgets.renderSearchResult(Global.search))}
          </View>
        );
      }
    }
    return (
      <View style={Styles.listContainer}>
        <ScrollView style={[Styles.scrollViewContainer, { backgroundColor: Colors.mainBackgroundColor }]}>
          {bodyView}
        </ScrollView>
      </View>
    );
  }
}

Statistics.propTypes = {
  initailizePage: React.PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    initailizePage: value => dispatch(initailizePage(value)),
  };
}

function mapStateToProps(state) {
  const globals = state.get('globals');
  return { globals };
}

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
