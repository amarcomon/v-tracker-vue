<template>
	<div class="step-1">
    <div class="form-sections">
      <div class="form-section">
        <h4
					data-test-vessel-reports-list-form-step-one-header
					class="form-section__heading"
				>
					Position
				</h4>
				<InputWithErrors data-test-vessel-reports-list-form-step-one-report-time-input unit="">
					<div
					  slot="input"
						class="input__wrapper"
					>
						<BaseIcon
              width="30"
              height="30"
              color="#999"
              viewBox="0 -5 40 40"
						>
              <IconCalendar></IconCalendar>
            </BaseIcon>
						<DatePicker
							class="form-input input input__report-time input--with-error"
							:class="{ invalid: showErrors && $v.reportData.reportTime.$invalid }"
							placeholder="Report date"
							v-model="reportData.reportTime"
							@selected="$v.reportData.reportTime.$touch()"
						/>
					</div>
					<div slot="errors">
						<span
						  class="validation-error"
							v-if="showErrors && !$v.reportData.reportTime.required"
						>
						  This field must not be empty.
						</span>
						<span
						  class="validation-error"
							v-if="showErrors && !$v.reportData.reportTime.date"
						>
						  Please input date in format yyyy-mm-dd (years range 1950-2099).
						</span>
					</div>
				</InputWithErrors>

        <InputWithErrors data-test-vessel-reports-list-form-step-one-report-lat-input unit="°">
					<div
					  slot="input"
						class="input__wrapper"
					>
						<BaseIcon
							width="30"
							height="30"
							color="#999"
							viewBox="2 0 60 60"
						>
							<IconFi></IconFi>
						</BaseIcon>
	          <input
	            class="input input__latitude input--with-error"
	            :class="{ invalid: showErrors && $v.reportData.lat.$invalid }"
	            type="text"
	            placeholder="Latitude"
	            v-model="reportData.lat"
	            @input="$v.reportData.lat.$touch()">
					</div>
          <div slot="errors">
            <span
						 class="validation-error"
						 v-if="showErrors && !$v.reportData.lat.required"
						>
						  This field must not be empty.
						</span>
            <span
						  class="validation-error"
							v-if="showErrors && !$v.reportData.lat.format"
						>
						  Please provide latitude in a valid format (dd mm.m), + for N / - for S hemisphere
						</span>
          </div>
        </InputWithErrors>

        <InputWithErrors data-test-vessel-reports-list-form-step-one-report-lng-input unit="°">
					<div
					  slot="input"
						class="input__wrapper"
					>
						<BaseIcon
							width="30"
							height="30"
							color="#999"
							viewBox="2 0 30 30">
							<IconLambda></IconLambda>
						</BaseIcon>
	          <input
	            class="input input__longitude input--with-error"
	            :class="{ invalid: showErrors && $v.reportData.lng.$invalid }"
	            type="text"
	            placeholder="Longitude"
	            v-model="reportData.lng"
	            @input="$v.reportData.lng.$touch()"
						>
					</div>
          <div slot="errors">
            <span
						  class="validation-error"
							v-if="showErrors && !$v.reportData.lng.required"
						>
						  This field must not be empty.
						</span>
            <span
						  class="validation-error"
							v-if="showErrors && !$v.reportData.lng.format"
						>
						  Please provide longitude in a valid format (ddd mm.m), + for E / - for W hemisphere
						</span>
          </div>
        </InputWithErrors>
      </div>

      <div class="form-section">
        <h4 class="form-section__heading">Navigation</h4>
        <InputWithErrors data-test-vessel-reports-list-form-step-one-report-course-input unit="°">
					<div
					  slot="input"
						class="input__wrapper"
					>
						<BaseIcon
							width="30"
							height="30"
							color="#999"
							viewBox="2 -5 40 40">
							<IconNavigation></IconNavigation>
						</BaseIcon>
	          <input
	            class="input input__course input--with-error"
	            :class="{ invalid: showErrors && $v.reportData.course.$invalid }"
	            type="number"
	            placeholder="Course"
	            v-model="reportData.course"
	            @input="$v.reportData.course.$touch()"
						>
					</div>
          <div slot="errors">
            <span
						  class="validation-error"
							v-if="showErrors && !$v.reportData.course.required"
						>
						  This field must not be empty.
						</span>
            <span
						  class="validation-error"
							v-if="showErrors && !$v.reportData.course.format"
						>
						  Course must be in 'xxx' format.
						</span>
            <span
						  class="validation-error"
							v-if="showErrors && !$v.reportData.course.range"
						>
						  Course must be between 000 - 360.
						</span>
          </div>
        </InputWithErrors>

        <InputWithErrors data-test-vessel-reports-list-form-step-one-report-spd-input unit="kn">
					<div
					  slot="input"
						class="input__wrapper"
					>
						<BaseIcon
							width="30"
							height="30"
							color="#999"
							viewBox="2 -5 40 40"
						>
							<IconSpeed></IconSpeed>
						</BaseIcon>
	          <input
	            class="input input__speed input--with-error"
	            :class="{ invalid: showErrors && $v.reportData.spd.$invalid }"
	            type="number"
	            placeholder="Speed"
	            v-model="reportData.spd"
	            @input="$v.reportData.spd.$touch()"
						>
					</div>
          <div slot="errors">
            <span
						  class="validation-error"
							v-if="showErrors && !$v.reportData.spd.required"
						>
						  This field must not be empty.
						</span>
          </div>
        </InputWithErrors>
      </div>
    </div>

    <div class="actions">
      <span></span>
      <ButtonPositive
				data-test-vessel-reports-list-form-next-step-button
			  :on-click="nextStep"
				:inProgress="false"
			>
        <span>Continue</span>
      </ButtonPositive>
    </div>
	</div>
</template>

<script>
import ButtonPositive from './ButtonPositive.vue'
import InputWithErrors from './InputWithErrors.vue'
import { required } from 'vuelidate/lib/validators'
import BaseIcon from './BaseIcon.vue'
import IconCalendar from './Icons/IconCalendar.vue'
import IconFi from './Icons/IconFi.vue'
import IconLambda from './Icons/IconLambda.vue'
import IconNavigation from './Icons/IconNavigation.vue'
import IconSpeed from './Icons/IconSpeed.vue'
import DatePicker from '@/components/DatePicker.vue'

export default {
  components: {
    ButtonPositive,
    InputWithErrors,
    BaseIcon,
    IconCalendar,
    IconFi,
    IconLambda,
    IconNavigation,
    IconSpeed,
		DatePicker
  },

  props: {
    reportData: {
      type: Object,
      required: true
    },

    showErrors: {
      type: Boolean,
      required: true
    }
  },

  computed: {
    invalidStep () {
      return this.$v.reportData.lat.$invalid ||
      this.$v.reportData.lng.$invalid ||
      this.$v.reportData.reportTime.$invalid ||
      this.$v.reportData.course.$invalid ||
      this.$v.reportData.spd.$invalid
    }
  },

  methods: {
    previousStep () {
      this.$emit('previousStep')
    },

    nextStep () {
      this.$emit('nextStep', this.invalidStep)
    }
  },

  validations: {
    reportData: {
      reportTime: {
        required,
        date: value => {
          if (value === 'undefined' || value === null || value === '') {
            return true
          }
          return /((19[5-9]\d|20[0-9]\d|2090)-([0-1][0-9])-(0[1-9]|[12]\d|3[01]))/.test(value)
        }
      },
      lat: {
        required,
        format: value => {
          if (value === 'undefined' || value === null || value === '') {
            return true
          }
          return /([0-8][0-9]|90)\s([0-5][0-9].[0-9])\s([N, S])/.test(value)
        }
      },
      lng: {
        required,
        format: value => {
          if (value === 'undefined' || value === null || value === '') {
            return true
          }
          return /([0-1][0-9][0-9]|180)\s([0-5][0-9].[0-9])\s([E, W])/.test(value)
        }
      },
      course: {
        required,
        format: value => {
          if (value === 'undefined' || value === null || value === '') {
            return true
          }
          return /^\d{3}$/.test(value)
        },
        range: value => {
          if (value === 'undefined' || value === null || value === '') {
            return true
          }
          return /^(?:36[0]|3[0-5][0-9]|[012][0-9][0-9]|[1-9]?[0-9])?$/.test(value)
        }
      },
      spd: {
        required
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .step-1 {
    padding: 10px;

    .form-sections {
      display: flex;
      justify-content: space-evenly;

      .form-section {
        padding: 10px;

        &__heading {
          margin-bottom: 30px;
        }

				.input__wrapper {
          display: flex;
          background-color: $color-whitey-darker;
          @include border-radius(4px);
          border: none;
          opacity: 0.8;

          svg {
            transform: translate(15px, 12px);
          }
        }
      }
    }
  }
</style>
