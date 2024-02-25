import React from 'react';
import { Firm } from '../../services/investors/types';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils';
import './Table.css';

interface TableProps {
    data: Firm[];
}

const Table: React.FC<TableProps> = ({ data }) => {
    if (data.length === 0) {
        return <p>No data available.</p>;
    }

    return (
        <table className='investors-table'>
            <thead className='investors-table-header'>
                <tr>
                    <th>Firm Id</th>
                    <th>Firm Name</th>
                    <th>Type</th>
                    <th>Date Added</th>
                    <th>Address</th>
                </tr>
            </thead>
            <tbody className='investors-table-body'>
                {data.map((item) => (
                    <tr key={item.firm_id}>
                        <td>
                            <Link to={`investor/${item.firm_id}`}>{item.firm_id}</Link>{' '}
                        </td>
                        <td>{item.firm_name}</td>
                        <td className='investors-table-body-firm-type'>{item.firm_type}</td>
                        <td>{formatDate(item.date_added)}</td>
                        <td>{item.address}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
