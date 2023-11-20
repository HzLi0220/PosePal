const sendHistoryData = async (duration, percentage) => {
  const data = {
    duration: duration,
    percentage: percentage,
  };
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/users/history`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
};

const getUserInfo = async () => {
  const token = localStorage.getItem('token');
  fetch(`${process.env.REACT_APP_API_URL}/api/users/user`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      localStorage.setItem('user', JSON.stringify(data));
      return data;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

export { sendHistoryData, getUserInfo };
