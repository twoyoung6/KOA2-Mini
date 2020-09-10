/** session 配置  */
const SESSION_CONFIG = {
  key: 'koa.sess', // 字符串 cookie键 默认值
  maxAge: 86400000, // (毫秒)(默认值为1天)
  autoCommit: true, // 自动提交 header资讯(默认true)
  overwrite: true, //是否可以覆盖(默认为true)
  httpOnly: true, // 仅服务器访问 cookie，true 则不能通过document.cookie来访问此 Cookie
  signed: true, // 是否签名加密
  rolling: true, // 强制在每个响应上设置会话标识符cookie。过期将重置为原始maxAge，重置过期倒计时(默认值为false)
  renew: false, // 是否到期时自动更新 默认值为false)
  secure: false, // 是否通过 HTTPS 协议 访问
  sameSite: null,
}

module.exports = SESSION_CONFIG
