/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GraduateProfile, GuestbookMessage, PoemPreset } from './types';

export const DEFAULT_GRADUATE: GraduateProfile = {
  name: 'Khadar Cabdi Yuusuf',
  schoolName: 'Dugsiga Sare ee Ifye',
  graduationYear: 2026,
  gpa: '3.94 / 4.0',
  honors: 'Ardayga Sanadka ee Sayniska & Teknolojiyadda (Excellent Honors)',
  photoUrl: '/src/assets/images/graduate_portrait_1782386813752.jpg',
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

export const DEFAULT_MESSAGES: GuestbookMessage[] = [
  {
    id: 'msg-1',
    senderName: 'Hooyo & Aabbe',
    relationship: 'family',
    message: 'Hambalyo wiilkaygii qaaliga ahaa! Aad iyo aad ayaan kuugu fakhreynaa maanta. Jidka aqoonta ee aad qaadday Ilaahay ha kuu barakeeyo, guulo kale oo waaweynna ha kuu soo hooyo.',
    badge: '👑 Duco',
    likes: 12,
    createdAt: '2 saac ka hor'
  },
  {
    id: 'msg-2',
    senderName: 'Cali Cabdi (Walaalkaa)',
    relationship: 'family',
    message: 'Bro, run ahaantii waad mudnayd guushan! Habeenadii aad soo jeedday iyo dadaalkaadii maanta ayay dhalalaqeen. Jaamacadda dhexdeeda ayaan kugu sugeynaa!',
    badge: '🎓 Geesi',
    likes: 8,
    createdAt: '4 saac ka hor'
  },
  {
    id: 'msg-3',
    senderName: 'Macallin Maxamed Cilmi',
    relationship: 'teacher',
    message: 'Khadar wuxuu ahaa mid ka mid ah ardaydii ugu dadaalka iyo asluubta badnayd ee aan wax u baray. Hambalyo qalin-jabintaada, waxaan kuu rajaynayaa inaad noqoto mid dalka iyo dadkaba anfacda.',
    badge: '📚 Caaqil',
    likes: 15,
    createdAt: '1 maalin ka hor'
  },
  {
    id: 'msg-4',
    senderName: 'Ayaan Daahir (Saaxiibkaaga)',
    relationship: 'friend',
    message: 'Hambalyo saaxiib! Guul weyn oo taariikhi ah ayaad gaadhay. Dabaal-degga caawa isku diyaarso, we did it!',
    badge: '🌟 Xiddig',
    likes: 6,
    createdAt: '1 maalin ka hor'
  }
];

export const BADGE_PRESETS = [
  { emoji: '🎓', label: 'Aqoonyahan' },
  { emoji: '🌟', label: 'Xiddig' },
  { emoji: '👑', label: 'Duco' },
  { emoji: '🔥', label: 'Guuleyste' },
  { emoji: '❤️', label: 'Jacayl' },
  { emoji: '🎉', label: 'Dabaaldeg' }
];
