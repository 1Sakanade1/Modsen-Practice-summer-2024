
//запрос к серверу при регистрации пользователя
async function registerUser(userData) {
  
    try {
      const response = await fetch('http://localhost:5000/api/user/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      console.log(JSON.stringify(userData))
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      localStorage.setItem('jwt', data.token);
  
      const data = await response.json();
      console.log('Registered user:', data);
    } catch (error) {
      console.error('Error registering user:', error.message);
      throw error;
    }
  }

async function loginUser(userData) {
  
    try {
      const response = await fetch('http://localhost:5000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
  
      const data = await response.json();


      console.log('*** ' + data.token + ' ***');

      localStorage.setItem('jwt', data.token);


      console.log('Logined user:', data);
    } catch (error) {
      console.error('Error loginning user:', error.message);
      throw error;
    }
  }
  
  async function getAllFavoritesByUserId(req, res, next) {
    try {
      const jwt = localStorage.getItem('jwt');
      const response = await fetch('http://localhost:5000/api/favorites/allById', {
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      });
  
      if (response.ok) {
        const orders = await response.json();
        return orders;
      } else {
        console.error('Ошибка при получении заказов:', response.status);
        throw new Error(`Ошибка при получении заказов: ${response.status}`);
      }
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
      next(error);
    }
  }

  function hasJWT() {
    try {
      const token = localStorage.getItem('jwt');
      console.log(token);
      return token !== null && token !== '';
    } catch (error) {
      console.error('Ошибка при проверке JWT:', error);
      return false;
    }
  }


  export default {registerUser,loginUser,getAllFavoritesByUserId,hasJWT}