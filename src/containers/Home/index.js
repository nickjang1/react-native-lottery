import { Text, View, Platform, Image, TouchableHighlight } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DefaultTabBar from '@components/TabBar/DefaultTabBar';
import NavigationBar from 'react-native-navbar';


import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob';

import ScrollableTabView from 'react-native-scrollable-tab-view';

import { setHomeTab, initailizePage } from '@actions/globals';
import { openDrawer } from '@actions/drawer';

import Constants from '@src/constants';
import { Metrics, Styles, Colors, Fonts, Icon } from '@theme/';
import styles from './styles';
import CommonWidgets from '@components/CommonWidgets';
import Global from '@src/Global';

import AllCompanies from './AllCompanies';
import Quinielias from './Quinielias';
import Statistics from './Statistics';

let interstitialCnt = 0;

class Home extends Component {
  componentDidMount() {
    AdMobRewarded.setTestDeviceID('ca-app-pub-3940256099942544/1033173712');
    AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/1033173712');

    AdMobRewarded.addEventListener('rewardedVideoDidRewardUser',
      (type, amount) => console.log('rewardedVideoDidRewardUser', type, amount),
    );
    AdMobRewarded.addEventListener('rewardedVideoDidLoad',
      () => console.log('rewardedVideoDidLoad'),
    );
    AdMobRewarded.addEventListener('rewardedVideoDidFailToLoad',
      error => console.log('rewardedVideoDidFailToLoad', error),
    );
    AdMobRewarded.addEventListener('rewardedVideoDidOpen',
      () => console.log('rewardedVideoDidOpen'),
    );
    AdMobRewarded.addEventListener('rewardedVideoDidClose',
      () => {
        console.log('rewardedVideoDidClose');
        AdMobRewarded.requestAd(error => error && console.log(error));
      },
    );
    AdMobRewarded.addEventListener('rewardedVideoWillLeaveApplication',
      () => console.log('rewardedVideoWillLeaveApplication'),
    );

    AdMobRewarded.requestAd(error => error && console.log(error));
  }

  componentWillUnmount() {
    AdMobRewarded.removeAllListeners();
  }

  showRewarded() {
    AdMobRewarded.showAd(error => error && console.log(error));
  }
  changeTabState(index) {
    
    interstitialCnt += 1;
    if (interstitialCnt === 5) {
      interstitialCnt = 0;
      this.showRewarded();
    }
    
    Global.tabKind = Global.tabIndex[index.i];

    this.props.initailizePage(0);
  }

  render() {
    return (
      <View style={Styles.listContainer}>
        {CommonWidgets.renderStatusBar(Colors.headerColor)}
        <NavigationBar
          style={Styles.navBarStyle}
          title={CommonWidgets.renderNavBarHeader()}
        />
        <View style={{ height: Metrics.screenHeight - 110, backgroundColor: Colors.mainBackgroundColor }}>
          <ScrollableTabView
            renderTabBar={() => <DefaultTabBar textStyle={Fonts.style.h5} />}
            tabBarUnderlineStyle={{ backgroundColor: Colors.underlineColor }}
            onChangeTab={index => this.changeTabState(index)}
            tabBarTextStyle={Fonts.style.listItemTextDefault} locked >

            {Constants.TABS.all_companies === false ? null : <AllCompanies tabLabel={I18n.t('ALLCOMPANIES')} navigator={this.props.navigator} />}
            {Constants.TABS.quinielias === false ? null : <Quinielias tabLabel={I18n.t('QUINIELIAS')} navigator={this.props.navigator} />}
            {Constants.TABS.statistics === false ? null : <Statistics tabLabel={I18n.t('STATISTICS')} navigator={this.props.navigator} />}

          </ScrollableTabView>
        </View>
        <View style={{backgroundColor: Colors.headerColor }}>
          <AdMobBanner
            style={{ marginLeft: (Metrics.screenWidth - 320) / 2, }}
            bannerSize={'banner'}
            adUnitID="ca-app-pub-8980758856340772/5123022847"
          />
        </View>
        
      </View>
    );
  }
}

Home.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  setHomeTab: React.PropTypes.func.isRequired,
  initailizePage: React.PropTypes.func.isRequired,
  openDrawer: React.PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    setHomeTab: homeTab => dispatch(setHomeTab(homeTab)),
    initailizePage: value => dispatch(initailizePage(value)),
    openDrawer: () => dispatch(openDrawer()),
  };
}
function mapStateToProps(state) {
  const globals = state.get('globals');
  return { globals };
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
