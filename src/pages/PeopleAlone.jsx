import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import { useParams } from 'react-router-dom'
import { specifics, getIdFromUrl } from '../services/SwapiAPI'

function PeopleAlone() {
    const [people, setPeople] = useState()
	const { id } = useParams()

	const getPeople = async (kind, id) => {
        console.log(id)
		const data = await specifics(kind, id)
        console.log(data)
		setPeople(data)
	}

	useEffect(() => {
		getPeople('people', id)
	}, [id])

	if (!people) {
		return <p>Loading...</p>
	}

  return (
    <Card>
        <Card.Header as="h3">{people.name}</Card.Header>
        <Card.Body>
            <Row>
                <Col sm={3} as="h3">Attributes</Col>
            </Row>
            <Row>
                <Col sm={3} as="h5">Gender</Col>
                <Col sm={9}>{people.gender}</Col>
            </Row>
            <Row>
                <Col sm={3} as="h5">Birth year</Col>
                <Col sm={9}>{people.birth_year}</Col>
            </Row>
            <Row>
                <Col sm={3} as="h5">Height</Col>
                <Col sm={9}>{people.height} cm</Col>
            </Row>
            <Row>
                <Col sm={3} as="h5">Mass</Col>
                <Col sm={9}>{people.mass} kg</Col>
            </Row>
            <Row>
                <Col sm={3} as="h5">Hair color</Col>
                <Col sm={9}>{people.hair_color}</Col>
            </Row>
            <Row>
                <Col sm={3} as="h5">Skin color</Col>
                <Col sm={9}>{people.skin_color}</Col>
            </Row>
            <Row>
                <Col sm={3} as="h5">Eye color</Col>
                <Col sm={9}>{people.eye_color}</Col>
            </Row>
            <Row>
                <Col sm={3} as="h3">Links</Col>
            </Row>
            <Row>
                <Col sm={3} as="h4" >Films</Col>
                <Col sm={9}>
                    <ListGroup>
                        {people.films.map((link, index) => (
                            <ListGroup.Item key={index + 1}>
                                <a href={`http://localhost:3000/films/${getIdFromUrl(link)}`}>
                                    Film {getIdFromUrl(link)} →
                                </a>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
            <Row>
                <Col sm={3}>
                    <Button variant="secondary" href={'http://localhost:3000/people'}>← Back</Button>
                </Col>
            </Row>
        </Card.Body>
    </Card>
  )
}

export default PeopleAlone