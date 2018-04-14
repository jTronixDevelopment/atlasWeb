export const LOG_IN = "LOG_IN"

export const setLogInStatus = authorizedState => ({
  type : 'LOG_IN',
  authorized : authorizedState
})
