import { Webhook } from 'svix'
import { headers } from 'next/headers'
import client from '../../../../connection/prisma';


export async function POST(req) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Error: Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Create new Svix instance with secret
  const wh = new Webhook(WEBHOOK_SECRET)

  // Get headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    })
  }

  // Get body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  let evt;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    })
  } catch (err) {
    console.error('Error: Could not verify webhook:', err)
    return new Response('Error: Verification error', {
      status: 400,
    })
  }

  // Extract event data
  const {id,unsafe_metadata} = evt.data
  const eventType = evt.type
    console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
    console.log('Webhook payload:', payload)






  // Handle user.created event
  if (eventType === 'user.created') {
    const newUser = await client.user.create({
      data: {
        userId: id,
        userType: unsafe_metadata.userType,
        userData: payload.data,
      },
    });
    console.log("newUser :", newUser);

    if (unsafe_metadata.userType === "employer") {
      await client.employer.create({
        data: {userId: newUser.id}
      });
    } else if (unsafe_metadata.userType === "candidate") {
      await client.candidate.create({
        data: {userId: newUser.id}
      });
    }
  }
  // Handle user.update event
  if (eventType === "user.updated") {
      const updatedUser = await client.user.update({
        where: { userId: id },
        data: {
          userData: payload,
        },
      })
    }

  // Handle user.delete event
  if (eventType === "user.deleted") {
      const deletedUser = await client.user.delete({
        where: { userId: id },
      })
    }
    
  return new Response('Webhook received', { status: 200 })
}
