import Container from 'react-bootstrap/Container'
import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
import Films from './pages/Films'
import Film from './pages/Film'
import People from './pages/People'
import PeopleAlone from './pages/PeopleAlone'
import 'bootstrap/dist/css/bootstrap.css'

const App = () => {

	return (
		<div id="App">
			<Navigation />

			<Container className="py-3">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/films" element={<Films />} />
          			<Route path="/films/:id" element={<Film />} />
					<Route path="/people" element={<People />} />
					<Route path="/people/:id" element={<PeopleAlone />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Container>
		</div>
	)
}

export default App