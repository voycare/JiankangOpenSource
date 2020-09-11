import rf from "./api/RequestFactory";
import Vuex from 'vuex';
import Vue from 'vue'
import app from './store/app'

Vue.use(Vuex)
export const store = new Vuex.Store({
  modules: {
    app
  },
  state: {
    countries: null,
    settings: [],
    appt_types: [],
    appt_status: [],
    appt_specialty: [],
    appt_fertility: [],
    appt_counseling: [],
    appt_treatments: [],
    appt_languages: [],
    isMetaFetched: false,
  },
  getters: {
    countries: state => state.countries,
    settings: state => state.settings,
    appt_types: state => state.appt_types,
    appt_status: state => state.appt_status,
    appt_specialty: state => state.appt_specialty,
    appt_fertility: state => state.appt_fertility,
    appt_counseling: state => state.appt_counseling,
    appt_treatments: state => state.appt_treatments,
    appt_languages: state => state.appt_languages
  },
  mutations: {
    updateSettings(state, data) {
      state.settings = data
    },
    updateCountries(state, data) {
      state.countries = data;
    },
    updateMetas(state, {status, types, specialty, fertility, counseling, treatment, languages}) {
      state.appt_status = status
      state.appt_types = types
      state.appt_specialty = specialty
      state.appt_fertility = fertility
      state.appt_counseling = counseling
      state.appt_treatments = treatment
      state.appt_languages = languages
    },
    updateIsMetaFetched(state, value){
      state.isMetaFetched = value
    }
  },
  actions: {
    getAppointmentMetas({state, commit}) {
      if(!state.isMetaFetched){
        rf.getRequest('CommonRequest').getAppointmentMetas().then(res => {
        let {types, status} = res.data
        commit('updateMetas', res.data)
        commit('updateIsMetaFetched', true)
        })
      }
    },
    getCountries(context) {
      if(!context.state.countries){
        rf.getRequest('CommonRequest').getCountries().then(res => {
        let countries = res.data.datas;
        context.commit("updateCountries", countries);
        });
      }
    },
    getSettings(context) {
      rf.getRequest('CommonRequest').getSettings().then(res => {
        let settings = res.data
        context.commit('updateSettings', settings)
      })
    },
  },
});
