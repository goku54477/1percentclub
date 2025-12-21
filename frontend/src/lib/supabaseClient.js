import { createClient } from '@supabase/supabase-js'

const url = process.env.REACT_APP_SUPABASE_URL
  || process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.REACT_APP_SUPABASE_ANON_KEY
  || process.env.REACT_APP_SUPABASE_PUBLISHABLE_DEFAULT_KEY
  || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const schema = process.env.REACT_APP_SUPABASE_SCHEMA
  || process.env.NEXT_PUBLIC_SUPABASE_SCHEMA
  || 'public'

const baseUrl = url ? url.replace(/\/+$/, '') : null

let client = null
if (url && key) {
  client = createClient(url, key)
}

export const getSupabase = () => client
const rest = baseUrl
  ? (baseUrl.endsWith('/rest/v1') ? baseUrl : `${baseUrl}/rest/v1`)
  : null

export const ensureVisitorId = () => {
  let id = localStorage.getItem('visitorId')
  if (!id) {
    id = (crypto && crypto.randomUUID) ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`
    localStorage.setItem('visitorId', id)
  }
  return id
}

const insertDirect = async (table, payload) => {
  if (!rest || !key) return { data: null, error: { message: 'Supabase client not configured' } }
  try {
    const endpoint = `${rest}/${table}`
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Profile': schema,
        'Accept-Profile': schema,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(payload),
    })
    if (!response.ok) {
      let msg = `HTTP ${response.status} ${response.statusText || ''}`.trim()
      try {
        const raw = await response.text()
        if (raw) {
          try {
            const j = JSON.parse(raw)
            msg = j?.message || j?.error || j?.hint || msg
          } catch {
            msg = raw
          }
        }
      } catch {
      }
      return { data: null, error: { message: `${String(msg)} (${endpoint})`, status: response.status } }
    }
    return { data: null, error: null }
  } catch (e) {
    return { data: null, error: { message: e?.message || 'Network error' } }
  }
}

export const recordSelection = async (payload) => {
  return insertDirect('selections', payload)
}

export const saveShippingDetails = async (payload) => {
  return insertDirect('shipping_details', payload)
}
