import { defineRunner } from './helpers/define'

export default defineRunner({
  id: 'DYForbiddenWords',
  name: '抖音违禁词检测',
  description: '抖音的违禁词检测, 基于外部接口, 可能需要检查cookie时效性',
  icon: '/icons/douyin.svg',
  config: {
    cookie: 'string',
    text: 'string',
  },
  runner: async ({ http, end, getConfig, error }) => {
    const { data = {} } = await getConfig()
    if (!data.cookie)
      return error(new Error('请先配置cookie'))
    if (!data.text)
      return error(new Error('请先配置text'))

    const url = 'http://www.ju1.cn/Index/add'
    const form = new FormData()
    form.append('mgtype', '1')
    form.append('ty_wj_type', '1')
    form.append('mz_wj_type', '1')
    form.append('xw_wj_type', '1')
    form.append('text', data.text)
    const res = await http<string>(url, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Host': 'www.ju1.cn',
        'cookie': data.cookie,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      },
      body: form,
    })
    const strs = res.split('<<<')
    end({
      // 原文
      originalText: data.text,
      // 敏感词
      sensitiveWordsCount: strs[1],
      // 违禁词
      forbiddenWordsCount: strs[2],
      // 文章总字数
      totalWords: strs[3],
      // 违禁词列表
      forbiddenWords: JSON.parse(strs[4]),
      // 敏感词列表
      sensitiveWords: JSON.parse(strs[5]),
    })
  },
})
