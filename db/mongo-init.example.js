db = db.getSiblingDB('mongo');

db.createUser({
  user: 'admin',
  pwd: 'admin',
  roles: [
    {
      role: 'readWrite',
      db: 'mongo',
    },
  ],
});
