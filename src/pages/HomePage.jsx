import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <>
        <h1>Welcome to the Star Wars Encyclopedia</h1>

        <div style={{display: "flex", flexDirection: "column"}}>
            <div style={{marginBottom: "5px"}}>
                <Button variant="primary" as={Link} to="/films">Have a look at all the films</Button>
            </div>
            <div>
                <Button variant="info" as={Link} to="/people">Or take a look at all the people in the films</Button>
            </div>
        </div>
    </>
  )
}

export default HomePage