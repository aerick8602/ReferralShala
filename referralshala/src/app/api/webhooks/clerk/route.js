import { Webhook } from 'svix';
import { headers } from 'next/headers';
import client from '../../../../connection/prisma';


export async function POST(req) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Error: Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
  }

  // Create new Svix instance with secret
  const wh = new Webhook(WEBHOOK_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
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
    return new Response('Error: Verification error', {
      status: 400,
    });
  }

  // Do something with payload
  // For this guide, log payload to console
  const { id } = evt.data;
  const eventType = evt.type;
  console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
  console.log('Webhook payload:', payload);
  
  
  const {email_addresses, first_name, last_name, profile_image_url} = evt.data;

  if (evt.type === "user.created") {
    const user = await client.user.create({
      data: {
        clerkId: id,
        email: email_addresses[0].email_address,
        firstName: first_name,
        lastName: last_name,
        userType: "EMPLOYER",
        profilePicture: profile_image_url,
      },
    });
  }
  if (evt.type === "user.updated") {
    const user = await client.user.update({
      where: { clerkId: id }, 
      data: {
        email: email_addresses[0].email_address,
        firstName: first_name,
        lastName: last_name,
        profilePicture: profile_image_url,
      },
    });
  }
  if (evt.type === "user.deleted") {
    const user = await client.user.delete({
      where: {
        clerkId: id, 
      },
    });
  }

  
  return new Response('Webhook received', { status: 200 });
}