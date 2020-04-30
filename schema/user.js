/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_buried_point_recrod', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    project_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    mini_program_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    mini_program_code: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    page_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    page_code: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    gmt_create: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        return this.getDataValue('gmt_create').Format('yyyy-MM-dd HH:mm:ss')
      }
    },
    gmt_modified: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        return this.getDataValue('gmt_modified').Format('yyyy-MM-dd HH:mm:ss')
      }
    },
    page_stay_time: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'user_buried_point_recrod'
  })
}
