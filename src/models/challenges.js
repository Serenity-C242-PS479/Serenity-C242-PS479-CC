module.exports = (sequelize, DataTypes) => {
    const Challenge = sequelize.define(
        "challenges",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            userId: {
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
            startHour: {
                type: DataTypes.TIME,
                allowNull: false
            },
            endHour: {
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
            foreignKey: "userId",
            as: "user"
        });
    };

    return Challenge;
};