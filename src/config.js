export default {
  GOOGLE_CLIENT_ID: '754461768195-odub50ti1js87jf0ebgkie0jedumkcpj.apps.googleusercontent.com',
  API_URI: process.env.NODE_ENV === 'production'
    ? 'https://riotly-chat-api.herokuapp.com/'
    : 'http://localhost:8000/api/v1',
  SOCKETS_URI: process.env.NODE_ENV === 'production'
    ? 'wss://riotly-chat-api.herokuapp.com/'
    : 'ws://localhost:8000/api/v1',
};