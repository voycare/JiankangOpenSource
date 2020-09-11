const app = {
  namespaced: true,
  state: {
    alert_message: null
  },
  mutations: {
    setAlertMessage(state, {message}) {
      state.alert_message = message
    }
  },
  actions: {
    showMessage(context, {message}) {
      // Set global message.
      context.commit('setAlertMessage', {message})
      // Show alert.
      window.jQuery('#toast__app').toast('show')
    },
    showModal(context, {message}) {
      context.commit('setAlertMessage', {message})
      window.jQuery('#modal__app').modal('show')
    }
  }
}

export default app