// middleware.ts
interface UserData {
  email: string;
  password: string;
  [key: string]: any;
}

async function registerUser(userData: UserData): Promise<void> {
  try {
    const response = await fetch('https://localhost:5000/api/user/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    console.log(JSON.stringify(userData));

    if (!response.ok) {
      const error: { message: string } = await response.json();
      throw new Error(error.message);
    }

    localStorage.setItem('jwt', 'data.token');

    const data = await response.json();
    console.log('Registered user:', data);
  } catch (err) {
    if (err instanceof Error) {
      console.error('Error registering user:', err.message);
      throw err;
    } else {
      console.error('Unknown error registering user:', err);
      throw new Error('Unknown error registering user');
    }
  }
}

async function loginUser(userData: UserData): Promise<void> {
  try {
    const response = await fetch('https://localhost:5000/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const error: { message: string } = await response.json();
      throw new Error(error.message);
    }

    const data = await response.json();

    console.log('*** ' + data.token + ' ***');

    localStorage.setItem('jwt', data.token);

    console.log('Logined user:', data);
  } catch (err) {
    if (err instanceof Error) {
      console.error('Error logging in user:', err.message);
      throw err;
    } else {
      console.error('Unknown error logging in user:', err);
      throw new Error('Unknown error logging in user');
    }
  }
}

async function getAllFavoritesByUserId(jwt: string): Promise<any> {
  try {
    const response = await fetch('https://localhost:5000/api/favorites/getAllById', {
      headers: {
        'Authorization': `Bearer ${jwt}`
      }
    });

    if (response.ok) {
      return await response.json();
    } else {
      console.error('Error getting favorites:', response.status);
      throw new Error(`Error getting favorites: ${response.status}`);
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error('Error executing request:', err.message);
      throw err;
    } else {
      console.error('Unknown error executing request:', err);
      throw new Error('Unknown error executing request');
    }
  }
}


function hasJWT(): boolean {
  try {
    const token = localStorage.getItem('jwt');
    console.log(token);
    return token !== null && token !== '';
  } catch (err) {
    if (err instanceof Error) {
      console.error('Error checking JWT:', err.message);
      return false;
    } else {
      console.error('Unknown error checking JWT:', err);
      return false;
    }
  }
}

export default {
  registerUser,
  loginUser,
  getAllFavoritesByUserId,
  hasJWT
};