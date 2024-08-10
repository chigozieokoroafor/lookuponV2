const  {conn} = require("./conn")
const {DataTypes} = require("sequelize")

// const account = conn.define("accounts")
const User = conn.define('User', {
    uid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    }
  }, {
    tableName: 'users',
    timestamps: true,
    underscored: true,
});

const Profile = conn.define('Profile', {
    user_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      references: {
        model: User,
        key: 'uid',
      },
    },
    account_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    firebase_auth: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    alias: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'M',
    },
    profile_url: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    is_business: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
    
  }, {
    tableName: 'profiles',
    timestamps: true,
    underscored: true,
});
  
const Business = conn.define('Business', {
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'uid',
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      defaultValue: 'Food',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    website_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profile_url: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    phone_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    
  }, {
    tableName: 'businesses',
    timestamps: true,
    underscored: true,
});
  
const Review = conn.define('Review', {
    reviewer_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    business_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    
  }, {
    tableName: 'reviews',
    timestamps: true,
    underscored: true,
});

const Product = conn.define('Product', {
    business_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Business,
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    
  }, {
    tableName: 'products',
    timestamps: true,
    underscored: true,
});
  
const ProductImage = conn.define('ProductImage', {
    
    owner_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Business,
        key: 'id',
      },
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Product,
        key: 'id',
      },
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    
  }, {
    tableName: 'product_images',
    timestamps: true,
    underscored: true,
});
  
const Catalogue = conn.define('Catalogue', {
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Business,
        key: 'id',
      },
    },
    items: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    
  }, {
    tableName: 'catalogues',
    timestamps: true,
    underscored: true,
});


Profile.belongsTo(User, { foreignKey: 'user_id' });
Business.belongsTo(User, { foreignKey: 'user_id' });
Product.belongsTo(Business, { foreignKey: 'business_id' });
ProductImage.belongsTo(Business, { foreignKey: 'owner_id' });
ProductImage.belongsTo(Product, { foreignKey: 'product_id' });
Catalogue.belongsTo(Business, { foreignKey: 'user_id' });

async function sync(){
  await Profile.sync({alter:true})
  await Business.sync({alter:true})
  await User.sync({alter:true})
  await Review.sync({alter:true})
  await Product.sync({alter:true})
  await ProductImage.sync({alter:true})
  await Catalogue.sync({alter:true})
}

sync()

module.exports = {
    User,
    Profile,
    Business,
    Review,
    ProductImage,
    Product,
    Catalogue
}


