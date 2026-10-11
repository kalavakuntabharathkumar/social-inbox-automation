export function draftReply(conversation, tone = "professional") {
  const intro = tone === "friendly" ? `Hi ${conversation.customer}, thanks for reaching out!` :
    tone === "concise" ? `Hi ${conversation.customer} —` : `Hello ${conversation.customer}, thank you for contacting support.`;
  const text = conversation.text.toLowerCase();
  let body;
  if (text.includes("order status") || text.includes("shipment")) {
    body = "I can check the latest carrier scan and confirm the next update. If the tracking has not refreshed, I'll escalate it to our fulfillment team.";
  } else if (text.includes("address")) {
    body = "I can help check whether the parcel has been dispatched. Please confirm the order number; address changes may be limited once the shipment is handed to the carrier.";
  } else if (text.includes("damaged")) {
    body = "I'm sorry the item arrived damaged. Please share your order number and a photo of the item and packaging so we can review the replacement or refund options.";
  } else if (text.includes("invoice")) {
    body = "I'll verify the invoice record and arrange a fresh copy if the attachment is missing. Please share the invoice or purchase order number.";
  } else if (text.includes("replacement arrived")) {
    body = "Thanks for confirming. I'll mark the replacement case as resolved.";
  } else {
    body = "I'll review the case details and follow up with the next steps shortly.";
  }
  return `${intro}\n\n${body}\n\nRegards,\nSupport Team`;
}

export function summarizeMetrics(conversations) {
  return {
    total: conversations.length,
    open: conversations.filter(c => c.status === "open").length,
    highPriority: conversations.filter(c => c.priority === "high" && c.status === "open").length,
    channels: [...new Set(conversations.map(c => c.channel))].length
  };
}
