import { mount } from 'vue-test-utils'
import PositionData from '@/components/PositionData'
import BaseBadge from '@/components/BaseBadge'
import BaseList from '@/components/BaseList'
import { report } from '@/../test/stubs/report'

describe('PositionData.vue', () => {
  const setup = () => {
    const wrapper = mount(PositionData, {
      propsData: {
        report,
        fetchingReports: false
      }
    })

    return { wrapper }
  }

  it('renders BaseBadge component', () => {
    const { wrapper } = setup()
    expect(wrapper.findAll(BaseBadge)).toHaveLength(1)
  })

  it('renders BaseList component', () => {
    const { wrapper } = setup()
    expect(wrapper.findAll(BaseList)).toHaveLength(1)
  })

  describe('Computed properties', () => {
    it('positonData returns proper data', () => {
      const { wrapper } = setup()

      const expectedResult = [
        {
          title: "Latitude",
          value: "12° 20.3' N",
        }, {
          title: "Longitude",
          value: "012° 20.4' E",
        }
      ]
      expect(wrapper.vm.positionData).toEqual(expectedResult)
    })
  })
})
