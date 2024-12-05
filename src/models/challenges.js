module.exports = (sequelize, DataTypes) => {
    const Challenge = sequelize.define(
        "challenges",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id"
                }
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Title cannot be empty"
                    }
                }
            },
            start_hour: {
                type: DataTypes.TIME,
                allowNull: false
            },
            end_hour: {
                type: DataTypes.TIME,
                allowNull: false
            },
            status: {
                type: DataTypes.ENUM("On Progress", "Passed", "Failed"),
                allowNull: false,
                defaultValue: "On Progress"
            }
        },
        {
            timestamps: true,
        }
    );

    Challenge.associate = (models) => {
        Challenge.belongsTo(models.users, {
            foreignKey: "user_id",
            as: "user"
        });
    };

    return Challenge;
};