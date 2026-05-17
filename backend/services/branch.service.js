const { Branch } = require('../models');
const { Op } = require('sequelize');

const getAll = async () =>
  Branch.findAll({ where: { is_active: true }, order: [['city', 'ASC'], ['name', 'ASC']] });

const getById = async (id) => {
  const branch = await Branch.findByPk(id);
  if (!branch) {
    const err = new Error('Branch not found');
    err.statusCode = 404;
    throw err;
  }
  return branch;
};

const findNearest = async (userLat, userLng) => {
  const branches = await getAll();
  const withDistance = branches.map((b) => {
    const lat = parseFloat(b.lat);
    const lng = parseFloat(b.lng);
    const R = 6371;
    const dLat = ((lat - userLat) * Math.PI) / 180;
    const dLon = ((lng - userLng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((userLat * Math.PI) / 180) *
        Math.cos((lat * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    const km = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return { ...b.toJSON(), distance_km: Math.round(km * 100) / 100 };
  });
  return withDistance.sort((a, b) => a.distance_km - b.distance_km);
};

const getByCity = async (city) =>
  Branch.findAll({
    where: { city: { [Op.like]: `%${city}%` }, is_active: true },
  });

module.exports = { getAll, getById, findNearest, getByCity };
