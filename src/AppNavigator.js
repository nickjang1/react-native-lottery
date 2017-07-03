import React, { Component } from 'react';
import { Platform, Navigator } from 'react-native';
import { connect } from 'react-redux';
import Drawer from 'react-native-drawer';

import { popRoute } from '@actions/route';
import { closeDrawer } from './actions/drawer';

import { Colors } from '@theme/';

import SideBar from '@containers/SideBar';
import Splash from '@containers/Splash';
import Home from '@containers/Home';

import CommonWidgets from '@components/CommonWidgets';

Navigator.prototype.replaceWithAnimation = function (route) {
  const activeLength = this.state.presentedIndex + 1;
  const activeStack = this.state.routeStack.slice(0, activeLength);
  const activeAnimationConfigStack = this.state.sceneConfigStack.slice(0, activeLength);
  const nextStack = activeStack.concat([route]);
  const destIndex = nextStack.length - 1;
  const nextSceneConfig = this.props.configureScene(route, nextStack);
  const nextAnimationConfigStack = activeAnimationConfigStack.concat([nextSceneConfig]);

  const replacedStack = activeStack.slice(0, activeLength - 1).concat([route]);
  this._emitWillFocus(nextStack[destIndex]);
  this.setState({
    routeStack: nextStack,
    sceneConfigStack: nextAnimationConfigStack,
  }, () => {
    this._enableScene(destIndex);
    this._transitionTo(destIndex, nextSceneConfig.defaultTransitionVelocity, null, () => {
      this.immediatelyResetRouteStack(replacedStack);
    });
  });
};

export var globalNav = {};

class AppNavigator extends Component {
  componentDidMount() {
    globalNav.navigator = this._navigator;
  }
  componentDidUpdate() {
    if (this.props.drawerState === 'opened') {
      this.openDrawer();
    }

    if (this.props.drawerState === 'closed') {
      this._drawer.close();
    }
  }
  popRoute() {
    this.props.popRoute();
  }
  openDrawer() {
    this._drawer.open();
  }

  closeDrawer() {
    if (this.props.drawerState === 'opened') {
      this.props.closeDrawer();
    }
  }
  renderScene(route, navigator) {
    switch (route.id) {
      case 'splash':
        return <Splash navigator={navigator} {...route.passProps} />;
      case 'home':
        return <Home navigator={navigator} {...route.passProps} />;
      default :
        return <Home navigator={navigator} {...route.passProps} />;
    }
  }

  render() {
    return (
      <Drawer
        ref={(ref) => { this._drawer = ref; }}
        type="overlay"
        tweenDuration={150}
        content={<SideBar navigator={this._navigator} />}
        tapToClose
        acceptPan={false}
        onClose={() => this.closeDrawer()}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        styles={{
          drawer: {
            shadowColor: '#000000',
            shadowOpacity: 0.8,
            shadowRadius: 3,
          },
        }}
        tweenHandler={(ratio) => {  //eslint-disable-line
          return {
            drawer: { shadowRadius: ratio < 0.2 ? ratio * 5 * 5 : 5 },
            main: {
              opacity: (2 - ratio) / 2,
            },
          };
        }}
        negotiatePan
      >
        <Navigator
          ref={(ref) => { this._navigator = ref; }}
          configureScene={(route) => {
            return Navigator.SceneConfigs.FadeAndroid;
          }}
          initialRoute={{ id: (Platform.OS === 'android') ? 'splash' : 'splash' }}
          renderScene={this.renderScene.bind(this)} />
      </Drawer>
    );
  }
}
AppNavigator.propTypes = {
  popRoute: React.PropTypes.func.isRequired,
  closeDrawer: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    popRoute: () => dispatch(popRoute()),
    closeDrawer: () => dispatch(closeDrawer()),
  };
}

function mapStateToProps(state) {
  const drawerState = state.get('drawer').drawerState;
  return { drawerState };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);
