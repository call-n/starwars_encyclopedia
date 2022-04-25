import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import { useParams } from 'react-router-dom'
import { specifics, getIdFromUrl } from '../services/SwapiAPI'

function Film() {
    const [film, setFilm] = useState()
	const { id } = useParams()

	const getFilm = async (kind, id) => {
        console.log(id)
		const data = await specifics(kind, id)
        console.log(data)
		setFilm(data)
	}

	useEffect(() => {
		getFilm('films', id)
	}, [id])

	if (!film) {
		return <p>Loading...</p>
	}

  return (
    <Card>
        <Card.Header as="h3">{film.title}</Card.Header>
        <Card.Body>
            <Row>
                <Col sm={3} as="h3">Attributes</Col>
            </Row>
            <Row>
                <Col sm={3} as="h5">Episode</Col>
                <Col sm={9}>{film.episode_id}</Col>
            </Row>
            <Row>
                <Col sm={3} as="h5">Director</Col>
                <Col sm={9}>{film.director}</Col>
            </Row>
            <Row>
                <Col sm={3} as="h5">Producer</Col>
                <Col sm={9}>{film.producer}</Col>
            </Row>
            <Row>
                <Col sm={3} as="h5">Release Date</Col>
                <Col sm={9}>{film.release_date}</Col>
            </Row>
            <Row>
                <Col sm={3} as="h3" >Links</Col>
            </Row>
            <Row>
                <Col sm={3} as="h3" >Characters</Col>
                <Col sm={9}>
                    <ListGroup>
                        {film.characters.map((link, index) => (
                            <ListGroup.Item key={index + 1}>
                                <a href={`http://localhost:3000/people/${getIdFromUrl(link)}`}>
                                    Character {getIdFromUrl(link)} →
                                </a>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
            <Row>
                <Col sm={3}>
                    <Button variant="secondary" href={'http://localhost:3000/films'}>← Back</Button>
                </Col>
            </Row>
        </Card.Body>
    </Card>
  )
}

export default Film