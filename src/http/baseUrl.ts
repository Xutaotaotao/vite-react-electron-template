const MODE = import.meta.env.MODE || 'production'

export const baseUrls:any = {
  dev: 'https://www.baidu.com',
  production: 'https://github.com'
}

const baseUrl = baseUrls[MODE]

export default baseUrl