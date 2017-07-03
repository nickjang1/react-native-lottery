import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';

import { replaceRoute } from '@actions/route';
import { Styles, Fonts } from '@theme/';
import CommonWidgets from '@components/CommonWidgets';

import Global from '@src/Global';
import Constants from '@src/constants';
import { Colors } from '@theme/';

class Splash extends Component {
  componentDidMount() {
    this.loadData();
  }
  loadData() {
    if (Constants.TABS.all_companies === true ) {
      Global.tabIndex.push(0);
    }
    if (Constants.TABS.quinielias === true ) {
      Global.tabIndex.push(1);
    }
    if (Constants.TABS.statistics === true ) {
      Global.tabIndex.push(2);
    }

    Global.tabKind = Global.tabIndex[0];

    this.setState({ isLoading: true });
    fetch(`${Constants.SERVER_URL}companies`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'GET',
    }).then(response => response.json())
    .then((responseData) => {

      Global.componies = responseData.companies;
      Global.description = responseData.description;

      if (Global.componies.length === 1) {
        Global.currentCompany = Global.componies[0];
        Global.oneCompanyFlag = true;
      }
      setTimeout(() => {
        for (let i = 0; i < Global.componies.length; i++) {
          for (let j = 0; j < Global.componies[i].games.length; j++) {
            if (Global.componies[i].games[j].quinielia === true) {
              Global.quinielias.push(Global.componies[i].games[j]);
            }
          }
        }
      }, 500);
      setTimeout(() => {
        this.props.replaceRoute('home');
      }, 1500);
    });
  }

  render() {
    return (
      <View style={[Styles.fullScreen, Styles.center, { backgroundColor: Colors.splashColor }]}>
        {CommonWidgets.renderStatusBar(Colors.splashColor)}
        <Text style={[Fonts.style.h1, { color: Colors.headTextColor }]}>{I18n.t('APP_NAME')}</Text>
      </View>
    );
  }
}

Splash.propTypes = {
  replaceRoute: React.PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    replaceRoute: route => dispatch(replaceRoute(route)),
  };
}
function mapStateToProps(state) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(Splash);
