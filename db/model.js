const  {conn} = require("./conn")
const {DataTypes} = require("sequelize")

// const account = conn.define("accounts")
const User = conn.define('User', {
    uid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      unique:true,
      // allowNull: false,
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
    tableName: 'users',
    timestamps: true,
    underscored: true,
});
  
const Business = conn.define('Business', {
    uid: {
      type: DataTypes.STRING,
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
      type: DataTypes.JSON,
      // defaultValue: 'Food',
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
    total_reviews:{
      type:DataTypes.INTEGER,
      defaultValue:0
    },

    review_count:{
      type:DataTypes.JSON,
      defaultValue:{
        1:0,
        2:0,
        3:0,
        4:0,
        5:0,
      }
    }

  }, {
    tableName: 'business',
    timestamps: true,
    underscored: true,
});

const BusinessHours = conn.define("BusinessHour", {
  businessId:{
    type:DataTypes.INTEGER
  },
  Mon:{
    type:DataTypes.JSON
  },
  Tue:{
    type:DataTypes.JSON
  },
  Wed:{
    type:DataTypes.JSON
  },
  Thur:{
    type:DataTypes.JSON
  },
  Fri:{
    type:DataTypes.JSON
  },
  Sat:{
    type:DataTypes.JSON
  },
  Sun:{
    type:DataTypes.JSON
  }
}, {tableName:"BusinessHour"})
  
const Review = conn.define('Review', {
    reviewer_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    business_id: {
      type: DataTypes.INTEGER,
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

// const Product = conn.define('Product', {
//     business_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//           },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     price: {
//       type: DataTypes.FLOAT,
//       defaultValue: 0.0,
//     },
//     description: {
//       type: DataTypes.TEXT,
//       allowNull: true,
//     },
    
//   }, {
//     tableName: 'products',
//     timestamps: true,
//     underscored: true,
// });
  
// const ProductImage = conn.define('ProductImage', {
    
//     owner_id: {
//       type: DataTypes.INTEGER,
      
//     },
//     product_id: {
//       type: DataTypes.UUID,
//       allowNull: false,
      
//     },
//     url: {
//       type: DataTypes.STRING,
//       allowNull: true,
//       defaultValue: '',
//     },
    
//   }, {
//     tableName: 'product_images',
//     timestamps: true,
//     underscored: true,
// });
  
// const Catalogue = conn.define('Catalogue', {
//     user_id: {
//       type: DataTypes.UUID,
//       allowNull: false,
//       references: {
//         model: Business,
//         key: 'id',
//       },
//     },
//     items: {
//       type: DataTypes.JSON,
//       allowNull: true,
//     },
    
//   }, {
//     tableName: 'catalogues',
//     timestamps: true,
//     underscored: true,
// });

User.hasOne(Business, {foreignKey:"uid", sourceKey:"uid"})
Business.belongsTo(User, { foreignKey: 'uid' , targetKey:"uid"});
Business.hasOne(BusinessHours, {foreignKey:"businessId", sourceKey:"id"})
BusinessHours.belongsTo(Business, {foreignKey:"businessId", targetKey:"id"})


// Product.belongsTo(Business, { foreignKey: 'business_id' });
// ProductImage.belongsTo(Business, { foreignKey: 'owner_id' });
// ProductImage.belongsTo(Product, { foreignKey: 'product_id' });
// Catalogue.belongsTo(Business, { foreignKey: 'user_id' });

async function sync(){
  
  await Business.sync({alter:true})
  await User.sync({alter:true})
  await BusinessHours.sync({alter:true})
  await Review.sync({alter:true})
  // await Product.sync({alter:true})
  // await ProductImage.sync({alter:true})
  // await Catalogue.sync({alter:true})
}

const isDevelopment = process.env.DEVELOPMENT === "true";

if (!isDevelopment){
  sync()
}
// sync()

module.exports = {
    User,
    Business,
    Review,
    BusinessHours
    // ProductImage,
    // Product,
    // Catalogue
}


