const config = {
  productName: 'ViteReactElectronApp', // 应用程序名称
  appId: 'mac.vite.react.electron.com', // 应用程序唯一标识
  publish: false, // 是否发布到 GitHub 上
  copyright: "Copyright © 2023",
  asar:false, // 是否将应用程序打包为asar文件
  files: ['dist/**', 'package.json'], // 将要打包的文件或目录
  directories: {
    output: 'release', // 打包输出目录
    buildResources: 'buildResources', // 构建资源目录
  },
  extraResources: {
    from: "buildResources", // 额外的静态资源目录
    to: "buildResources"
  },
  mac: {
    hardenedRuntime: true, // 是否启用硬化运行时
    gatekeeperAssess: false, // 是否允许运行未签名的应用程序
    target: ['dmg','zip'], // 打包的目标类型
    entitlements: './scripts/entitlements.mac.plist', // macOS 应用程序权限配置文件的路径
    entitlementsInherit: './scripts/entitlements.mac.plist', // 操作系统将继承的权限配置文件的路径
    identity: 'Taotao Xu (V79DRC3Q8Z)', // 应用程序签名的证书 ID
    icon: './buildResources/icon/icon.icns', // 应用程序图标
    bundleVersion: 100, // 应用程序的捆绑版本
    extendInfo: { // 额外的 macOS 应用程序属性
      LSUIElement: true, // 启用macOS的无界面模式
      SUFeedURL: '', // 升级检查的 URL
      SUPublicEDKey: '' // 允许升级的公钥
    },
  },
  dmg: {
    backgroundColor: '#ffffff', // 创建 dmg 文件时窗口的背景颜色
    window: { width: 540, height: 380 }, // 创建 dmg 文件时窗口大小
    icon: './buildResources/icon/icon.icns', // dmg 文件所带的图标
    iconSize: 128, // 图标大小
    contents: [
      { x: 410, y: 190, type: 'link', path: '/Applications' }, // dmg 文件中的可执行文件路径
      { x: 130, y: 190, type: 'file' }, // dmg 文件中的文件路径
    ],
    title: 'ViteReactElectronApp', // dmg 文件的标题
  },
  win: {
    icon: './buildResources/icon/icon.ico', // 可执行文件的图标
    target: 'nsis', // 打包的目标类型
    requestedExecutionLevel: 'requireAdministrator', // 请求管理员权限时用的系统口令
    verifyUpdateCodeSignature: false, // 是否验证更新时的签名，默认为false
    signingHashAlgorithms: [ // 当签署时，使用的摘要算法列表，支持 sha256 和 sha1。默认使用 sha256。
      "sha256",
      "sha1"
    ],
    rfc3161TimeStampServer: "", // 向 RFC 3161 时间戳服务器注册时使用的 URL。默认情况下，不占用服务。
    certificateFile: "", // 打包时所用的证书文件路径
    certificatePassword: "" // 打包时所用的证书的密码
  },
  nsis: {
    oneClick: true, // 是否一键安装
    language: "2052", // 安装向导语言
    perMachine: true, // 是否在每台机器上安装，需要管理员权限
    createDesktopShortcut: true, // 是否在桌面上创建快捷方式
    createStartMenuShortcut: true, // 是否在开始菜单上创建快捷方式
    guid: 'ViteReactElectronApp', // 安装程序的 GUID
    shortcutName: 'ViteReactElectronApp', // 创建快捷方式的名称
    artifactName: 'ViteReactElectronApp@${version}.${ext}', // 生成安装文件时的文件名
    include: './build/install/installer.nsh' //包含其他脚本文件的路径
  },
  publish: {
    provider: 'generic',
    url: "http://127.0.0.1:8089/"
  }
};

module.exports = config;
