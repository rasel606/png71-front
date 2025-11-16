// src/utils/api.js
export const launchGameApi = async (game_id, p_code,) => {
  try {
    const response = await fetch(`http://localhost:5000/api/v1/launch_gamePlayer/${game_id}/${p_code}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('png71-user')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to launch game');
    }

    const data = await response.json();
    console.log('Launch game API response:', data.gameUrl);
    return {
      gameUrl: data.gameUrl,
    //   providerLogo: data.providerLogo,
    //   providerName: data.providerName,
     
    //   userIp: data.userIp,
    };
  } catch (error) {
    console.error('Launch game API error:', error);
    throw error;
  }
};
