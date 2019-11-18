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

export const submit = newProperty => axios
  .post('properties/save', newProperty)
  .then(response => {
    console.log('New Property Added')
    console.log(response)
  })

export const addReminder = newReminder => axios
  .post('reminders/todo', newReminder)
  .then(response => {
    console.log('New Reminder Added')
    console.log(response)
  })

export const send = newMessage => axios
  .post('chat/message', newMessage)
  .then(response => {
    console.log('New Message Added')
    console.log(response)
  })