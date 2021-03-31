const { findLandlordsByAddress } = require('./controllers/findLandlordsByAddress')
const { findLandordById } = require('./controllers/findLandlordById')

const resolvers = {
  Query: {
      findLandlordsByAddress,
      findLandordById,
      hello: () => 'hello', 
      getProperties: async (__, args, context) => {
      const data = await context.RealEstateProperty.find({})
      console.log(data)
      return 'hello'
      }, 
  },
  Mutation: {
      addReview: async (__, args, context) => {
        const { landlordReviewInputs, propertyReviewInputs } = args;
        const data  = await context.Reviews.create({
          landlordReview: landlordReviewInputs, 
          propertyReview: propertyReviewInputs, 
        })
        console.log(data)

        return data;
      }
  }
};

module.exports = resolvers;