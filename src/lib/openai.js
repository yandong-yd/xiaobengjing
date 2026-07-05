export function getOpenAiConfig() {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY || ''
  const baseUrl = (import.meta.env.VITE_OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '')
  const model = import.meta.env.VITE_OPENAI_MODEL || 'gpt-4o-mini'
  const configured = Boolean(apiKey && !apiKey.includes('your_'))
  return { apiKey, baseUrl, model, configured }
}

export function isOpenAiConfigured() {
  return getOpenAiConfig().configured
}

/** @param {{ role: string, content: string }[]} messages */
export async function chatCompletion(messages, { temperature = 0.7, maxTokens } = {}) {
  const { apiKey, baseUrl, model } = getOpenAiConfig()
  if (!apiKey || apiKey.includes('your_')) {
    throw new Error('未配置 AI 密钥，请在 .env 中设置 VITE_OPENAI_API_KEY')
  }

  const body = {
    model,
    messages,
    temperature,
  }
  if (maxTokens) body.max_tokens = maxTokens

  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    let msg = `AI 服务异常 (${res.status})`
    try {
      const err = await res.json()
      if (err.error?.message) msg = err.error.message
    } catch {
      /* ignore parse error */
    }
    if (res.status === 401) msg = 'API 密钥无效，请检查 VITE_OPENAI_API_KEY'
    if (res.status === 429) msg = '请求过于频繁或余额不足，请稍后再试'
    throw new Error(msg)
  }

  const data = await res.json()
  const content = data.choices?.[0]?.message?.content
  if (!content) throw new Error('AI 返回内容为空')
  return content
}
