# Portfolio guide

The /ask page is a public, source-linked guide to the portfolio. It gives deterministic guided answers when no API key is configured or when OpenRouter is unavailable. Its facts live in `lib/portfolio-chat.ts` and must be updated alongside the public cases.

To enable live answers, revoke the key previously shared in chat, create a new OpenRouter API key with an account-level spending limit, and add it as `OPENROUTER_API_KEY` to the Vercel project for Production. Keep it out of the repository, browser bundle, preview logs and client-side variables. Redeploy the production branch after adding the variable. For local work, put the new key in an ignored `.env.local`.

The server uses `openrouter/free` with a short context assembled only from public portfolio facts. Model availability and free quotas may change. Requests are capped by body length, conversation length, output tokens, an 18-second timeout and a best-effort per-IP and per-instance memory counter. **These in-memory counters are not a distributed rate limit on Vercel.** Before driving substantial public traffic to the live model, add a persistent rate limit or Vercel Firewall rule to `/api/portfolio-chat`, and monitor the OpenRouter key's usage. Do not promise unlimited free inference.

Visitor questions are processed by OpenRouter and an underlying model provider when live AI is enabled. The page does not save the conversation, sends only the most recent messages, rejects obvious email addresses and API keys, and asks visitors not to enter client or personal data. Those checks cannot guarantee that a visitor never submits sensitive information. The automated answer is labeled as such and includes server-selected links for verification.
