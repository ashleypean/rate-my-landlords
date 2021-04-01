const axios = require('axios')
require('dotenv').config()
const mongoose = require('mongoose')

/*-------------------------------------COMMON HEADERS-------------------------------------*/
axios.defaults.headers.common['accept'] = 'application/json'
axios.defaults.headers.common['apikey'] = process.env.ATOM_KEY_3
/*-------------------------------------COMMON HEADERS-------------------------------------*/


const findLandlordsByAddress = async (__, args, context) => {
  let propertyList = [{name: "No results found", id: "0", street:  "No results found", city:  "No results found", state:  "No results found", zipcode:  "No results found"}]
  let mainAddress
  let landlordId
  console.log('finding')
  try {
    const data = await fetchPropertiesByAddress(args)
    if(data?.property) {
      const { property } = data
      const { address } = property[0]
      mainAddress = address
      const landlordList = getMultipleOwnersandGenerateSchema(property)
      const databaseInsert = await insertLandlords(landlordList, context, address)
      propertyList = generateReturnSchema(databaseInsert, address)
      landlordId = propertyList[0].id
    }
    return propertyList
  }catch(err) {
    console.log('error', err)
    return propertyList
  } finally {
    if(mainAddress) {
      const propertySchema = generatePropertySchema(mainAddress, landlordId)
      insertProperties(propertySchema, context)
    }
  }
}


//Fetch data from API to get owner(s) name(s)
const fetchPropertiesByAddress = async (args) => {
  console.log('fetching')
  const {street, city, state} = args
  const url = process.env.ATOM_URL_FULL_ADDRESS 
  const res = await axios.get(url, {
    params: {
      address1: street, 
      address2: city + ' ' + state
    }
  })  
  console.log(res.data)
  return res.data 
}

const getMultipleOwnersandGenerateSchema = (propertyData) => {
  const landlordList = []

  const generateLandlordSchema = ({name}) => {
    const splitName = name.trim().split(' ')
    const firstName = (splitName[0] || ' ')
    const lastName = (splitName[splitName.length - 1] || ' ')
    return {
      firstName, 
      lastName,
      overallRating: (Math.random() * 5.1).toFixed(2),
      wouldRentAgainLevel:Math.floor(Math.random() * 101),
      tags: [], 
      friendlinessRating:( Math.random() * 5.1).toFixed(2),
      communcicationRating:( Math.random() * 5.1).toFixed(2),
      maintenanceRating:( Math.random() * 5.1).toFixed(2),
      responsivenessRating:( Math.random() * 5.1).toFixed(2),
      transactionIssue: (Math.random() * 101).toFixed(2), 
      properties: []
    }
  }

  propertyData.forEach( property => {
    for(let i = 1; i < 5; i++) {
      if(property.assessment.owner[`owner${i}`].lastName) {
        const { firstNameAndMi, lastName} = property.assessment.owner[`owner${i}`]
        const name = firstNameAndMi + ' ' + lastName
        landlordList.push(generateLandlordSchema({name}))
      }
    }
  })

  return landlordList
}

const insertLandlords = async (landlordList, context, address) => {
  try {
    const data =  await Promise.allSettled(
      landlordList.map(async landlord =>  {
        const res = context.Landlords.findOneAndUpdate(
                      {"firstName": landlord.firstName, "lastName": landlord.lastName}, 
                      {$setOnInsert: landlord}, 
                      {upsert: true, new: true, useFindAndModify: false}, 
                    ).exec()
        return res
      }))

      return data
  }catch(err) {
    return [{name: "No results found", id: "0", street:  "No results found", city:  "No results found", state:  "No results found", zipcode:  "No results found"}]
  }
}

const generateReturnSchema = (databaseInsert, address) => {
  const { line1, locality, countrySubd, postal1 } = address
  return databaseInsert.map(landlord => {
    const { value } = landlord 
    return {
      name: value.firstName + " " + value.lastName,
      id: value._id, 
      street: line1, 
      city: locality, 
      state: countrySubd, 
      zipcode: postal1
    }
  })
}


const generatePropertySchema = (address, landlordId) => {
  const { line1, locality, countrySubd, postal1 } = address 
  return {
    landlord: landlordId, 
    address: {
      streetAddress1: line1, 
      city: locality, 
      state: countrySubd,
      zipcode: postal1
    }, 
    management: landlordId, 
    type: "Residential", 
    cleanliness: (Math.random() * 5.1).toFixed(2), 
    neighborsVibes: [], 
    propertyIssues: [], 
    noiseLevelRating: (Math.random() * 5.1).toFixed(2), 
    reviews: []
  }
}

const insertProperties = async (schema, context) => {
  const property =  await context.Properties.findOneAndUpdate(
    {address: schema.address}, 
    {$setOnInsert: schema}, 
    {upsert: true, new: true, useFindAndModify: false}, 
  ).exec()
  return property
}

module.exports =  {
  findLandlordsByAddress, 

}
