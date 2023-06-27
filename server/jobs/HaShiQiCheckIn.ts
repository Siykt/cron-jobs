import { defineRunner } from './helpers/define'

export default defineRunner({
  id: 'HaShiQiCheckIn',
  name: '哈士奇自动签到',
  defaultCron: '0 0 0 * * *',
  description: '哈士奇自动签到领取金币, 需要cookie作为参数',
  icon: '/icons/hashiqi.png',
  config: {
    cookie: 'string',
  },
  runner: async ({ http, end, getConfig, error, html }) => {
    const { data = {} } = await getConfig()
    if (!data.cookie)
      return error(new Error('请先配置cookie'))
    const url = 'https://www.hashiqi.online/aspx3/mobile/qiandao.aspx'
    const headers = {
      'Accept': '*/*',
      'Host': 'www.hashiqi.online',
      'cookie': data.cookie,
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
    }

    let $ = html(await http<string>(url, { method: 'GET', headers }))
    const form = new FormData()
    form.append(
      '__EVENTTARGET',
      $('form > a').attr('href')?.replace('javascript:__doPostBack(\'', '').replace('\',\'\')', '') ?? '',
    )
    form.append('__EVENTARGUMENT', $('#__EVENTARGUMENT').attr('value') ?? '')
    form.append('__VIEWSTATE', $('#__VIEWSTATE').attr('value') ?? '')
    form.append('__VIEWSTATEGENERATOR', $('#__VIEWSTATEGENERATOR').attr('value') ?? '')
    $ = html(await http<string>(url, { method: 'POST', headers, body: form }))
    end(`${$('#lblprice').text()}`)
  },
})
