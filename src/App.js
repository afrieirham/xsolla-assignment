import { useEffect, useState } from "react"
import { Flex, Heading, Select, SimpleGrid, Text } from "@chakra-ui/react"

import { API_URL, months } from "./constants"
import EventCard from "./components/EventCard"

const fetcher = (url) => fetch(url).then((res) => res.json())

function App() {
  const [events, setEvents] = useState([])
  const [cities, setCities] = useState([])

  const setupEvents = async () => {
    const data = await fetcher(API_URL)
    setEvents(data)
  }

  useEffect(() => {
    setupEvents()
  }, [])

  // Setup list of city
  useEffect(() => {
    if (events.length > 0) {
      const cities = [...new Set(events.map(({ city }) => city))]
      setCities(cities)
    }
  }, [events])

  return (
    <Flex maxWidth='900px' mx='auto' mt='22' flexDirection='column'>
      <Heading> Event Listing</Heading>
      <Flex mt='4'>
        <Flex alignItems='center' mr='4'>
          <Text mr='2'>City:</Text>
          <Select placeholder="Select city">
            {cities?.map(city =>
              <option value={city.toLowerCase()}>{city}</option>
            )}

          </Select>
        </Flex>
        <Flex alignItems='center'>
          <Text mr='2'>Month:</Text>
          <Select placeholder="Select month">
            {months.map(({ title, value }) => <option key={value} value={value}>{title}</option>)}
          </Select>
        </Flex>
      </Flex>
      <SimpleGrid columns='2' spacing='6' mt='4' mb='16'>
        {events?.map(event => <EventCard key={event.id} {...event} />)}
      </SimpleGrid>
    </Flex>
  )
}

export default App
