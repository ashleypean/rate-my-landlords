const { findLandlordsByAddress } = require('./controllers/findLandlordsByAddress2')
const { findLandordById } = require('./controllers/findLandlordById')

const resolvers = {
  Query: {
      findLandlordsByAddress,
      findLandordById,
      hello: () => 'hello', 
      getProperties: async (__, args, context) => {
      const data = await context.Properties.find({})
      console.log(data)
      return 'hello'
      }, 
  },
  Mutation: {
      addReview: async (__, args, context) => {
        const { messageBody } = context
        const landlordReviewObj = {
          wouldRentAgain: args.wouldRentAgain, 
          friendlinessRating: args.friendlinessRating, 
          communicationRating: args.communicationRating, 
          responsivenessRating: args.responsivenessRating,
          maintenanceRating: args.maintenanceRating,
          transactionIssues: args.transactionIssues
        }
        const propertyReviewObj = {
          moveInDate: args.moveInDate, 
          moveOutDate: args.moveOutDate,
          cleanliness: args.cleanliness,
          neighborsVibes: args.neighborsVibes,
          propertyIssues: args.propertyIssues,
          noiseLevelRating: args.noiseLevelRating
        }
        const data  = await context.Reviews.create({
          landlordReview: landlordReviewObj, 
          propertyReview: propertyReviewObj, 
          messageBody
        })
    
        const returnObj = {
          ...data.landlordReview, 
          ...data.propertyReview, 
          messageBody
        }
        console.log(returnObj)
        return returnObj;
      }
  }
};

module.exports = resolvers;