export function verifyWa(req, res) {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  if (mode === 'subscribe' && token === process.env.WA_VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }
  res.sendStatus(403);
}

export function parseWa(body) {
  const msgs = body.entry?.[0]?.changes?.[0]?.value?.messages || [];
  return msgs.map(m => m.text?.body).filter(Boolean);
}
