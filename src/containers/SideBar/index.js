import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeDrawer } from '@actions/drawer';
import { View, ScrollView } from 'react-native';
import { Metrics, Images, Colors } from '@theme';
import CommonWidgets from '@components/CommonWidgets';

class SideBar extends Component {
  rowPressed() {
    this.props.closeDrawer();
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.brandPrimary }}>
        <ScrollView>
          <View style={{height: 25, justifyContent: 'flex-end', backgroundColor: 'black'}}>
          </View>
          {CommonWidgets.renderSideBarSubTitleLogo('Loterias Dominicanas')}        
          {CommonWidgets.renderSideBarItem(Images.company1, 'Loteria Nacional', () => this.rowPressed())}
          {CommonWidgets.renderSideBarItem(Images.company2, 'Leidsa',  () => this.rowPressed())}
          {CommonWidgets.renderSideBarItem(Images.company3, 'Loteka', () => this.rowPressed())}
          {CommonWidgets.renderSideBarSubTitle('Quienelas')}
          {CommonWidgets.renderSideBarItem(Images.game, 'Loteria Nacional', () => this.rowPressed())}
          {CommonWidgets.renderSideBarItem(Images.game, 'Gana Mas',  () => this.rowPressed())}
          {CommonWidgets.renderSideBarItem(Images.game, 'Pega 3 Mas', () => this.rowPressed())}
          {CommonWidgets.renderSideBarItem(Images.game, 'Loto Pool', () => this.rowPressed())}
          {CommonWidgets.renderSideBarSubTitle('Statistics')}
          {CommonWidgets.renderSideBarItem(Images.calendar, 'Años Anteriores', () => this.rowPressed())}
          {CommonWidgets.renderSideBarItem(Images.hot, 'Números Calientes',  () => this.rowPressed())}
          {CommonWidgets.renderSideBarItem(Images.cold, 'Cold', () => this.rowPressed())}
          {CommonWidgets.renderSideBarItem(Images.recommend, 'Recommended', () => this.rowPressed())}
          {CommonWidgets.renderSideBarItem(Images.search, 'Search', () => this.rowPressed())}
        </ScrollView>
      </View>
    );
  }
}

SideBar.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  replaceRoute: React.PropTypes.func.isRequired,
  closeDrawer: React.PropTypes.func.isRequired,
  setSpinnerVisible: React.PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    replaceRoute: route => dispatch(replaceRoute(route)),
    closeDrawer: () => dispatch(closeDrawer()),
    setSpinnerVisible: spinnerVisible => dispatch(setSpinnerVisible(spinnerVisible)),
  };
}
function mapStateToProps(state) {
  const globals = state.get('globals');
  return { globals };
}
export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
