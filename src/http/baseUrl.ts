const MODE = import.meta.env.MODE || 'production'

export const baseUrls:any = {
  dev: 'http://localhost:3999',
  production: 'http://jsonplaceholder.typicode.com'
}

const baseUrl = baseUrls[MODE]

export default baseUrl