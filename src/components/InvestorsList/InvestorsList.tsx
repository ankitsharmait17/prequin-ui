import { Fragment, useEffect, useState } from 'react';
import { Firm } from '../../services/investors/types';
import { investorsServiceManager } from '../../services';
import Table from './InvestorsTable';
import Spinner from '../Common/Spinner/Spinner';

/**
 * React functional component representing a list of investors.
 * @component
 * @function
 * @name InvestorsList
 * @returns {JSX.Element} JSX representing the InvestorsList component.
 */
const InvestorsList: React.FC = () => {
    /**
     * State hook to manage the list of investors.
     * @type {Array<Firm>}
     * @property {Array<Firm>} investorList - List of investors to be displayed.
     * @property {Function} setInvestorList - Function to update the investorList state.
     */
    const [investorList, setInvestorList] = useState<Firm[]>([]);
    /**
     * State hook to track the loading status of the investors list.
     * @type {boolean}
     * @property {boolean} isInvestorsListLoading - Flag indicating if the investors list is being loaded.
     * @property {Function} setIsInvestorsListLoading - Function to update the isInvestorsListLoading state.
     */
    const [isInvestorsListLoading, setIsInvestorsListLoading] = useState<boolean>(false);
    /**
     * State hook to indicate if an error occurred during data fetching.
     * @type {boolean}
     * @property {boolean} isError - Flag indicating if an error occurred during data fetching.
     * @property {Function} setIsError - Function to update the isError state.
     */
    const [isError, setIsError] = useState<boolean>(false);

    /**
     * Effect hook to fetch the list of investors on component mount.
     */
    useEffect(() => {
        setIsError(false);
        setIsInvestorsListLoading(true);
        investorsServiceManager
            .getInvestors()
            .then((investorListData) => setInvestorList(investorListData))
            .catch((error) => {
                setIsError(true);
            })
            .finally(() => {
                setIsInvestorsListLoading(false);
            });
    }, []);

    /**
     * Render function for the InvestorsList component.
     * @returns {JSX.Element} JSX representing the structure of the InvestorsList.
     */
    return (
        <Fragment>
            {isInvestorsListLoading && <Spinner />}
            <h2>Investors</h2>
            {!isError && !isInvestorsListLoading && <Table data={investorList} />}
            {isError && (
                <p>Some error occurred while fetching the list of Investors. Please try again after some time.</p>
            )}
        </Fragment>
    );
};

export default InvestorsList;
