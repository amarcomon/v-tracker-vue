import { shallow, createLocalVue } from 'vue-test-utils'
import VesselDashboard from '@/components/VesselDashboard.vue'
import VesselDashboardGoogleMap from '@/components/VesselDashboardGoogleMap.vue'
import WeatherData from '@/components/WeatherData.vue'
import PositionData from '@/components/PositionData.vue'
import NavigationData from '@/components/NavigationData.vue'
import RemainingOnBoard from '@/components/RemainingOnBoard.vue'
import ReportSelector from '@/components/ReportSelector'
import Vuex from 'vuex'
import moment from 'moment'
import VueMomentJS from 'vue-momentjs'
import { report, secondReport } from '@/../test/stubs/report'

describe('VesselDashboard.vue', () => {
  const setup = () => {
    const getters = {
      sidebarVisible: jest.fn(),
      selectedReport: jest.fn(),
      fetchingReports: jest.fn(),
      sortedReports: jest.fn(),
      reports: jest.fn()
    }

    getters.sidebarVisible.mockReturnValue(true)
    getters.fetchingReports.mockReturnValue(false)
    getters.sortedReports.mockReturnValue([secondReport, report])
    getters.reports.mockReturnValue([secondReport, report])
    getters.selectedReport.mockReturnValue(secondReport)

    const localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.use(VueMomentJS, moment)

    const store = new Vuex.Store({
      state: {},
      getters
    })

    const wrapper = shallow(VesselDashboard, {
      localVue,
      store
    })

    return { wrapper }
  }

  test('renders not full width dashboard', () => {
    const { wrapper } = setup()
    expect(wrapper.find('[data-test-vessel-dashboard]').classes()).not.toContain('vessel-dashboard--full-width')
  })

  test('renders proper report month', () => {
    const { wrapper } = setup()
    expect(wrapper.find('[data-test-vessel-dashboard-report-date]').text()).toContain('April 2018')
  })

  test('renders ReportSelector component', () => {
    const { wrapper } = setup()
    expect(wrapper.findAll(ReportSelector)).toHaveLength(1)
  })

  test('renders GoogleMap component', () => {
    const { wrapper } = setup()
    expect(wrapper.findAll(VesselDashboardGoogleMap)).toHaveLength(1)
  })

  test('renders PositionData component', () => {
    const { wrapper } = setup()
    expect(wrapper.findAll(PositionData)).toHaveLength(1)
  })

  test('renders NavigationData component', () => {
    const { wrapper } = setup()
    expect(wrapper.findAll(NavigationData)).toHaveLength(1)
  })

  test('renders WeatherData component', () => {
    const { wrapper } = setup()
    expect(wrapper.findAll(WeatherData)).toHaveLength(1)
  })

  test('renders RemainingOnBoard component', () => {
    const { wrapper } = setup()
    expect(wrapper.findAll(RemainingOnBoard)).toHaveLength(1)
  })

  describe('Computed properties', () => {
    it('previousReport returns proper report', () => {
      const { wrapper } = setup()
      expect(wrapper.vm.previousReport).toEqual(report)
    })

    describe('distanceMadeSinceLastReport returns proper value', () => {
      const { wrapper } = setup()

      it('returns properly calculated distance when previuosReport exist', () => {
        expect(wrapper.vm.distanceMadeSinceLastReport).toEqual(1447)
      })

      it('returns early when previuosReport does not exist', () => {
        wrapper.setComputed({ previousReport: undefined })
        expect(wrapper.vm.distanceMadeSinceLastReport).toEqual(0)
      })
    })
  })
})
