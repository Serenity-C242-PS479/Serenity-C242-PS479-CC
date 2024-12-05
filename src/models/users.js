const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "users",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: {
                        msg: "Must be a valid email address"
                    }
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: {
                        args: [6, 100],
                        msg: "Password must be at least 6 characters long"
                    }
                }
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    min: {
                        args: 1,
                        msg: "Age must be greater than 0"
                    },
                    max: {
                        args: 120,
                        msg: "Age must be less than or equal to 120"
                    }
                }
            },
            gender: {
                type: DataTypes.ENUM('Male', 'Female'),
                allowNull: false
            },
            photo_profile: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: null
            }
        },
        {
            timestamps: true,
            hooks: {
                beforeCreate: async(user, options) => {
                    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
                    user.password = hashedPassword;
                }
            }
        }
    );
    
    return User;
}