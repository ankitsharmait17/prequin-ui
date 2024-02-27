import { Link } from 'react-router-dom';

/**
 * React functional component representing a 404 Not Found page.
 * @function
 * @name NotFound
 * @component
 * @returns {JSX.Element} JSX representing the NotFound component.
 */
const NotFound = () => (
    <>
        <div>404 Not Found</div>
        <Link to={'/'}>Go back to home page </Link>
    </>
);

export default NotFound;
