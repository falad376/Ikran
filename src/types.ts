/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface GraduateProfile {
  name: string;
  schoolName: string;
  graduationYear: number;
  gpa: string;
  honors: string;
  photoUrl: string;
  motto: string;
}

export interface GuestbookMessage {
  id: string;
  senderName: string;
  relationship: 'family' | 'friend' | 'teacher' | 'other';
  message: string;
  badge?: string;
  likes: number;
  createdAt: string;
}

export interface PoemPreset {
  id: string;
  title: string;
  content: string;
  author: string;
}
