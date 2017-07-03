import { StyleSheet, Platform } from 'react-native';
import { Styles, Fonts, Colors, Metrics } from '@theme/';

export default StyleSheet.create({
  daySelectedText: {
    fontWeight: 'bold',
    backgroundColor: Colors.mainBackgroundColor,
    color: Colors.titleColor,
    borderColor: Colors.mainBackgroundColor,
    borderRadius: 15,
    overflow: 'hidden',
  },
  calendarStyle: {
    borderWidth: 1,
    backgroundColor: Colors.mainBackgroundColor,
    borderColor: Colors.parentItemColor,
    borderRadius: 5,
  },
  barText: {
    fontWeight: 'bold',
    color: Colors.titleColor,
  },
  dayHeaderView: {
    backgroundColor: Colors.mainBackgroundColor,
    borderBottomColor: Colors.parentItemColor,
  },
  dayRowView: {
    borderColor: Colors.mainBackgroundColor,
    height: 40,
  },
  stageView: {
    padding: 0,
  },
  inputStyle: {
    width: Metrics.screenWidth * 0.15,
    height: Metrics.screenWidth * 0.1,
    margin: 5,
    paddingTop: Platform.OS === 'android' ? 6 : 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    textAlign: 'center',
  },
});
