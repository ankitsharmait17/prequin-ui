import React from 'react';
import { Commitment } from '../../services/investors/types';
import '../Common/Table/Table.css';

interface CommitmentsTableProps {
    data: Commitment[];
}

const CommitmentsTable: React.FC<CommitmentsTableProps> = ({ data }) => {
    if (data?.length) {
        return <p>No data available.</p>;
    }

    return (
        <table className='table'>
            <thead className='table-header'>
                <tr>
                    <th>Commitment Id</th>
                    <th>Firm Id</th>
                    <th>Asset Class</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody className='table-body'>
                {data?.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.firm_id}</td>
                        <td>{item.asset_class}</td>
                        <td>
                            {item.currency} {item.amount}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CommitmentsTable;
