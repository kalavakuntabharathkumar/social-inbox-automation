import test from 'node:test';
import assert from 'node:assert/strict';
import { fetchConversations } from '../src/providers.js';
import { draftReply, summarizeMetrics } from '../src/agent.js';

test('provider fixtures include multiple channels', () => {
  assert.ok(new Set(fetchConversations().map(c => c.channel)).size >= 2);
});
test('reply drafts include a support sign-off', () => {
  const conversation = fetchConversations()[0];
  assert.match(draftReply(conversation), /Support Team/);
});
test('metrics count open conversations', () => {
  const metrics = summarizeMetrics(fetchConversations());
  assert.equal(metrics.total, fetchConversations().length);
  assert.ok(metrics.open > 0);
});
