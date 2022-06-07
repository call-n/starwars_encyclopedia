import { useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { getAll } from '../services/SwapiAPI'
import { Link } from 'react-router-dom'

function Films() {
    const [page, setPage] = useState(0)
    const [films, setFilms] = useState(false)
    const [loading, setLoading] = useState(false)

    const getTheFilms = async (kind) => {
		// set loading to true
		setLoading(true)

		// execute search
		const data = await getAll(kind)

		// set loading to false
        console.log(data);
        setFilms(data)
		setLoading(false)
	}

    useEffect(() => {
		getTheFilms('films')
	}, [])

  return (
    <>
			<h1>🍿🎥🥤</h1>

			{loading && (<div className="mt-4">Loading...</div>)}

			{films && (
				<div className="search-result mt-4">
					<Row xs={1} md={3} className="g-4">
						{films.results.map((film, index) => (
							<Col key={film.episode_id}>
								<Card>
									<Card.Header as="h4">{film.title}</Card.Header>
									<ListGroup variant="flush" className="p-2">
										<ListGroup.Item><b>Episode</b> {film.episode_id}</ListGroup.Item>
										<ListGroup.Item><b>Released</b> {film.release_date}</ListGroup.Item>
										<ListGroup.Item>{film.characters.length} <b>Characters</b></ListGroup.Item>
										<ListGroup.Item>
											<Button as={Link} to={`/films/${index + 1}`} variant="primary">Read more →</Button>
										</ListGroup.Item>
									</ListGroup>
								</Card>
							</Col>
						))}
					</Row>

					<div className="d-flex justify-content-between align-items-center mt-4">
						<div className="prev">
							<Button
								disabled={films.previous === null}
								onClick={() => setPage(prevValue => prevValue - 1)}
								variant="primary"
							>Previous Page</Button>
						</div>
						<div className="page">{page + 1} / {page + 1}</div>
						<div className="next">
							<Button
								disabled={films.next === null}
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

export default Films