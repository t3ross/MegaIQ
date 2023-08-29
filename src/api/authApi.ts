import axios from 'axios';

const authApi = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
  params: {
    key: 'AIzaSyCYRE_XoylQZD0y0PXtdxXtiDoKt31CiII',
  },
});

export default authApi;
