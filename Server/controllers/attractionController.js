
const { Attraction } = require('../models/models');

class AttractionController {
   async getAllAttractions(req, res) {
    try {
      const attractions = await Attraction.findAll();
      res.status(200).json(attractions);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при получении достопримечательностей' });
    }
  }
}

module.exports = new AttractionController();
