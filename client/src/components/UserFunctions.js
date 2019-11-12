import axios from 'axios'

export const register = newUser => axios
  .post('users/register', newUser)
  .then(response => {
    console.log('Registered')
  })

export const login = user => axios
  .post('users/login', user)
  .then(response => {
    localStorage.setItem('usertoken', response.data)
    return response.data
  })
  .catch(console.error)
