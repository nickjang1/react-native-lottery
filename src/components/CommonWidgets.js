import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  Image,
  TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import HTMLView from 'react-native-htmlview';
import I18n from 'react-native-i18n';
import { Bar } from 'react-native-pathjs-charts';
import Moment from 'moment';

import { Metrics, Styles, Colors, Fonts, Images } from '@theme/';

import Wayback from '@components/Wayback';
import Constants from '@src/constants';


import styles from './styles';

const stylesHtml = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  p: {
    fontWeight: '300',
    color: Colors.titleColor,
  },
});

const CommonWidgets = {
  renderStatusBar(color) {
    return (
      <StatusBar
        backgroundColor={color}
        barStyle={'dark-content'}
        translucent
      />
    );
  },
  renderNavBarHeader() {
    return (
      <View style={[Styles.center, { flexDirection: 'row' }]}>
        <Image
          source={Images.logo}
          style={{ width: Metrics.screenWidth * 0.15, height: Metrics.screenWidth * 0.07, marginRight: 5 }} resizeMode={'stretch'} />
        <Text style={[Fonts.style.h4, { color: Colors.headTextColor }]}>{I18n.t('APP_NAME')}</Text>
      </View>
    );
  },
  renderSidebarHeader() {
    return (
      <View style={Styles.center}>
        <Image source={Images.sidebarLogo} style={{ width: Metrics.screenWidth * 0.4, height: Metrics.screenWidth * 0.08 }} resizeMode={'stretch'} />
      </View>
    );
  },
  renderSpacer(count) {
    return (
      <View style={{ height: (Metrics.screenHeight / 40) * count }} />
    );
  },

  renderAddButton(text, color, onPress) {
    return (
      <TouchableOpacity
        style={[Styles.center,
          { width: Metrics.screenWidth * 0.15, backgroundColor: color, position: 'absolute', right: 0, bottom: 0, borderRadius: 3 }]}
        backgroundColor={color}
        onPress={onPress}>
        <Text style={[Fonts.style.h6, { color: Colors.textPrimary }]}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  },
  renderCloseButton(onPress) {
    return (
      <TouchableOpacity
        style={{ position: 'absolute', left: 20, top: Platform.OS === 'android' ? 25 : 30 }}
        onPress={onPress}>
        <Icon name="times" size={20} color={Colors.textPrimary} />
      </TouchableOpacity>
    );
  },
  renderNavBarRightButton(onPress) {
    return (
      <TouchableOpacity
        style={{ paddingBottom: Platform.OS === 'android' ? 5 : 5 }}
        onPress={onPress} >
        <Icon name="bars" size={30} color={Colors.textPrimary} />
      </TouchableOpacity>
    );
  },

  renderForwardIcon() {
    return (
      <View style={styles.forwardIconContainer}>
        <Icon
          style={{ marginTop: 5 }}
          name={'chevron-right'}
          size={20}
          color={Colors.dateTimeColor}
        />
      </View>
    );
  },

  renderDescription(description) {
    return (
      <View style={{ margin: 15, padding: 10, backgroundColor: Colors.descriptionBackground }}>
        <HTMLView
          value={description}
          stylesheet={stylesHtml}
        />
      </View>
    );
  },
  renderCompaniesListItem(item, onPress) {
    return (
      <TouchableOpacity
        key={item.id}
        style={Styles.listItemContainer}
        onPress={onPress}>
        <View style={[Styles.horzCenter, { backgroundColor: Colors.parentItemColor, borderBottomWidth: 1, borderColor: Colors.bottomBorder }]}>
          <View style={[Styles.horzCenter, { flex: 10 }]}>
            <View style={[Styles.center, { flex: 4 }]}>
              <Image
                source={{ uri: item.logo === null ? Constants.Nologo : item.logo }}
                style={{ width: Metrics.screenWidth * 0.25, height: Metrics.screenWidth * 0.15 }} resizeMode={'contain'} />
            </View>
            <View style={{ flex: 9 }}>
              <Text style={[Fonts.style.listItemTitleText, { color: Colors.titleColor }]} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={[Fonts.style.listItemDescriptionText, { color: Colors.titleColor }]} numberOfLines={1}>
                {`${item.games.length} Sorteos`}
              </Text>
              <Text style={[Fonts.style.listItemDateText, { color: Colors.dateTimeColor }]} numberOfLines={1}>
                {item.updated_at}
              </Text>
            </View>
          </View>
          {this.renderForwardIcon()}
        </View>
      </TouchableOpacity>
    );
  },
  renderCompanyTitle(company, onPress) {
    return (
      <TouchableOpacity
        key={company.id}
        backgroundColor={Colors.parentItemColor}
        onPress={onPress}>
        <View style={[Styles.horzCenter, { flex: 1, backgroundColor: Colors.parentItemColor, borderColor: Colors.bottomBorder, borderBottomWidth: 0.5 }]}>
          <View style={[Styles.center, { flex: 5 }]}>
            <Image
              source={{ uri: company.logo === null ? Constants.Nologo : company.logo }}
              style={{ width: Metrics.screenWidth * 0.3, height: Metrics.screenWidth * 0.15 }} resizeMode={'contain'} />
          </View>
          <View style={{ flex: 9 }}>
            <Text style={[Fonts.style.companyTitleText, { color: Colors.titleColor }]} numberOfLines={1}>
              {`${company.title} - ${company.games.length} ${I18n.t('GAME')}`}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  },
  renderGamesListItem(item, index, onPress) {
    return (
      <TouchableOpacity
        key={index}
        style={Styles.listItemContainer}
        backgroundColor={Colors.subItemColor}
        onPress={onPress}>
        <View style={[Styles.horzCenter, { backgroundColor: Colors.subItemColor }]}>
          <View style={[Styles.horzCenter, { flex: 10 }]}>
            <View style={[Styles.center, { flex: 4 }]}>
              <Image
                source={{ uri: item.logo === null ? Constants.Nologo : item.logo }}
                style={{ width: Metrics.screenWidth * 0.25, height: Metrics.screenWidth * 0.15 }} resizeMode={'contain'} />
            </View>
            <View style={{ flex: 9 }}>
              <Text style={[Fonts.style.listItemTitleText, { color: Colors.titleColor }]} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={[Fonts.style.listItemDescriptionText, { color: Colors.dateTimeColor }]} numberOfLines={1}>
                {item.updated_at}
              </Text>
            </View>
          </View>
          {this.renderForwardIcon()}
        </View>
      </TouchableOpacity>
    );
  },

  renderGameTitle(game, onBackPress, onPress1, onPress2) {
    return (
      <View style={{ flexDirection: 'row', backgroundColor: Colors.parentItemColor, padding: 2, borderColor: Colors.brandPrimary, borderBottomWidth: 0.5 }}>
        <TouchableOpacity
          key={game.id}
          style={{ flex: 16, backgroundColor: Colors.parentItemColor }}
          onPress={onBackPress}>
          <View style={[Styles.horzCenter, { flex: 1 }]}>
            <View style={[Styles.center, { flex: 6 }]}>
              <Image
                source={{ uri: game.logo === null ? Constants.Nologo : game.logo }}
                style={{ width: Metrics.screenWidth * 0.3, height: Metrics.screenWidth * 0.15, padding: 10 }} resizeMode={'contain'} />
            </View>
            <View style={{ flex: 9, marginLeft: 10 }}>
              <Text style={[Fonts.style.companyTitleText, { color: Colors.titleColor }]} numberOfLines={1}>
                {game.title}
              </Text>
              <Text style={[Fonts.style.listItemDateText, { color: Colors.dateTimeColor }]} numberOfLines={1}>
                {game.updated_at}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={[Styles.center, { flex: 5, flexDirection: 'row' }]}>
          <TouchableOpacity
            style={[Styles.center, { margin: 5, width: Metrics.screenWidth * 0.1, height: Metrics.screenWidth * 0.1, borderRadius: 3 }]}
            onPress={onPress1} >
            <Icon name="calendar" size={25} color={Colors.titleColor} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[Styles.center, { margin: 5, marginRight: 10, width: Metrics.screenWidth * 0.1, height: Metrics.screenWidth * 0.1, borderRadius: 3 }]}
            onPress={onPress2} >
            <Icon name="refresh" size={25} color={Colors.titleColor} />
          </TouchableOpacity>
        </View>
      </View>
    );
  },
  renderScore(score, index) {
    let colorState = true;

    const str = score;

    const res = str.replace('+', '');

    if (score.indexOf('+') === -1) {
      colorState = false;
    }
    return (
      <View key={index} style={[Styles.center, { width: Metrics.screenWidth * 0.08, height: Metrics.screenWidth * 0.08, margin: 3, borderRadius: Metrics.screenWidth * 0.04, backgroundColor: colorState ? Colors.bonusBallBackColor : Colors.ballBackColor }]}>
        <Text style={{ color: colorState ? Colors.bonusBallTextColor : Colors.ballTextColor }}>{res}</Text>
      </View>
    );
  },
  renderText(score, index) {
    let colorState = true;

    const str = score;

    const res = str.replace('+', '');

    if (score.indexOf('+') === -1) {
      colorState = false;
    }
    return (
      score === ' ' ? null :
      <Text key={index} style={{ padding: 3, margin: 3, color: colorState ? Colors.bonusBallTextColor : Colors.ballTextColor, backgroundColor: colorState ? Colors.bonusBallBackColor : Colors.ballBackColor }}>{res}</Text>
    );
  },
  renderScores(mode, data) {
    const todayDate = new Date();
    const same = data.date !== Moment(todayDate).format('DD-MM-YYYY');
    let scoreView;
    if (mode === 'text') {
      scoreView = data.score.map((item, index) => (
        <View key={index} style={{ flexDirection: 'row', marginTop: 10 }}>
          {item.map((subitem, subindex) => (
            this.renderText(subitem, subindex)
          ))}
        </View>
      ));
    } else {
      scoreView = data.score.map((item, index) => (
        <View key={index} style={{ flexDirection: 'row', marginTop: 10 }}>
          {item.map((subitem, subindex) => (
            this.renderScore(subitem, subindex)
          ))}
        </View>
      ));
    }
    return (
      <View style={[{ backgroundColor: Colors.subItemColor, borderColor: Colors.brandThird, borderBottomWidth: 0.5, padding: 10 }]}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[Fonts.style.dateBoldText, { backgroundColor: same ? Colors.inactiveDateColor : Colors.activeDateColor, color: Colors.dateTextColor, paddingHorizontal: 5, borderRadius: 5 }]}>
            {data.date}
          </Text>
          <View style={{ flex: 1 }} />
        </View>
        {scoreView}
      </View>
    );
  },
  renderStatisticsListItem(item, onPress) {
    return (
      <TouchableOpacity
        key={item.id}
        style={Styles.listItemContainer}
        onPress={onPress}>
        <View style={[Styles.horzCenter, { backgroundColor: Colors.parentItemColor, borderBottomWidth: 1, borderColor: Colors.bottomBorder }]}>
          <View style={[Styles.horzCenter, { flex: 10 }]}>
            <View style={[Styles.center, { flex: 2, padding: 10 }]}>
              <Image source={item.avatar} style={{ width: Metrics.screenWidth * 0.15 - 20, height: Metrics.screenWidth * 0.15 - 20 }} resizeMode={'stretch'} />
            </View>
            <View style={{ flex: 9 }}>
              <Text style={[Fonts.style.listItemTitleText, { color: Colors.titleColor }]} numberOfLines={1}>
                {item.name}
              </Text>
            </View>
          </View>
          {this.renderForwardIcon()}
        </View>
      </TouchableOpacity>
    );
  },
  renderWaybackScore(data, index) {
    return (
      <View key={index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: Colors.subItemColor }}>
        <Image source={{ uri: data.game_logo }} style={{ width: Metrics.screenWidth * 0.15, height: Metrics.screenWidth * 0.1 }} resizeMode={'contain'} />
        <Text style={styles.headerText}>{data.game_title}</Text>
        <Text style={styles.headerText}>{data.date}</Text>
        <View style={{ flexDirection: 'row' }}>
          {data.score.map((item, index) => (
            CommonWidgets.renderScore(item, index)
          ))}
        </View>
      </View>
    );
  },
  renderStatisticsTitle(title, image, backPress) {
    return (
      <TouchableOpacity
        key={title}
        style={Styles.listItemContainer}
        onPress={backPress}>
        <View style={[Styles.horzCenter, { backgroundColor: Colors.parentItemColor }]}>
          <View style={[Styles.horzCenter, { flex: 1, padding: 10 }]}>
            <View style={[Styles.center, { flex: 1 }]}>
              <Image
                source={image}
                style={{ width: Metrics.screenWidth * 0.08, height: Metrics.screenWidth * 0.08 }} resizeMode={'stretch'} />
            </View>
            <View style={{ flex: 9 }}>
              <Text style={Fonts.style.listItemTitleText} numberOfLines={1}>
                {title}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  },
  renderWayback(data, backPress) {
    return (
      <View>
        {this.renderStatisticsTitle(I18n.t('WAYBACK'), Images.calendar, backPress)}
        <Wayback data={data} />
      </View>
    );
  },
  renderHotTableTitle() {
    return (
      <View style={[Styles.horzCenter, { backgroundColor: Colors.mainBackgroundColor, padding: 15 }]}>
        <View style={[Styles.center, { flex: 2 }]}><Text style={{ color: Colors.titleColor }}>{I18n.t('RANK')}</Text></View>
        <View style={[Styles.center, { flex: 2 }]}><Text style={{ color: Colors.titleColor }}>{I18n.t('SCORE')}</Text></View>
        <View style={[Styles.center, { flex: 2 }]}><Text style={{ color: Colors.titleColor }}>{I18n.t('COUNT')}</Text></View>
        <View style={[Styles.center, { flex: 3 }]}><Text style={{ color: Colors.titleColor }}>{I18n.t('POSITIONAL')}</Text></View>
      </View>
    );
  },
  renderHotTableRow(data, index) {
    const positionalText = `${data.positional_count[0]},${data.positional_count[1]},${data.positional_count[2]}`;
    return (
      <View key={index} style={[Styles.horzCenter, { backgroundColor: Colors.subItemColor, padding: 5 }]}>
        <View style={[Styles.center, { flex: 2 }]}><Text style={{ color: Colors.titleColor }}>{data.rank}</Text></View>
        <View style={[Styles.center, { flex: 2 }]}>{this.renderScore(data.score)}</View>
        <View style={[Styles.center, { flex: 2 }]}><Text style={{ color: Colors.titleColor }}>{data.total_count}</Text></View>
        <View style={[Styles.center, { flex: 3 }]}><Text style={{ color: Colors.titleColor }}>{positionalText}</Text></View>
      </View>
    );
  },
  renderHot(data, backPress) {
    return (
      <View>
        {this.renderStatisticsTitle(I18n.t('HOT_NUMBERS'), Images.hot, backPress)}
        {this.renderHotTableTitle()}
        {data.map((item, index) => (
          CommonWidgets.renderHotTableRow(item, index)
        ))}
      </View>
    );
  },
  renderCold(data, backPress) {
    return (
      <View>
        {this.renderStatisticsTitle(I18n.t('COLD_NUMBERS'), Images.cold, backPress)}
        {this.renderHotTableTitle()}
        {data.map((item, index) => (
          CommonWidgets.renderHotTableRow(item, index)
        ))}
      </View>
    );
  },
  renderRecommendSubTitle(text) {
    return (
      <View style={[Styles.center, { backgroundColor: Colors.mainBackgroundColor, padding: 15 }]}>
        <Text style={{ color: Colors.titleColor }}>{text}</Text>
      </View>
    );
  },
  renderRecommendNumbers(data) {
    return (
      <View style={[Styles.center, { flexDirection: 'row', backgroundColor: Colors.subItemColor, padding: 10 }]}>
        {data.map((item, index) => (
          CommonWidgets.renderScore(item, index)
        ))}
      </View>
    );
  },
  renderRecommend(data, backPress) {
    return (
      <View>
        {this.renderStatisticsTitle(I18n.t('RECOMMENDED_NUMBERS'), Images.recommend, backPress)}
        {this.renderRecommendSubTitle(I18n.t('HOT_NUMBERS'))}
        {this.renderRecommendNumbers(data.hot)}
        {this.renderRecommendSubTitle(I18n.t('COLD_NUMBERS'))}
        {this.renderRecommendNumbers(data.cold)}
      </View>
    );
  },

  renderSearchTableTitle() {
    return (
      <View style={[Styles.horzCenter, { backgroundColor: Colors.parentItemColor, padding: 15 }]}>
        <View style={[Styles.center, { flex: 1.5 }]}><Text style={{ color: Colors.titleColor }}>{I18n.t('MATCHES')}</Text></View>
        <View style={[Styles.center, { flex: 2 }]}><Text style={{ color: Colors.titleColor }}>{I18n.t('DATE')}</Text></View>
        <View style={[Styles.center, { flex: 2 }]}><Text style={{ color: Colors.titleColor }}>{I18n.t('GAME')}</Text></View>
        <View style={[Styles.center, { flex: 3 }]}><Text style={{ color: Colors.titleColor }}>{I18n.t('SCORE')}</Text></View>
      </View>
    );
  },
  renderSearchTableRow(item, index) {
    return (
      <View key={index} style={[Styles.horzCenter, { backgroundColor: Colors.subItemColor, padding: 5 }]}>
        <View style={[Styles.center, { flex: 1.5 }]}><Text style={{ color: Colors.titleColor }}>{item.matches}</Text></View>
        <View style={[Styles.center, { flex: 2 }]}><Text style={{ color: Colors.titleColor }}>{item.date}</Text></View>
        <View style={[Styles.center, { flex: 2 }]}><Text style={{ color: Colors.titleColor }}>{item.game_title}</Text></View>
        <View style={[Styles.center, { flex: 3, flexDirection: 'row' }]}>
          {item.score.map((subitem, subindex) => (
            this.renderScore(subitem, subindex)
          ))}
        </View>
      </View>
    );
  },
  renderSearchTableView(data) {
    return (
      <View style={[{ backgroundColor: Colors.subItemColor, padding: 5 }]}>
        {data.map((item, index) => (
          CommonWidgets.renderSearchTableRow(item, index)
        ))}
      </View>
    );
  },
  renderSearchResult(data) {
    return (
      <View style={[{ backgroundColor: Colors.subItemColor }]}>
        {CommonWidgets.renderSearchTableTitle()}
        {CommonWidgets.renderSearchTableView(data)}
      </View>
    )
  },
  renderSideBarItem(image, title, onPress) {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 10, paddingVertical: 5, backgroundColor: Colors.brandSecondary }}>
          <Image source={image} style={{ width: Metrics.screenWidth * 0.1, height: Metrics.screenWidth * 0.1 }} resizeMode={'contain'} />
          <Text style={[styles.headerText, { marginLeft: 10 }]}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  },
  renderSideBarSubTitle(title) {
    return (
      <View style={{ flexDirection: 'row', height: Metrics.screenWidth * 0.1, padding: 10, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: 'black' }}>
        <Text style={[styles.headerText, { color: 'white' }]}>{title}</Text>
      </View>
    );
  },
  renderSideBarSubTitleLogo(title) {
    return (
      <View style={{ flexDirection: 'row', height: Metrics.screenWidth * 0.1, padding: 10, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: 'black' }}>
        <Text style={[styles.headerText, { color: 'white' }]}>{title}</Text>
        <Image source={Images.logo} style={{ width: Metrics.screenWidth * 0.2, height: Metrics.screenWidth * 0.08 }} resizeMode={'contain'} />
      </View>
    );
  },
  renderSpinner() {
    return (
      <ActivityIndicator style={{ alignSelf: 'center', marginTop: 15 }} color="#00aa00" />
    );
  },

  DrawChat(data) {
    const options = {
      width: Metrics.screenWidth * 0.83,
      height: 100,
      margin: {
        top: 20,
        left: 15,
        bottom: 50,
        right: 20,
      },
      color: '#2980B9',
      gutter: 20,
      animate: {
        type: 'oneByOne',
        duration: 200,
        fillTransition: 3,
      },
      axisX: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'bottom',
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: '#34495E',
        },
      },
      axisY: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'left',
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: '#34495E',
        },
      },
    };

    return (
      <View style={{ margin: 15, marginBottom: 0, padding: 10, backgroundColor: Colors.descriptionBackground }}>
        <Bar data={data} options={options} accessorKey="v" />
      </View>
    );
  },
};


export default CommonWidgets;
