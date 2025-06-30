db.getCollection('members').insertMany([
  {
    name: 'Alice Smith',
    role: 'Developer',
    email: 'alice@example.com',
    linkedinUrl: 'https://linkedin.com/in/alicesmith',
    imageUrl: '/images/alice.jpg'
  },
  {
    name: 'Bob Johnson',
    role: 'Designer',
    email: 'bob@example.com',
    linkedinUrl: 'https://linkedin.com/in/bobjohnson',
    imageUrl: '/images/bob.jpg'
  }
]);