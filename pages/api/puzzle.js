import axios from 'axios';

export default async (req, res) => {
  try {
    // Call the golang service
    const response = await axios.get('http://localhost:8080/puzzle');

    // Extract 'fen' and 'moves' from the response
    const { FEN, Moves } = response.data[0];

    console.log('puzzle.js','FEN', FEN, 'Moves', Moves);

    // Return the data
    return res.status(200).json({ FEN, Moves });

  } catch (error) {
    // Handle any errors
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while fetching the puzzle.' });
  }
};
