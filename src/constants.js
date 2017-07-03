import I18n from 'react-native-i18n';
import { Images } from '@theme';

const constants = {
  // main server url
  // Dominicana App - http://loteriadominicana.com/mobile-api-new/companies
  SERVER_URL: 'https://loteriasdominicanas.com/mobile-api-new/',
  
  // Conectate App - http://www.conectate.com.do/loterias/mobile-api-new/companies
  // SERVER_URL: 'http://www.conectate.com.do/loterias/mobile-api-new/',

  // Honduras - http://loteriasdehonduras.com/mobile-api-new/companies
  // SERVER_URL: 'http://loteriasdehonduras.com/mobile-api-new/',
  
  // QuinielasRD APP - http://quinielasrd.com/mobile-api-new/companies
  // SERVER_URL: 'http://quinielasrd.com/mobile-api-new/',
  
  // Mexico APP - http://loteriasdemexico.com/mobile-api-new/companies
  // SERVER_URL: 'http://loteriasdemexico.com/mobile-api-new/',

  // Tab Setting
  TABS: {
    all_companies: true,
    quinielias: true,
    statistics: true,
  },
  STATISTICS: [
    { id: 0, name: I18n.t('WAYBACK'), avatar: Images.calendar },
    { id: 1, name: I18n.t('HOT_NUMBERS'), avatar: Images.hot },
    { id: 2, name: I18n.t('COLD_NUMBERS'), avatar: Images.cold },
    { id: 3, name: I18n.t('RECOMMENDED_NUMBERS'), avatar: Images.recommend },
    { id: 4, name: I18n.t('NUMBER_SEARCH'), avatar: Images.search },
  ],
  Nologo: 'https://s3.amazonaws.com/cdn.loterias.com/6a807b5e3bff6b819276d3ff5577b86f.png',
};

export default constants;

