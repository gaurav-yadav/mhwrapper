const users = [
  { id: 1, name: "user a", email: "usera@mail.com" },
  { id: 1, name: "user b", email: "usera@mail.com" },
  { id: 1, name: "user c", email: "usera@mail.com" },
  { id: 1, name: "user d", email: "usera@mail.com" },
  { id: 1, name: "user e", email: "usera@mail.com" }
];

export async function getAllUserData() {
  return users;
}

export async function userData(ctx) {
  ctx.body = await getAllUserData();
}
