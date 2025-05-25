export interface User {
  id: string;
  name: string;
  cpf: string;
  password: string;
  nextWorkout?: {
    type: string;
    date: string;
    time: string;
  };
  workoutsCompleted: number;
  joinedDate: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
}

// Mock users data
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'João Silva',
    cpf: '12345678901',
    password: '1234',
    nextWorkout: {
      type: 'Musculação',
      date: '27/05',
      time: '17h'
    },
    workoutsCompleted: 3,
    joinedDate: '2023-01-15'
  },
  {
    id: '2',
    name: 'Maria Oliveira',
    cpf: '98765432101',
    password: '4321',
    nextWorkout: {
      type: 'Pilates',
      date: '28/05',
      time: '10h'
    },
    workoutsCompleted: 5,
    joinedDate: '2023-02-20'
  }
];

// Mock announcements data
export const announcements: Announcement[] = [
  {
    id: '1',
    title: 'Manutenção na Sala de Spinning',
    content: 'A sala de spinning estará fechada dia 29/05 para manutenção dos equipamentos.',
    date: '25/05/2023'
  },
  {
    id: '2',
    title: 'Novos Horários',
    content: 'A partir do próximo mês, teremos aulas de yoga nas terças e quintas às 7h.',
    date: '20/05/2023'
  },
  {
    id: '3',
    title: 'Campanha de Vacinação',
    content: 'Haverá campanha de vacinação contra gripe no próximo sábado, das 9h às 12h.',
    date: '18/05/2023'
  }
];