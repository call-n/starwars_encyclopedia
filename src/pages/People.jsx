import { useEffect, useState, useRef, useCallback } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useSearchParams } from 'react-router-dom'
import { search, getIdFromUrl } from '../services/SwapiAPI'

function People() {
    const [page, setPage] = useState(1)
    const [people, setPeople] = useState(false)
    const [loading, setLoading] = useState(false)
    const [searchInput, setSearchInput] = useState('')
	const [searchResult, setSearchResult] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
	const searchInputRef = useRef()

    const query = searchParams.get('query')


    const getThePeople = useCallback( async (searchQuery, thePage) => {
		setLoading(true)
        setSearchResult(null)

		const data = await search(searchQuery, thePage)

        if(data.next) {
            setSearchParams({ query: searchInput, page: page })
        }

        console.log(data)
        setSearchResult(data)
        setPeople(data)
		setLoading(false)
	}, [page, searchInput, setSearchParams])

    const handleSubmit = async e => {
		e.preventDefault()

		if (!searchInput.length) {
			return
		}

		setPage(1)

		setSearchParams({ query: searchInput})
	}


    useEffect(() => {
        if (!query) {
			setSearchInput('')
			setSearchResult(null)
			return
		}

        setSearchInput(query)
		getThePeople(query, page)
	}, [query, page, getThePeople])

  return (
    <>
			<h1>🍿🎥🥤</h1>

            <Form onSubmit={handleSubmit}>
				<Form.Group className="mb-3" controlId="newTitle">
					<Form.Label>Search Query</Form.Label>
					<Form.Control
						onChange={e => setSearchInput(e.target.value)}
						placeholder="Enter your search query"
						ref={searchInputRef}
						required
						type="text"
						value={searchInput}
					/>
				</Form.Group>

				<div className="d-flex justify-content-between">
					<Button variant="success" type="submit" disabled={!searchInput.length}>Search</Button>
				</div>
			</Form>

			{loading && (<div className="mt-4">Loading...</div>)}

			{searchResult && (
				<div className="search-result mt-4">
                    <p>Showing {searchResult.nbHits} search results for {searchInput}...</p>

                    <Row xs={1} md={3} className="g-4">
						{people.results.map((char, index) => (
							<Col key={index + 1}>
                                <Card>
								<Card.Header as="h4">{char.name}</Card.Header>
									<ListGroup variant="flush" className="p-2">
										<ListGroup.Item><b>Gender</b> {char.gender}</ListGroup.Item>
										<ListGroup.Item><b>Born</b> {char.birth_year}</ListGroup.Item>
										<ListGroup.Item><b>In</b> {char.films.length} films</ListGroup.Item>
                                        <ListGroup.Item>
											<Button 
                                                variant="primary" 
                                                href={`/people/${getIdFromUrl(char.url)}`}
                                                >
                                                    Read more →
                                            </Button>
										</ListGroup.Item>
                                    </ListGroup>
                                </Card>
							</Col>
						))}
					</Row>

					<div className="d-flex justify-content-between align-items-center mt-4">
						<div className="prev">
							<Button
								disabled={people.previous === null }
								onClick={() => setPage(prevValue => prevValue - 1)}
								variant="primary"
							>Previous Page</Button>
						</div>
						<div className="page">{page} / {Math.ceil(people.count / 10)}</div>
						<div className="next">
							<Button
								disabled={people.next === null}
								onClick={() => setPage(prevValue => prevValue + 1)}
								variant="primary"
							>Next Page</Button>
						</div>
					</div>
				</div>
			)}
		</>
  )
}

export default People