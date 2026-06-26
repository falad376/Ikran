/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GraduateProfile, GuestbookMessage, PoemPreset } from './types';
import original from './assets/images/original.jpg';

export const DEFAULT_GRADUATE: GraduateProfile = {
  name: 'Ikraan Abdi Ali',
  schoolName: 'Dugsi Sare',
  graduationYear: 2026,
  gpa: '',
  honors: '',
  photoUrl: original,
  motto: 'Aqoontu waa iftiinka nolosha iyo furaha barwaaqada mustaqbalka.'
};

export const SOMALI_POEMS: PoemPreset[] = [
  {
    id: 'poem-1',
    title: 'Guusha iyo Garashada',
    content: 'Aqoontu waa siraad baabi’iya gudgudka habeenka,\nwaa garab kuu hiiliya markii dhibku kugu adkaado.\nMaanta oo aad qalin-jabisay waa maalin weyn oo guul ah,\nHambalyo gobanimo leh, mustaqbal ifaya iyo guul waarta!',
    author: 'Hal-abuur Cabdi'
  },
  {
    id: 'poem-2',
    title: 'Buraanburka Hambalyada',
    content: 'Gabdho iyo wiilal midabkoodu guduudan yahay,\nOo dalkeenna guushooda u soo hooyay maanta,\nHambalyo ayaan leenahay, guusha u dabaal-dega,\nAqoonta kor u qaada oo dalka ku adeega!',
    author: 'Hooyo Amina'
  },
  {
    id: 'poem-3',
    title: 'Dardaaran iyo Dhiirigelin',
    content: 'Dugsiga sare waad dhameysay adoo guul weyn keenay,\nWaa bilowgii nolosha ee wadada dheer ee aqoonta.\nHirarka kale ee jaamacadda si geesinnimo leh u waajah,\nIlaahayna ha kuu fududeeyo dhabada aad hiigsanayso.',
    author: 'Macallin Maxamed'
  }
];

export const DEFAULT_MESSAGES: GuestbookMessage[] = [];

export const BADGE_PRESETS = [
  { emoji: '🎓', label: 'Aqoonyahan' },
  { emoji: '🌟', label: 'Xiddig' },
  { emoji: '👑', label: 'Duco' },
  { emoji: '🔥', label: 'Guuleyste' },
  { emoji: '❤️', label: 'Jacayl' },
  { emoji: '🎉', label: 'Dabaaldeg' }
];
