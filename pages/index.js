import Link from "next/link";
import Image from "next/image";
import { Flex, Box, Text, Button } from "@chakra-ui/react";

import { baseUrl, fetchApi } from "../utils/fetchApi";

import Property from "../components/Property";
import DefaultImage from '../assets/images/rumah.jpg'

const Banner = ({
  purpose,
  title1,
  title2,
  desc1,
  desc2,
  buttonText,
  linkName,
  imageUrl,
}) => {
  return (
    <Flex flexWrap="wrap" justifyContent="center" alignItems="center">
      <Image src={imageUrl} width={500} height={300} alt="Banner" />
      <Box p="5" mb="120">
        <Text color="gray.500" fontSize="sm" fontWeight="medium">
          {purpose}
        </Text>
        <Text fontSize="3xl" fontWeight="bold">
          {title1}
          <br />
          {title2}
        </Text>
        <Text
          fontSize="lg"
          paddingBottom="3"
          fontWeight="medium"
          color="gray.700"
        >
          {desc1}
          <br />
          {desc2}
        </Text>
        <Button fontSize="xl">
          <Link href={linkName}>{buttonText}</Link>
        </Button>
      </Box>
    </Flex>
  );
};
export default function Home({propertiesForSale, propertiesForRent}) {
  // console.log('Property :',propertiesForSale, propertiesForRent)
  // global.sayHi ="hi";
  return (
    <Box paddingTop="60px">
      <Banner
        purpose="RENT & HOME"
        title1="Rental Homes For"
        title2="Everyone"
        desc1="Explore Apartments, Villages, Homes"
        desc2="and more"
        buttonText="Explore Ranting"
        linkName="/search?purpose=for-rent"
        imageUrl={DefaultImage}
      />
      <Flex flexWrap="wrap">
        {propertiesForRent.map((property) => <Property property={property} key={property.id}/>)}
      </Flex>
      <Banner
        purpose="SALE & HOME"
        title1="Sale Homes For"
        title2="Everyone"
        desc1="Explore Apartments, Villages, Homes"
        desc2="and more"
        buttonText="Explore Buying"
        linkName="/search?purpose=for-sale"
        imageUrl={DefaultImage}
      />
         <Flex flexWrap="wrap">
         {propertiesForSale.map((property) => (
            <Property property={property} key={property.id}/>
         ))}
         </Flex>
    </Box>
  );
}

export async function getStaticProps(){
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`)
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`)

  return {
    props : {
      propertiesForSale : propertyForSale?.hits,
      propertiesForRent : propertyForRent?.hits,
    }
  }
}
