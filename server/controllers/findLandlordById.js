const axios = require("axios");
require("dotenv").config();

/*-------------------------------------COMMON HEADERS-------------------------------------*/
axios.defaults.headers.common["accept"] = "application/json";
axios.defaults.headers.common["apikey"] = process.env.ATOM_KEY;
/*-------------------------------------COMMON HEADERS-------------------------------------*/

const findLandordById = async (__, args, context) => {
  console.log("function running");
  const { id } = args;
  try {
    const data = await context.Landlords.find({ _id: id })
      .populate({
        path: "reviews",
        populate: {
          path: "reviewedBy",
        },
      })
      .populate("properties");

    const landlordProfile = data[0];
    const reviews = data[0].reviews;
    const properties = data[0].properties;

    const returnObj = {
      LandlordStats: {
        name: landlordProfile.firstName + " " + landlordProfile.lastName,
        overallRating: landlordProfile.overallRating,
        wouldRentAgainLevel: landlordProfile.wouldRentAgainLevel,
        tags: landlordProfile.tags,
        friendlinessRating: landlordProfile.friendlinessRating,
        communicationRating: landlordProfile.communicationRating,
        maintenanceRating: landlordProfile.maintenanceRating,
        responsivenessRating: landlordProfile.responsivenessRating,
        transactionsIssue: landlordProfile.transactionIssue,
      },
      PropertyStats: {
        cleanliness: 2,
        noiseLevel: 2,
        commonPropertyIssues: ["string"],
        commonNeighborTraits: ["string"],
      },
      Reviews: reviews.map((review) => ({
        landlordReview: {
          wouldRentAgain: review.landlordReview.wouldRentAgain,
          friendlinessRating: review.landlordReview.friendlinessRating,
          communicationRating: review.landlordReview.communicationRating,
          responsivenessRating: review.landlordReview.responsivenessRating,
          maintenanceRating: review.landlordReview.maintenanceRating,
          transactionIssues: review.landlordReview.transactionIssues,
        },
        propertyReview: {
          moveInDate: review.propertyReview.moveInDate,
          moveOutDate: review.propertyReview.moveOutDate,
          cleanliness: review.propertyReview.cleanliness,
          neighborsVibes: review.propertyReview.neighborsVibes,
          propertyIssues: review.propertyReview.propertyIssues,
          noiseLevelRating: review.propertyReview.noiseLevelRating,
        },
        reviewBody: review.reviewBody,
        user: review.reviewedBy.firstName + " " + review.reviewedBy.lastName,
      })),
    };

    console.log(returnObj);
  } catch (err) {
    console.log(err);
  }

  return args.id;
};

module.exports = {
  findLandordById,
};


