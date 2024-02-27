import React from 'react';
import { Firm } from '../../services/investors/types';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils';
import '../Common/Table/Table.css';

/**
 * Props for the Table component.
 * @typedef {Object} TableProps
 * @property {Firm[]} data - Array of firms to be displayed in the table.
 */
interface TableProps {
    data: Firm[];
}

/**
 * React functional component representing a table for displaying firm data.
 * @function
 * @name Table
 * @component
 * @param {Object} props - React props for the Table component.
 * @param {Firm[]} props.data - Array of firms to be displayed in the table.
 * @returns {JSX.Element} JSX representing the Table component.
 */
const Table: React.FC<TableProps> = ({ data }) => {
    /**
     * Render function for the Table component.
     * @returns {JSX.Element} JSX representing the structure of the Table.
     */
    if (!data?.length) {
        return <p>No data available.</p>;
    }

    return (
        <table className='table'>
            <thead className='table-header'>
                <tr>
                    <th>Firm Id</th>
                    <th>Firm Name</th>
                    <th>Type</th>
                    <th>Date Added</th>
                    <th>Address</th>
                </tr>
            </thead>
            <tbody className='table-body'>
                {data?.map((item) => (
                    <tr key={item.firm_id}>
                        <td>
                            <Link to={`investor/${item.firm_id}`}>{item.firm_id}</Link>{' '}
                        </td>
                        <td>{item.firm_name}</td>
                        <td className='table-body-firm-type'>{item.firm_type}</td>
                        <td>{formatDate(item.date_added)}</td>
                        <td>{item.address}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
