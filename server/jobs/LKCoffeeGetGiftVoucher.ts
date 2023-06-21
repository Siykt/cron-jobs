import { defineRunner } from './helpers/define'

export default defineRunner({
  id: 'LKCoffeeGetGiftVoucher',
  name: '瑞幸 4.8 折券',
  defaultCron: '0 0 0 * * *',
  description: '通过自动化任务定时获取瑞幸的基础折扣券(4.8)',
  config: {
    phoneNumber: String,
  },
  runner: async ({ http, res, req }) => {
    const url = `https://mkt.lkcoffee.com/capi/resource/m/promo/activity/send?queryParamsStr=%7B%22mobile%22%3A%22${req.phoneNumber}%22%2C%22invitationCode%22%3A%22MK33613423901195%22%2C%22openid%22%3A%22%22%2C%22needOpenId%22%3Afalse%2C%22origin%22%3A4%2C%22handleMsg%22%3Afalse%2C%22adParams%22%3A%7B%7D%2C%22_%22%3A1670594887106%7D`
    const { content, msg } = await http<{ content: { msg: string }; msg: string }>(url, { method: 'GET' })
    if (content)
      res.end(`[瑞幸咖啡自动获取4.8折优惠券] 执行结果: ${req.phoneNumber} ${content.msg.replace('\n', '')}`)
    else
      res.error(new Error(msg))
  },
})
