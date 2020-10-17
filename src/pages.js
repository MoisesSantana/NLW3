const Database = require('./database/db');
const saveOrphanage = require('./database/saveOrphanage');

module.exports = {
  index(request, response) {
    return response.render('index');
  },

  async orphanage(request, response) {
    const id = request.query.id;
    try {
      const db = await Database;
      const results = await db.all(`SELECT * FROM orphanages WHERE id = "${id}"`);
      const orphanage = results[0];

      orphanage.images = orphanage.images.split(',');
      orphanage.firstImage = orphanage.images[0];

      orphanage.open_on_weekends === '0' ? orphanage.open_on_weekends = false : orphanage.open_on_weekends = true;

      return response.render('orphanage', { orphanage });
    } catch (error) {
      console.log(error);

      return response.send('Função orphanage no src/pages.js encontrou - ---> Erro no banco de dados! <---');
    }
  },

  async orphanages(request, response) {
    try {
      const db = await Database;
      const orphanages = await db.all("SELECT * FROM orphanages");

      return response.render('orphanages', { orphanages });
    } catch (error) {
      console.log(error);

      return response.send('Função orphanages no src/pages.js encontrou - ---> Erro no banco de dados! <---');
    }
  },

  createOrphanage(request, response) {
    return response.render('create-orphanage');
  },
};