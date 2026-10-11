// Provider adapters. Replace demo fixtures with authorized Nango/API calls.
export function fetchConversations() {
  return [
    { id: "ig-501", channel: "Instagram", customer: "Maya R.", handle: "@maya.r", text: "My order status hasn't updated in two days.", priority: "high", age: "12m", status: "open" },
    { id: "wa-502", channel: "WhatsApp", customer: "Arun K.", handle: "+91 •••• 1842", text: "Can I change the delivery address before dispatch?", priority: "medium", age: "28m", status: "open" },
    { id: "vendor-503", channel: "Vendor Portal", customer: "Northwind Supplies", handle: "case #VP-231", text: "Invoice attachment is missing from the portal.", priority: "medium", age: "1h", status: "open" },
    { id: "ig-504", channel: "Instagram", customer: "Jordan P.", handle: "@jordan.p", text: "The product arrived damaged. What should I do?", priority: "high", age: "1h", status: "open" },
    { id: "wa-505", channel: "WhatsApp", customer: "Leena S.", handle: "+91 •••• 9201", text: "Thanks, the replacement arrived today.", priority: "low", age: "2h", status: "resolved" }
  ];
}

export function portalDefinitions() {
  return ["Supplier Central", "Returns Console", "Invoice Desk", "Warranty Hub", "Shipping Admin", "Inventory Portal"].map((name, i) => ({
    id: `portal-${i + 1}`, name, task: ["check shipment status", "review return request", "download invoice", "check warranty claim", "confirm dispatch status", "sync stock availability"][i]
  }));
}
