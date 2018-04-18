import axios from 'axios'
import moxios from 'moxios'
import sinon from 'sinon'
import { equal, ok } from 'assert'
import actions from '@/store/modules/vessels/actions'
import { firstVessel, secondVessel } from '@/../test/stubs/vessel'

describe('vessels actions', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  test('fetchVessels calls commit with STORE_VESSEL and the fetched userVessels', async() => {
    moxios.stubRequest('/vessels.json?orderBy="owner"&equalTo="1"', {
      status: 200,
      response: {
        "-L2sqMuqy29K5adoAZdT": firstVessel
      }
    })

    const context = {
      commit: jest.fn(),
    }

    await actions.fetchVessels(context, 1)
    expect(context.commit).toHaveBeenCalledWith('STORE_VESSEL', [ firstVessel ])
  })

  test('editVessel doesn\'t make a call when no idToken', async() => {
    const onFulfilled = sinon.spy()
    axios.get('/vessels/1.json?auth=undefined').then(onFulfilled)

    const vesselData = {
      id: 1
    }

    const context = {
      getters: {
        idToken: undefined
      }
    }

    await actions.editVessel(context, vesselData)
    ok(onFulfilled.notCalled)
  })

  test('editVessel calls API and gets a proper response when idToken is valid', async() => {
    const onFulfilled = sinon.spy()
    axios.get('/vessels/1.json?auth=999').then(onFulfilled)

    const vesselData = {
      id: 1
    }

    moxios.stubRequest('/vessels/1.json?auth=999', {
      status: 200,
      response: vesselData
    })

    const context = {
      getters: {
        idToken: 999
      }
    }

    router: {
      push: jest.fn()
    }

    await actions.editVessel(context, vesselData)
    equal(onFulfilled.getCall(0).args[0].data, vesselData)
  })
})
