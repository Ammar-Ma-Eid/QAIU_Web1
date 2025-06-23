export const members = [
  { id: '1', name: 'Dr. Quantum', role: 'Supervisor', imageUrl: 'https://placehold.co/400x400', dataAiHint: 'scientist portrait', email: 'dr.quantum@qaiu.edu', linkedinUrl: '#' },
  { id: '2', name: 'Alice', role: 'President', imageUrl: 'https://placehold.co/400x400', dataAiHint: 'woman portrait', email: 'alice@qaiu.edu', linkedinUrl: '#' },
  { id: '3', name: 'Bob', role: 'Vice President', imageUrl: 'https://placehold.co/300x300', dataAiHint: 'man portrait', email: 'bob@qaiu.edu', linkedinUrl: '#' },
  { id: '4', name: 'Charlie', role: 'Treasurer', imageUrl: 'https://placehold.co/300x300', dataAiHint: 'person portrait', email: 'charlie@qaiu.edu', linkedinUrl: '#' },
  { id: '5', name: 'David', role: 'Head of Events', imageUrl: 'https://placehold.co/300x300', dataAiHint: 'person smiling', email: 'david@qaiu.edu', linkedinUrl: '#' },
  { id: '6', name: 'Eve', role: 'Head of Media', imageUrl: 'https://placehold.co/300x300', dataAiHint: 'woman smiling', email: 'eve@qaiu.edu', linkedinUrl: '#' },
];

export const upcomingEvents = [
    { 
      id: 'intro-to-quantum-workshop',
      title: 'Intro to Quantum Computing Workshop', 
      date: '2024-10-26T10:00:00Z', 
      description: 'Join us for a beginner-friendly workshop on the basics of quantum computing and its applications. This session will cover the fundamental concepts of qubits, superposition, and entanglement, providing a solid foundation for anyone interested in the quantum realm.', 
      imageUrl: 'https://placehold.co/1200x600',
      dataAiHint: 'workshop classroom',
      location: 'AIU Campus, Auditorium B',
      gallery: [
        { src: 'https://placehold.co/600x400', alt: 'Students learning', dataAiHint: 'students learning' },
        { src: 'https://placehold.co/600x400', alt: 'Presenter on stage', dataAiHint: 'presentation stage' },
        { src: 'https://placehold.co/600x400', alt: 'Group discussion', dataAiHint: 'group discussion' },
      ]
    },
    { 
      id: 'qiskit-hackathon-2024',
      title: 'Qiskit Hackathon 2024', 
      date: '2024-11-15T09:00:00Z', 
      description: 'A 2-day hackathon focused on solving real-world problems using IBM\'s Qiskit. Participants will form teams and compete for prizes by developing innovative quantum applications. Mentors from industry and academia will be available to guide teams.', 
      imageUrl: 'https://placehold.co/1200x600',
      dataAiHint: 'hackathon event',
      location: 'Online',
      gallery: [
        { src: 'https://placehold.co/600x400', alt: 'Team coding', dataAiHint: 'team coding' },
        { src: 'https://placehold.co/600x400', alt: 'Winning team', dataAiHint: 'award ceremony' },
        { src: 'https://placehold.co/600x400', alt: 'Mentoring session', dataAiHint: 'mentor student' },
      ]
    },
];

export const pastEvents = [
    { 
      id: 'future-of-ai-panel',
      title: 'Panel: The Future of AI and Quantum', 
      date: '2024-05-20T14:00:00Z', 
      description: 'A discussion with industry experts on the synergy between artificial intelligence and quantum computing. We explored the potential breakthroughs and challenges in this exciting intersection, followed by a lively Q&A session with the audience.', 
      imageUrl: 'https://placehold.co/1200x600',
      dataAiHint: 'panel discussion',
      location: 'AIU Main Hall',
      gallery: [
        { src: 'https://placehold.co/600x400', alt: 'Panelists on stage', dataAiHint: 'panel discussion' },
        { src: 'https://placehold.co/600x400', alt: 'Audience Q&A', dataAiHint: 'audience conference' },
        { src: 'https://placehold.co/600x400', alt: 'Networking event', dataAiHint: 'networking event' },
      ]
    },
    { 
      id: 'qml-seminar',
      title: 'Quantum Machine Learning Seminar', 
      date: '2024-04-12T16:00:00Z', 
      description: 'A deep dive into the algorithms and potential of Quantum Machine Learning (QML). The seminar covered topics such as quantum kernels, variational quantum classifiers, and their potential applications in fields like drug discovery and financial modeling.', 
      imageUrl: 'https://placehold.co/1200x600',
      dataAiHint: 'seminar presentation',
      location: 'Faculty of CS, Room 301',
      gallery: [
        { src: 'https://placehold.co/600x400', alt: 'Technical diagram on screen', dataAiHint: 'technical diagram' },
        { src: 'https://placehold.co/600x400', alt: 'Speaker presenting', dataAiHint: 'lecturer presentation' },
        { src: 'https://placehold.co/600x400', alt: 'Engaged audience', dataAiHint: 'audience lecture' },
      ]
    },
];

export const blogPosts = [
    { id: '1', title: 'Understanding Qubits: Beyond 0 and 1', author: 'Alice', date: '2024-09-01T11:00:00Z', excerpt: 'A fundamental look into the building blocks of quantum computers and what makes them so powerful.' },
    { id: '2', title: 'My Journey into Quantum: A Student\'s Perspective', author: 'Charlie', date: '2024-08-22T15:00:00Z', excerpt: 'Discover how a computer science student found a passion for the quantum realm.' },
    { id: '3', title: 'Can Quantum Computers Break Cryptography?', author: 'Bob', date: '2024-08-15T10:00:00Z', excerpt: 'Exploring Shor\'s algorithm and the implications of quantum computing for modern-day security.' },
];
