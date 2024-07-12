const { User, Attraction, Favorite } = require('../models/models');

class FavoritesController {
  async addToFavorites(req, res) {
    try {
      const { attractionId } = req.body;
      const userId = req.user.id;

      const attraction = await Attraction.findByPk(attractionId);
      if (!attraction) {
        return res.status(404).json({ error: 'Attraction not found' });
      }

      const existingFavorite = await Favorite.findOne({
        where: {
          UserId: userId,
          AttractionId: attractionId,
        },
      });
      if (existingFavorite) {
        return res.status(400).json({ error: 'Attraction already in favorites' });
      }

      const newFavorite = await Favorite.create({
        UserId: userId,
        AttractionId: attractionId,
      });

      return res.status(201).json(newFavorite);
    } catch (error) {
      console.error('Error in addToFavorites:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async removeFromFavorites(req, res) {
    try {
      const { attractionId } = req.body;
      const userId = req.user.id;

      const favorite = await Favorite.findOne({
        where: {
          UserId: userId,
          AttractionId: attractionId,
        },
      });

      if (!favorite) {
        return res.status(404).json({ error: 'Favorite not found' });
      }

      await favorite.destroy();

      return res.status(200).json({ message: 'Attraction removed from favorites' });
    } catch (error) {
      console.error('Error in removeFromFavorites:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getFavoriteAttractions(req, res) {
    try {
      const userId = req.user.id;
  
      const favoritedAttractions = await Favorite.findAll({
        where: {
          userId: userId,
        },
        include: [
          {
            model: Attraction,
            required: true,
          },
        ],
      });
  
      const attractions = favoritedAttractions.map((favorite) => favorite.Attraction);
      return res.json(attractions);
    } catch (error) {
      console.error('Ошибка при получении избранных достопримечательностей:', error);
      return res.status(500).json({ error: 'Произошла ошибка при получении избранных достопримечательностей.' });
    }
  }
  

}

module.exports =  new FavoritesController();