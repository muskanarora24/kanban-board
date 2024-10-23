import axios from 'axios';

const API_URL = 'https://api.quicksell.co/v1/internal/frontend-assignment';

export const fetchTickets = async () => {
  try {
    const response = await axios.get(API_URL);
    // Assuming the API returns data in the structure you provided
    const { tickets, users } = response.data;
    return { tickets, users };
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return { tickets: [], users: [] };
  }
};
