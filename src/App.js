import { useEffect, useState } from "react"
import { Flex, Heading, Select, SimpleGrid, Text } from "@chakra-ui/react"

import { API_URL, months } from "./constants"
import EventCard from "./components/EventCard"

const fetcher = (url) => fetch(url).then((res) => res.json())

function App() {
  const initialFavourite = JSON.parse(localStorage.getItem('favourites'))
  const [events, setEvents] = useState([])
  const [cities, setCities] = useState([])
  const [favourites, setFavourites] = useState(initialFavourite ?? [])
  const [filter, setFilter] = useState({ city: '', month: '' })

  // helper functions
  const onChange = (e) => setFilter({ ...filter, [e.target.name]: e.target.value })
  const setEventsWithFavourite = (list) => setEvents(list.map(list => ({ favourite: favourites.includes(list.id), ...list })))
  const manageFavourite = {
    add: (id) => setFavourites([...favourites, id]),
    remove: (id) => setFavourites(favourites?.filter(fav => fav !== id)),
  }


  // Setup initial events list
  useEffect(() => {
    const setupEvents = async () => {
      const data = await fetcher(API_URL)
      setEventsWithFavourite(data)
    }
    setupEvents()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Setup list of city
  useEffect(() => {
    const setupCities = async () => {
      const data = await fetcher(API_URL)
      const cities = [...new Set(data.map(({ city }) => city))]
      setCities(cities)
    }
    if (events.length > 0) {
      setupCities()
    }
  }, [events])

  // Handle filtration
  useEffect(() => {
    const filterEvents = async () => {
      const data = await fetcher(API_URL)
      const events = data.filter(({ city, date }) => {
        const month = date.split('.')[1]
        const matchMonth = filter.month === '' || Number(month) === Number(filter.month)
        const matchCity = filter.city === '' || city.toLowerCase() === filter.city
        return matchCity && matchMonth
      })

      setEventsWithFavourite(events)
    }
    filterEvents()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, favourites])

  // Handle favourites in localStorage
  useEffect(() => {
    if (favourites.length > 0) {
      localStorage.setItem('favourites', JSON.stringify(favourites))
    } else {
      localStorage.removeItem('favourites')
    }
  }, [favourites])

  return (
    <Flex maxWidth='900px' mx='auto' mt='22' flexDirection='column'>
      <Heading> Event Listing</Heading>
      <Flex mt='4'>
        <Flex alignItems='center' mr='4'>
          <Text mr='2'>City:</Text>
          <Select name='city' placeholder="Select city" onChange={onChange}>
            {cities?.map(city =>
              <option key={city} value={city.toLowerCase()}>{city}</option>
            )}

          </Select>
        </Flex>
        <Flex alignItems='center'>
          <Text mr='2'>Month:</Text>
          <Select name='month' placeholder="Select month" onChange={onChange}>
            {months.map(({ title, value }) => <option key={value} value={value}>{title}</option>)}
          </Select>
        </Flex>
      </Flex>
      <SimpleGrid columns='2' spacing='6' mt='4' mb='16'>
        {events?.map(event => <EventCard key={event.id} {...event} manageFavourite={manageFavourite} />)}
      </SimpleGrid>
    </Flex>
  )
}

export default App
