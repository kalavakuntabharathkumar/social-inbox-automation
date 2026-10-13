import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { fetchConversations, portalDefinitions } from './providers.js';
import { draftReply, summarizeMetrics } from './agent.js';

const app = express();
const port = Number(process.env.PORT || 3000);
const root = path.dirname(fileURLToPath(import.meta.url));
app.use(express.json());
app.use(express.static(path.join(root, '../public')));

app.get('/api/health', (_req, res) => res.json({ status: 'ok', demoMode: process.env.DEMO_MODE !== 'false' }));
app.get('/api/conversations', (_req, res) => res.json({ items: fetchConversations(), metrics: summarizeMetrics(fetchConversations()) }));
app.get('/api/portals', (_req, res) => res.json(portalDefinitions()));
app.post('/api/draft', (req, res) => {
  const conversation = fetchConversations().find(c => c.id === req.body.id);
  if (!conversation) return res.status(404).json({ error: 'Conversation not found' });
  return res.json({ id: conversation.id, draft: draftReply(conversation, req.body.tone || 'professional') });
});
app.post('/api/resolve', (req, res) => {
  const conversation = fetchConversations().find(c => c.id === req.body.id);
  if (!conversation) return res.status(404).json({ error: 'Conversation not found' });
  return res.json({ id: conversation.id, status: 'resolved', message: 'Demo state updated for this request.' });
});
app.listen(port, () => console.log(`Social Inbox Agent running at http://localhost:${port}`));
