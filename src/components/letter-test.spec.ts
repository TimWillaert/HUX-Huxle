import { describe, expect, test } from 'vitest';
import LetterComponent from './LetterComponent.vue';
import { mount } from '@vue/test-utils';
import { createI18n } from 'vue-i18n';
import english from '../locale/en.json';
import german from '../locale/de.json';
const i18n = createI18n({
  locale: localStorage.getItem('locale') || 'en',
  legacy: false,
  messages: {
    en: english,
    de: german,
  },
});

describe('LetterComponent.vue', () => {
  test('Letter component should render correct letter', () => {
    const wrapper = mount(LetterComponent, {
      global: { plugins: [i18n] },
      propsData: {
        letter: 'A',
        btnColor: 'black',
      },
    });
    const letter = wrapper.find('div');
    expect(letter.text()).toBe('A');
  });
});
