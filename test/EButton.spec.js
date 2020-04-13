import { shallowMount } from '@vue/test-utils'
import EButton from '@/components/EButton'

describe('EButton', () => {
  it('should render the default slot', () => {
    const wrapper = shallowMount(EButton, {
      slots: {
        default: '<div id="default"></div>'
      }
    })

    const defaultSlot = wrapper.find('#default')
    expect(defaultSlot.is('div')).toBe(true)
  })

  it('should render the prepend slot', () => {
    const wrapper = shallowMount(EButton, {
      slots: {
        prepend: `<div id="prepend"></div>`
      }
    })

    const prependSlot = wrapper.find('#prepend')
    expect(prependSlot.is('div')).toBe(true)
  })

  it('should render the append slot', () => {
    const wrapper = shallowMount(EButton, {
      slots: {
        append: `<div id="append"></div>`
      }
    })

    const appendSlot = wrapper.find('#append')
    expect(appendSlot.is('div')).toBe(true)
  })
})
