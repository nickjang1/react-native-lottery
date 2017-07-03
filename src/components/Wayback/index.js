
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';


import CommonWidgets from '@components/CommonWidgets';
import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Colors, Fonts } from '@theme/';


class Wayback extends Component {
  _renderHeader(section, index, isActive) {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: Colors.mainBackgroundColor, borderBottomWidth: 1, borderColor: Colors.bottomBorder, padding: 10 }}>
        <Text style={[Fonts.style.listItemTitleText, { color: Colors.titleColor }]}>{section.title}</Text>
        <Icon
          style={{ marginTop: 5 }}
          name={isActive ? 'angle-up' : 'angle-down'}
          size={20}
          color={Colors.titleColor}
        />
      </View>
    );
  }

  _renderContent(section, index, isActive) {
    return (
      <View>
        {section.content.map((item, index) => (
          CommonWidgets.renderWaybackScore(item, index)
        ))}
      </View>
    );
  }

  render() {
    return (
      <Accordion
        sections={this.props.data}
        initiallyActiveSection={0}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
      />
    );
  }
}
Wayback.propTypes = {
  onPressTopButton: React.PropTypes.func.isRequired,
  onPressBottomButton: React.PropTypes.func.isRequired,
};
Wayback.defaultProps = {
  onPressTopButton: () => { alert('TopPressed'); },
  onPressBottomButton: () => { alert('BottomPressed'); },
};
function mapStateToProps(state) {
  const globals = state.get('globals');
  return { globals };
}

export default connect(mapStateToProps, null)(Wayback);
