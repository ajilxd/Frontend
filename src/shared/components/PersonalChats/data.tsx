// export const Users: User[] = [
//   {
//     userId: 1,
//     image:
//       "https://images.freeimages.com/images/large-previews/971/basic-shape-avatar-1632968.jpg?fmt=webp&h=350",
//     messages: [],
//     name: "Jane Doe",
//   },
//   {
//     userId: 2,
//     image:
//       "https://images.freeimages.com/images/large-previews/fdd/man-avatar-1632964.jpg?fmt=webp&h=350",
//     messages: [],
//     name: "John Doe",
//   },
//   {
//     userId: 3,
//     image:
//       "https://images.freeimages.com/images/large-previews/d1f/lady-avatar-1632967.jpg?fmt=webp&h=350",
//     messages: [],
//     name: "Elizabeth Smith",
//   },
//   {
//     userId: 4,
//     image:
//       "https://images.freeimages.com/images/large-previews/023/geek-avatar-1632962.jpg?fmt=webp&h=350",
//     messages: [],
//     name: "John Smith",
//   },
//   {
//     userId: 5,
//     image:
//       "https://avatars.githubusercontent.com/u/114422072?s=400&u=8a176a310ca29c1578a70b1c33bdeea42bf000b4&v=4",
//     messages: [],
//     name: "Jakob Hoeg",
//   },
// ];

export const userData = [
  {
    userId: "665c0aaf0f1b2e1a8a123456", // Jane Doe
    image:
      "https://images.freeimages.com/images/large-previews/971/basic-shape-avatar-1632968.jpg?fmt=webp&h=350",
    name: "Jane Doe",
    chatId: "665c0d991234abcd00000001",
    messages: [
      {
        _id: "665c0b001234abcd00000001",
        chatId: "665c0d991234abcd00000001",
        senderId: "665c0aaf0f1b2e1a8a123456",
        receiverId: "665c0abf0f1b2e1a8a654321",
        name: "Jane Doe",
        image:
          "https://images.freeimages.com/images/large-previews/971/basic-shape-avatar-1632968.jpg?fmt=webp&h=350",
        type: "text",
        content: "Hey, Jakob",
        createdAt: "10:00 AM",
      },
      {
        _id: "665c0b001234abcd00000002",
        chatId: "665c0d991234abcd00000001",
        senderId: "665c0abf0f1b2e1a8a654321",
        receiverId: "665c0aaf0f1b2e1a8a123456",
        name: "Jakob Hoeg",
        image:
          "https://avatars.githubusercontent.com/u/114422072?s=400&u=8a176a310ca29c1578a70b1c33bdeea42bf000b4&v=4",
        type: "text",
        content: "Hey!",
        createdAt: "10:01 AM",
      },
      {
        _id: "665c0b001234abcd00000003",
        chatId: "665c0d991234abcd00000001",
        senderId: "665c0aaf0f1b2e1a8a123456",
        receiverId: "665c0abf0f1b2e1a8a654321",
        name: "Jane Doe",
        image:
          "https://images.freeimages.com/images/large-previews/971/basic-shape-avatar-1632968.jpg?fmt=webp&h=350",
        type: "text",
        content: "How are you?",
        createdAt: "10:02 AM",
      },
      {
        _id: "665c0b001234abcd00000004",
        chatId: "665c0d991234abcd00000001",
        senderId: "665c0abf0f1b2e1a8a654321",
        receiverId: "665c0aaf0f1b2e1a8a123456",
        name: "Jakob Hoeg",
        image:
          "https://avatars.githubusercontent.com/u/114422072?s=400&u=8a176a310ca29c1578a70b1c33bdeea42bf000b4&v=4",
        type: "text",
        content: "I am good, you?",
        createdAt: "10:03 AM",
      },
      {
        _id: "665c0b001234abcd00000005",
        chatId: "665c0d991234abcd00000001",
        senderId: "665c0aaf0f1b2e1a8a123456",
        receiverId: "665c0abf0f1b2e1a8a654321",
        name: "Jane Doe",
        image:
          "https://images.freeimages.com/images/large-previews/971/basic-shape-avatar-1632968.jpg?fmt=webp&h=350",
        type: "text",
        content: "I am good too!",
        createdAt: "10:04 AM",
      },
      {
        _id: "665c0b001234abcd00000006",
        chatId: "665c0d991234abcd00000001",
        senderId: "665c0abf0f1b2e1a8a654321",
        receiverId: "665c0aaf0f1b2e1a8a123456",
        name: "Jakob Hoeg",
        image:
          "https://avatars.githubusercontent.com/u/114422072?s=400&u=8a176a310ca29c1578a70b1c33bdeea42bf000b4&v=4",
        type: "text",
        content: "That is good to hear!",
        createdAt: "10:05 AM",
        isLiked: true,
      },
      {
        _id: "665c0b001234abcd00000007",
        chatId: "665c0d991234abcd00000001",
        senderId: "665c0aaf0f1b2e1a8a123456",
        receiverId: "665c0abf0f1b2e1a8a654321",
        name: "Jane Doe",
        image:
          "https://images.freeimages.com/images/large-previews/971/basic-shape-avatar-1632968.jpg?fmt=webp&h=350",
        type: "text",
        content: "How has your day been so far?",
        createdAt: "10:06 AM",
      },
      {
        _id: "665c0b001234abcd00000008",
        chatId: "665c0d991234abcd00000001",
        senderId: "665c0abf0f1b2e1a8a654321",
        receiverId: "665c0aaf0f1b2e1a8a123456",
        name: "Jakob Hoeg",
        image:
          "https://avatars.githubusercontent.com/u/114422072?s=400&u=8a176a310ca29c1578a70b1c33bdeea42bf000b4&v=4",
        type: "text",
        content:
          "It has been good. I went for a run this morning and then had a nice breakfast. How about you?",
        createdAt: "10:10 AM",
      },
      {
        _id: "665c0b001234abcd00000009",
        chatId: "665c0d991234abcd00000001",
        senderId: "665c0aaf0f1b2e1a8a123456",
        receiverId: "665c0abf0f1b2e1a8a654321",
        name: "Jane Doe",
        image:
          "https://images.freeimages.com/images/large-previews/971/basic-shape-avatar-1632968.jpg?fmt=webp&h=350",
        type: "loading",
        content: "",
        isLoading: true,
        createdAt: "10:11 AM",
      },
      {
        _id: "665c0b001234abcd00000002",
        chatId: "665c0d991234abcd00000001",
        senderId: "665c0abf0f1b2e1a8a654321",
        receiverId: "665c0aaf0f1b2e1a8a123456",
        name: "Jakob Hoeg",
        image:
          "https://avatars.githubusercontent.com/u/114422072?s=400&u=8a176a310ca29c1578a70b1c33bdeea42bf000b4&v=4",
        type: "text",
        content: "Hey!",
        createdAt: "10:01 AM",
      },
      {
        _id: "665c0b001234abcd00000002",
        chatId: "665c0d991234abcd00000001",
        senderId: "665c0abf0f1b2e1a8a654321",
        receiverId: "665c0aaf0f1b2e1a8a123456",
        name: "Jakob Hoeg",
        image:
          "https://avatars.githubusercontent.com/u/114422072?s=400&u=8a176a310ca29c1578a70b1c33bdeea42bf000b4&v=4",
        type: "text",
        content: "Hey!",
        createdAt: "10:01 AM",
      },
      {
        _id: "665c0b001234abcd00000002",
        chatId: "665c0d991234abcd00000001",
        senderId: "665c0abf0f1b2e1a8a654321",
        receiverId: "665c0aaf0f1b2e1a8a123456",
        name: "Jakob Hoeg",
        image:
          "https://avatars.githubusercontent.com/u/114422072?s=400&u=8a176a310ca29c1578a70b1c33bdeea42bf000b4&v=4",
        type: "text",
        content: "Hey!",
        createdAt: "10:01 AM",
      },
      {
        _id: "665c0b001234abcd00000002",
        chatId: "665c0d991234abcd00000001",
        senderId: "665c0abf0f1b2e1a8a654321",
        receiverId: "665c0aaf0f1b2e1a8a123456",
        name: "Jakob Hoeg",
        image:
          "https://avatars.githubusercontent.com/u/114422072?s=400&u=8a176a310ca29c1578a70b1c33bdeea42bf000b4&v=4",
        type: "text",
        content: "Hey!",
        createdAt: "10:01 AM",
      },
    ],
  },
  {
    userId: "665c0bbd0f1b2e1a8a112233",
    chatId: "665c0d991234abcd00000002",
    image:
      "https://images.freeimages.com/images/large-previews/fdd/man-avatar-1632964.jpg?fmt=webp&h=350",
    name: "John Doe",
    messages: [],
  },
  {
    userId: "665c0bcf0f1b2e1a8a445566",
    chatId: "665c0d991234abcd00000003",
    image:
      "https://images.freeimages.com/images/large-previews/d1f/lady-avatar-1632967.jpg?fmt=webp&h=350",
    name: "Elizabeth Smith",
    messages: [],
  },
];
