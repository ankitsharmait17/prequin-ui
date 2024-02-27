import React from 'react';
import { Commitment } from '../../services/investors/types';
import '../Common/Table/Table.css';

/**
 * Props for the CommitmentsTable component.
 * @typedef {Object} CommitmentsTableProps
 * @property {Commitment[]} data - Array of commitments to be displayed in the table.
 */
interface CommitmentsTableProps {
    data: Commitment[];
}

/**
 * React functional component representing a table for displaying commitments data.
 * @function
 * @name CommitmentsTable
 * @component
 * @param {Object} props - React props for the CommitmentsTable component.
 * @param {Commitment[]} props.data - Array of commitments to be displayed in the table.
 * @returns {JSX.Element} JSX representing the CommitmentsTable component.
 */
const CommitmentsTable: React.FC<CommitmentsTableProps> = ({ data }) => {
    /**
     * Render function for the CommitmentsTable component.
     * @returns {JSX.Element} JSX representing the structure of the CommitmentsTable.
     */
    if (!data?.length) {
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
