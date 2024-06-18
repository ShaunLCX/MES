const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables from .env file
const config = require('./config/config.js'); // Use config.js instead of config.json

// Initialize Sequelize
const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
  host: config.development.host,
  dialect: config.development.dialect,
  dialectOptions: config.development.dialectOptions
});

// Import models
const Production = require('./models/Production')(sequelize, Sequelize.DataTypes);
const QualityControl = require('./models/QualityControl')(sequelize, Sequelize.DataTypes);

// Set up associations
Production.associate({ QualityControl });
QualityControl.associate({ Production });

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Dashboard endpoint
app.get('/dashboard', async (req, res) => {
  const productionCount = await Production.count();
  const qualityControlCount = await QualityControl.count();
  const defects = await QualityControl.sum('defects');
  res.json({ productionCount, qualityControlCount, defects });
});

// Production endpoints
app.get('/production', async (req, res) => {
  const productions = await Production.findAll();
  res.json(productions);
});

app.post('/production', async (req, res) => {
  const production = await Production.create(req.body);
  res.json(production);
});

app.put('/production/:id', async (req, res) => {
  const { name, status } = req.body;
  const production = await Production.findByPk(req.params.id);
  if (production) {
    production.name = name;
    production.status = status;
    production.updatedAt = new Date();
    await production.save();
    res.json({ message: 'Production updated', production });
  } else {
    res.status(404).json({ message: 'Production not found' });
  }
});

app.delete('/production/:id', async (req, res) => {
  await Production.destroy({ where: { id: req.params.id } });
  res.json({ message: 'Production deleted' });
});

// Quality Control endpoints
app.get('/quality-control', async (req, res) => {
  const inspections = await QualityControl.findAll({
    include: [{ model: Production, attributes: ['name'] }]
  });
  res.json(inspections);
});

app.post('/quality-control', async (req, res) => {
  const inspection = req.body;

  const inspectionData = {
    productionId: inspection.productionId,
    inspectionDate: inspection.inspectionDate ? new Date(inspection.inspectionDate) : null,
    result: inspection.result,
    defects: inspection.defects,
    createdAt: new Date().toISOString() 
  };
  

  const inspectionRes = await QualityControl.create(inspectionData);
  res.json(inspectionRes);
});

app.put('/quality-control/:id', async (req, res) => {
  await QualityControl.update(req.body, { where: { id: req.params.id } });
  res.json({ message: 'Inspection updated' });
});

app.delete('/quality-control/:id', async (req, res) => {
  await QualityControl.destroy({ where: { id: req.params.id } });
  res.json({ message: 'Inspection deleted' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
