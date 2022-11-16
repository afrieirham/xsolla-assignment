import { useState } from "react"
import { Flex, Heading, Select, SimpleGrid, Text } from "@chakra-ui/react"

import { data } from "./data"
import { months } from "./constants"

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
            {months.map(({ title, value }) => <option key={value} value={value}>{title}</option>)}
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
