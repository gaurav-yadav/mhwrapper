import * as redis from "redis";
import * as userData from "./users";
const { promisify } = require("util");

let redisClient = redis.createClient();
const getAsync = promisify(redisClient.get).bind(redisClient);

let events = {
  1: { created: [], invited: [] },
  2: { created: [], invited: [] },
  3: { created: [], invited: [] },
  4: { created: [], invited: [] },
  5: { created: [], invited: [] },
  6: { created: [], invited: [] }
};

async function sendNotifications(event) {
  event.users.forEach(user => {
    console.log(user.id, "<-  mail sent to the user");
    //insert into their invited events:
    //add a date check for existing events
    //notify the creator
    events[user.id].invited.push(event);
  });
}

export async function createEvent(ctx, userId) {
  const eventDetails = ctx.request.body;
  console.log(userId);
  console.log(eventDetails);
  //check if user is there or return 404 - additional todo
  //same ID event will be updated TBD
  sendNotifications(eventDetails);
  eventDetails.creator = userId; //adding the creator
  events[userId].created.push(eventDetails);
  ctx.body = events;
}

export async function acceptEvent(ctx, userId) {
  const eventDetails = ctx.request.body;
  console.log(eventDetails, "is accepted by the user", userId);

  //add check to see if the event exists
  console.log(
    events[eventDetails.creatorId].created[eventDetails.eventId].users,
    "all events by that user"
  );
  let users =
    events[eventDetails.creatorId].created[eventDetails.eventId].users;

  // users = users.forEach(u => {
  //   console.log(u);
  //   if (u.id === userId) {
  //     u.accepted = true;
  //   }
  // });

  console.log(
    events[eventDetails.creatorId].created[eventDetails.eventId],
    "event state after accepting"
  );
  events[eventDetails.creatorId].created[eventDetails.eventId].users = users; //adding to to main obj
  ctx.body = events;
}

export async function deleteEvent(ctx, userId) {
  const eventDetails = ctx.request.body;
  console.log(
    `user ${userId}  is deletin the event id ${eventDetails.eventId}`
  );
  //add a check if the cretor is same as the user delting and the delete
  // if possible remove from others events
  events[userId].created.splice(eventDetails.eventId, 1);
  console.log("DELETED event");
  ctx.body = events;
}
