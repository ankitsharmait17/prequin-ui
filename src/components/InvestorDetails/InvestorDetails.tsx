import { Fragment, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ASSET_CLASSES } from '../../constants';
import { investorsServiceManager } from '../../services';
import { Commitment } from '../../services/investors/types';
import CommitmentsTable from './CommitmentsTable';
import Spinner from '../Common/Spinner/Spinner';

/**
 * React functional component representing the details page for a specific investor.
 * @component
 */
const InvestorDetails: React.FC = () => {
    /**
     * React hook to retrieve the parameters from the current route.
     */
    let { investorId } = useParams();

    /**
     * State hook to manage the list of commitments for the investor.
     */
    const [commitmentsList, setCommitmentsList] = useState<Commitment[]>([]);

    /**
     * State hook to track the loading status of commitments data.
     */
    const [isCommitmentsLoading, setIsCommitmentsLoading] = useState<boolean>(false);

    /**
     * State hook to indicate if an error occurred during data fetching.
     */
    const [isError, setIsError] = useState<boolean>(false);

    /**
     * Function to fetch commitment details for a selected asset class.
     * @param {string} selectedAsset - The selected asset class.
     */
    const fetchCommitmentDetails = (selectedAsset: string) => {
        if (selectedAsset?.length && investorId?.length) {
            setIsError(false);
            setIsCommitmentsLoading(true);
            investorsServiceManager
                .getCommitments({ asset_class: selectedAsset, investor_id: parseInt(investorId) })
                .then((commitmentsData) => {
                    setCommitmentsList(commitmentsData);
                })
                .catch((error) => {
                    setIsError(true);
                })
                .finally(() => {
                    setIsCommitmentsLoading(false);
                });
        } else {
            setCommitmentsList([]);
        }
    };

    /**
     * Event handler for changes in the selected asset dropdown.
     * @param {React.ChangeEvent<HTMLSelectElement>} event - The change event object.
     */
    const handleSelectedAssetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        fetchCommitmentDetails(event.target.value);
    };

    /**
     * Render function for the InvestorDetails component.
     * @returns {JSX.Element} JSX representing the component structure.
     */
    return (
        <Fragment>
            <div>
                <Link to={'/'}>Investors {'>'} </Link> Investor #{investorId}
            </div>
            <h2>Investors Details</h2>
            <label>
                {'Asset Class :'}
                <select id='select-asset' onChange={handleSelectedAssetChange}>
                    <option value=''>Select</option>
                    {Object.entries(ASSET_CLASSES).map(([id, label]) => (
                        <option key={id} value={id}>
                            {label}
                        </option>
                    ))}
                </select>
            </label>
            {isCommitmentsLoading && <Spinner />}
            {!isCommitmentsLoading && !isError && <CommitmentsTable data={commitmentsList} />}
            {isError && (
                <p>Some error occurred while fetching the commitment details. Please try again after some time.</p>
            )}
        </Fragment>
    );
};

export default InvestorDetails;
