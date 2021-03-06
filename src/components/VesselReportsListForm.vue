<template>
  <div class="new-report">
    <VesselReportsListNewStepper
      :selectedStep="selectedStep"
      :isSubmitted="isSubmitted"
      @selectStep="selectStep"
    ></VesselReportsListNewStepper>

    <FormWrapper
      :title="stepTitle"
      size="wide"
      color="blue"
    >
      <form
        class="new-report__form-content"
        slot="content"
        @submit.prevent
      >
        <transition
          name="slide-fade"
          mode="out-in"
        >
          <component
            :is="selectedStep"
            :reportData="newReportData"
            :showErrors="showErrors"
            :isSubmitted="isSubmitted"
            :inProgress="inProgress"
            @nextStep="nextStep"
            @previousStep="previousStep"
            @submit="submit"
          ></component>
        </transition>
      </form>
    </FormWrapper>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import FormWrapper from './FormWrapper.vue'
  import VesselReportsListNewStepper from './VesselReportsListFormStepper.vue'
  import Step1 from './VesselReportsListFormStep1.vue'
  import Step2 from './VesselReportsListFormStep2.vue'
  import Step3 from './VesselReportsListFormStep3.vue'
  import Step4 from './VesselReportsListFormStep4.vue'

  import {
    formatLatForPersistanceLayer,
    formatLngForPersistanceLayer
  } from '../utils/coordinates-utils'

  export default {
    components: {
      FormWrapper,
      VesselReportsListNewStepper,
      Step1,
      Step2,
      Step3,
      Step4
    },

    data () {
      return {
        newReportData: {
          reportTime: '',
          lat: '',
          lng: '',
          course: '',
          spd: '',
          windDir: '',
          windSpd: '',
          seaState: '',
          swellDir: '',
          swellHeight: '',
          doRob: '',
          foRob: '',
          fwRob: '',
          pob: '',
          pitch: '',
          roll: '',
          updatedAt: '',
          vessel: this.$route.params.id,
          createdBy: this.$store.state.auth.userId
        },
        step: 1, // initial step
        numberOfSteps: 4,
        showErrors: false
      }
    },

    computed: {
      inProgress () {
        return this.createNewReportTask.isActive
      },

      isSubmitted () {
        return this.createNewReportTask.isResolved
      },

      selectedStep () {
        return `step${this.step}`
      },

      lastStep () {
        return this.step === this.numberOfSteps
      },

      stepTitle () {
        switch (this.step) {
          case 1:
            return 'Navigation data'
          case 2:
            return 'Weather data'
          case 3:
            return 'Other data'
          case 4:
            return 'Success'
        }
      }
    },

    methods: {
      ...mapActions([
        'createNewReport'
      ]),

      nextStep (invalidStep) {
        if (invalidStep) {
          this.showErrors = true
          return
        }

        if (!this.lastStep) {
          this.showErrors = false
          this.step++
        }
      },

      previousStep () {
        this.showErrors = false

        if (this.step > 1) this.step--
      },

      selectStep (step) {
        this.step = step
      },

      async submit (invalidStep) {
        if (invalidStep) {
          this.showErrors = true
          return false
        }
        this.createNewReportTask.run()
      },

      _getNewReportData () {
        return {
          ...this.newReportData,
          createdAt: new Date(Date.now()),
          lat: formatLatForPersistanceLayer(this.newReportData.lat),
          lng: formatLngForPersistanceLayer(this.newReportData.lng)
        }
      }
    },

    tasks (task) {
      return {
        createNewReportTask: task(function * () {
          yield this.createNewReport(this._getNewReportData())
        })
        .flow('restart')
        .onSuccess(() => {
          this.step++
          setTimeout(() => {
            this.$emit('hideReportForm')
          }, 2000)
        })
        .onError(() => {
          // flash message shall go here
          alert('Something went wrong')
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .new-report {
    width: 100%;

    &__form-content {
      padding: 15px;
      min-height: 460px;
    }

    .slide-fade-enter-active {
      transition: all .3s ease;
    }
    .slide-fade-leave-active {
      transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to {
      transform: translateX(20px);
      opacity: 0;
    }
  }
</style>
