const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
  type LandlordSearchResult {
    name: String 
    id: ID 
    street: String 
    city: String 
    state: String 
    zipcode: String
  }

  type LandlordStats {
    name: String
    overallRating: Int 
    wouldRentAgainLevel: Int 
    tags: [String]
    friendlinessRating: Int 
    communicationRating: Int 
    maintenanceRating: Int
    responsivenessRating: Int
    transactionsIssues: Int
  }

  type PropertyStats {
    cleanliness: Int
    noiseLevel: Int 
    commonPropertyIssues: [String]
    commonNeighborTrais: [String]
  }

  type LandlordReview {
    wouldRentAgain: Boolean
    friendlinessRating: Int
    communicationRating: Int 
    responsivenessRating: Int
    maintenanceRating: Int
    transactionIssues: Boolean 
    user: String
  }

  type PropertyReview {
    moveInDate: String
    moveOutDate: String
    cleanliness: Int
    neighborsVibes: [String]
    propertyIssues: [String]
    noiseLevelRating: Int
    user: String
  }

  type User {
    name: String
    username: String
    email: String
    DOB: String
    properties: [ID]
  }

  type FullLandLordProfile {
    LandlordStats: LandlordStats 
    PropertyStats: PropertyStats
    LandlordReviews: [LandlordReview]
    PropertyReviews: [PropertyReview]
  }

  input Address {
    street: String, 
    city: String, 
    state: String, 
    zipcode: String
  }


  type Query {
    hello: String 
    findLandlordsByAddress(street: String, city: String, state: String, zipcode: String): [LandlordSearchResult] 
    findLandordById(id: ID) : FullLandLordProfile,
    getProperties: String
  }


  input LandlordReviewInputs {
    wouldRentAgain: Boolean
    friendlinessRating: Int
    communicationRating: Int
    responsiveNessRating: Int
    maintenanceRating: Int
    transactionIssues: Boolean
  }
  type LandlordReviewOutputs {
    wouldRentAgain: Boolean
    friendlinessRating: Int
    communicationRating: Int
    responsiveNessRating: Int
    maintenanceRating: Int
    transactionIssues: Boolean
  }

  input PropertyReviewInputs {
    moveInDate: String
    moveOutDate: String
    cleanliness: Int
    neighborsVibes: [String]
    propertyIssues: [String]
    noiseLevelRating: Int
  }
  type PropertyReviewOutputs {
    moveInDate: String
    moveOutDate: String
    cleanliness: Int
    neighborsVibes: [String]
    propertyIssues: [String]
    noiseLevelRating: Int
  }

#   input AddReviewInput {
#     landlord_id: String 
#     user_id: String
#     landlordReview: LandlordReviewInput
#     propertyReview: PropertyReviewInput
#   }

#   type AddReviewOutPut {
#     landlord_id: String 
#     user_id: String
#     landlordReview: LandlordReviewInput
#     propertyReview: PropertyReviewInput
#   }

  type Mutation {
    # addReview(input: AddReviewInput): AddReviewOutPut
    addReview(
      landlordReviewInputs: LandlordReviewInputs, 
      propertyReviewInputs: PropertyReviewInputs, 
    ): LandlordReviewOutputs,

  }
`;

module.exports = typeDefs;