const { Webhook } = require('svix');
const { headers } = require('next/headers');

module.exports = async function handler(req, res) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Error: Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
  }

  // Create new Svix instance with secret
  const wh = new Webhook(WEBHOOK_SECRET);

  // Get headers
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    res.status(400).send('Error: Missing Svix headers');
    return;
  }

  // Get body
  let payload;
  try {
    payload = await new Promise((resolve, reject) => {
      let body = '';
      req.on('data', chunk => {
        body += chunk;
      });
      req.on('end', () => resolve(JSON.parse(body)));
      req.on('error', reject);
    });
  } catch (err) {
    console.error('Error: Unable to parse body', err);
    res.status(400).send('Error: Invalid JSON body');
    return;
  }

  const body = JSON.stringify(payload);

  let evt;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    console.error('Error: Could not verify webhook:', err);
    res.status(400).send('Error: Verification error');
    return;
  }

  // Do something with payload
  const { id } = evt.data;
  const eventType = evt.type;
  console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
  console.log('Webhook payload:', body);

  res.status(200).send('Webhook received');
};
