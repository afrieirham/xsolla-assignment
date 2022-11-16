import { Flex, Heading, Select, SimpleGrid, Text } from "@chakra-ui/react"
import { useState } from "react"
import { data } from "./data"
import EventCard from "./components/EventCard"

function App() {
  const [events] = useState(data)



  return (
    <Flex maxWidth='900px' mx='auto' mt='22' flexDirection='column'>
      <Heading> Event Listing</Heading>
      <Flex mt='4'>
        <Flex alignItems='center' mr='4'>
          <Text mr='2'>City:</Text>
          <Select>
            <option>Amsterdam</option>
            <option>Amsterdam</option>
            <option>Amsterdam</option>
            <option>Amsterdam</option>
          </Select>
        </Flex>
        <Flex alignItems='center'>
          <Text mr='2'>Month:</Text>
          <Select>
            <option>January</option>
            <option>February</option>
            <option>March</option>
            <option>April</option>
            <option>May</option>
            <option>June</option>
            <option>July</option>
            <option>August</option>
            <option>September</option>
            <option>October</option>
            <option>November</option>
            <option>December</option>
          </Select>
        </Flex>
      </Flex>
      <SimpleGrid columns='2' spacing='6' mt='4' mb='16'>
        {events?.map(event => <EventCard {...event} />)}
      </SimpleGrid>
    </Flex>
  )
}

export default App
