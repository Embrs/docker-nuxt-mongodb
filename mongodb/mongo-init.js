// db.createCollection("users");
db.createUser({
  user: "user",
  pwd: "user123",
  roles: [
    {
      role: "readWrite",
      db: "mydb",
    },
  ],
});
