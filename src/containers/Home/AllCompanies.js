import React, { Component } from 'react';
import { View, ScrollView, BackAndroid } from 'react-native';
import { connect } from 'react-redux';

import Modal from 'react-native-simple-modal';
import Calendar from 'react-native-calendar-datepicker';
import Moment from 'moment';

import { initailizePage } from '@actions/globals';


import CommonWidgets from '@components/CommonWidgets';

import Global from '@src/Global';
import Constants from '@src/constants';
import Utils from '@src/utils';

import { Styles, Colors } from '@theme/';
import styles from './styles';

var expiaryDate = new Date();

class AllCompanies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calendarVisible: false,
      curDate: new Date(),
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
    Global.currentCompany = item;
    this.props.initailizePage(1);
  }
  rowPressedDetail(item, index) {
    Global.currentGame = item;
    this.loadScore(true);
    Global.oneCompanyFlag === true ? this.props.initailizePage(1) : this.props.initailizePage(2);
  }
  loadScore(flag) {
    this.setState({ isLoading: true });
    let uriPath = flag ? `${Global.currentGame.id}` :
    `${Global.currentGame.id}&date=${Moment(expiaryDate).format('DD-MM-YYYY')}`;
    fetch(`${Constants.SERVER_URL}sessions?game_id=${uriPath}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'GET',
    }).then(response => response.json())
    .then((responseData) => {
      Global.currentScore = responseData;
      this.setState({ isLoading: false });
    }).catch((err) => {
      console.log(err);
    });
  }
  backCompanyButtonPress() {
    if (this.props.globals.containerKind !== 0) {
      this.props.initailizePage(this.props.globals.containerKind - 1);
    }
  }
  showCalendar() {
    this.setState({ calendarVisible: true });
  }
  hideDatePicker() {
    this.setState({ calendarVisible: false });
  }
  handleDatePicked(date) {
    expiaryDate = date.toDate();
    this.hideDatePicker();
    this.refreshGame();
  }
  refreshGame() {
    this.loadScore(false);
  }
  renderCompanies() {
    return (
      Global.componies.map((item, index) => (
        CommonWidgets.renderCompaniesListItem(item, () => this.rowPressed(item, index))
      ))
    );
  }
  renderGames() {
    return (
      Global.currentCompany === null ? null : Global.currentCompany.games.map((item, index) => (
        CommonWidgets.renderGamesListItem(item, index, () => this.rowPressedDetail(item, index))
      ))
    );
  }

  render() {
    let bodyView;
    if (Global.oneCompanyFlag === true) {
      if (Global.tabKind !== 0) {
        bodyView = null;
      } else if (this.props.globals.containerKind === 0) {
        bodyView = (
          <View style={{ flex: 1 }}>
            {Global.currentCompany === null ? null :
              CommonWidgets.renderCompanyTitle(Global.currentCompany, () => this.backCompanyButtonPress())}
            {this.renderGames()}
            {CommonWidgets.renderDescription(Global.currentCompany.description)}
          </View>
        );
      } else if (this.props.globals.containerKind === 1) {
        bodyView = (
          <View style={{ flex: 1 }}>
            {CommonWidgets.renderGameTitle(Global.currentGame,
              () => this.backCompanyButtonPress(),
              () => this.showCalendar(), () => this.refreshGame())}
            {this.state.isLoading ? CommonWidgets.renderSpinner() :
              CommonWidgets.renderScores(Global.currentGame.mode, Global.currentScore)}
            {this.state.isLoading ? null :
              (!Global.currentScore.show_stats ? null : CommonWidgets.DrawChat(Utils.convertChatData(Global.currentScore.stats)))}
            {CommonWidgets.renderDescription(Global.currentGame.description)}
          </View>
        );
      }
    } else {
      if (Global.tabKind !== 0) {
        bodyView = null;
      } else if (this.props.globals.containerKind === 0) {
        bodyView = (
          <View style={{ flex: 1 }}>
            {this.renderCompanies()}
            {CommonWidgets.renderDescription(Global.description)}
          </View>
        );
      } else if (this.props.globals.containerKind === 1) {
        bodyView = (
          <View style={{ flex: 1 }}>
            {Global.currentCompany === null ? null :
              CommonWidgets.renderCompanyTitle(Global.currentCompany, () => this.backCompanyButtonPress())}
            {this.renderGames()}
            {CommonWidgets.renderDescription(Global.currentCompany.description)}
          </View>
        );
      } else if (this.props.globals.containerKind === 2) {
        bodyView = (
          <View style={{ flex: 1 }}>
            {CommonWidgets.renderGameTitle(Global.currentGame,
              () => this.backCompanyButtonPress(),
              () => this.showCalendar(), () => this.refreshGame())}
            {this.state.isLoading ? CommonWidgets.renderSpinner() :
              CommonWidgets.renderScores(Global.currentGame.mode, Global.currentScore)}
            {this.state.isLoading ? null :
              (!Global.currentScore.show_stats ? null : CommonWidgets.DrawChat(Utils.convertChatData(Global.currentScore.stats)))}
            {CommonWidgets.renderDescription(Global.currentGame.description)}
          </View>
        );
      }
    }
    
    return (
      <View style={Styles.listContainer}>
        <ScrollView style={[Styles.scrollViewContainer, { backgroundColor: Colors.mainBackgroundColor }]}>
          {bodyView}
          <Modal
            open={this.state.calendarVisible}
            offset={0}
            overlayBackground={'rgba(0, 0, 0, 0.75)'}
            animationDuration={200}
            animationTension={40}
            modalDidClose={() => this.hideDatePicker()}
            closeOnTouchOutside
            containerStyle={{
              justifyContent: 'flex-start',
            }}
            modalStyle={{
              backgroundColor: 'transparent',
            }}
          >
            <Calendar
              onChange={date => this.handleDatePicked(date)}
              selected={this.state.curDate}
              minDate={Moment().add(-10, 'years').startOf('day')}
              maxDate={Moment().add(10, 'years').startOf('day')}
              barView={{ backgroundColor: Colors.brandPrimary }}
              dayTodayText={{ backgroundColor: Colors.brandPrimary }}
              daySelectedText={styles.daySelectedText}
              style={styles.calendarStyle}
              barText={styles.barText}
              dayHeaderView={styles.dayHeaderView}
              dayRowView={styles.dayRowView}
              stageView={styles.stageView}
            />
          </Modal>
        </ScrollView>
      </View>
    );
  }
}

AllCompanies.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(AllCompanies);
