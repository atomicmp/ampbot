exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('roles')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('roles').insert([
        { role_id: 1, role_name: 'banned' },
        { role_id: 2, role_name: 'kicked' },
        { role_id: 3, role_name: 'user' },
        { role_id: 4, role_name: 'moderator' },
        { role_id: 5, role_name: 'admin' },
      ]);
    });
};
