import https from 'https';
import pkg from '../package.json';

export default function({
  $axios, isDev, route, redirect, req, store
}) {
  $axios.defaults.headers.common['Accept'] = 'application/json';
  $axios.defaults.xsrfCookieName = 'CSRF';
  $axios.defaults.xsrfHeaderName = 'X-Api-Csrf';
  $axios.defaults.withCredentials = true;
  $axios.defaults.timeout = 20000;

  if ( process.server ) {
    $axios.defaults.headers.common['user-agent'] = `Dashboard v${ pkg.version }`;
  }

  if ( isDev ) {
    // https://github.com/nuxt-community/axios-module/blob/dev/lib/module.js#L78
    // forces localhost to http, for no obvious reason.
    if ( $axios.defaults.baseURL.startsWith('http://') ) {
      $axios.defaults.baseURL = $axios.defaults.baseURL.replace(/^http:/, 'https:');
    }

    const insecureAgent = new https.Agent({ rejectUnauthorized: false });

    $axios.defaults.httpsAgent = insecureAgent;
    $axios.httpsAgent = insecureAgent;
  } else if ( process.server ) {
    // For requests from the server, set the base URL to the URL that the request came in on
    $axios.onRequest((config) => {
      if ( process.server && config.url.startsWith('/') ) {
        config.baseURL = `${ req.protocol }://${ req.headers.host }`;
      }
    });
  }

  $axios.interceptors.response.use(
    response => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        if (error.response.config.url.includes('auth?action=login')) {
          return Promise.reject(error.response);
        }

        redirect(401, '/auth/logout');

        return new Promise(() => {});
      }

      if (error.code === 'ECONNABORTED') {
        error.message = store.getters['i18n/t']('harvester.axios.timeoutErrorMessage', { timeout: 20 });
      }

      return Promise.reject(error);
    }
  );
}
